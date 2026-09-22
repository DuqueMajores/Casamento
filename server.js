import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = __dirname;
const serviceAccountSetting = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
const serviceAccountPath = serviceAccountSetting && !serviceAccountSetting.trim().startsWith('{')
  ? serviceAccountSetting
  : path.join(__dirname, '.firebase', 'service-account.json');

if (!serviceAccountSetting && !fs.existsSync(serviceAccountPath)) {
  throw new Error('Credencial Firebase ausente. Defina FIREBASE_SERVICE_ACCOUNT_JSON com o JSON completo ou o caminho do arquivo.');
}

const serviceAccount = serviceAccountSetting?.trim().startsWith('{')
  ? JSON.parse(serviceAccountSetting)
  : JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
initializeApp({
  credential: cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id
});

const db = getFirestore();
const giftsCollection = db.collection('giftcards');
const messagesCollection = db.collection('messages');
const seedPath = path.join(__dirname, 'gifts.seed.json');
const clients = new Set();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.mp4': 'video/mp4',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2'
};

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

function serialize(value) {
  if (value?.toDate) return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(serialize);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, serialize(v)]));
  return value;
}

async function ensureGiftSeed() {
  const snapshot = await giftsCollection.limit(1).get();
  if (!snapshot.empty) return;
  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  const batch = db.batch();
  seed.forEach(gift => batch.set(giftsCollection.doc(gift.id), { ...gift, reserved: false }));
  await batch.commit();
}

async function getState() {
  await ensureGiftSeed();
  const [giftSnapshot, messageSnapshot] = await Promise.all([
    giftsCollection.get(),
    messagesCollection.orderBy('createdAt', 'desc').get()
  ]);
  const gifts = giftSnapshot.docs.map(doc => ({ id: doc.id, ...serialize(doc.data()) }));
  const messages = messageSnapshot.docs.map(doc => ({ id: doc.id, ...serialize(doc.data()) }));
  return { gifts, messages, updatedAt: new Date().toISOString() };
}

async function broadcastState() {
  const payload = `data: ${JSON.stringify(await getState())}\n\n`;
  for (const client of clients) client.write(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 1e6) reject(new Error('Payload muito grande')); });
    req.on('end', () => { try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error('JSON inválido')); } });
    req.on('error', reject);
  });
}

async function createMessage(data) {
  const ref = messagesCollection.doc();
  const message = {
    authorName: String(data.authorName || 'Convidado'),
    authorEmail: data.authorEmail ? String(data.authorEmail) : null,
    message: String(data.message || ''),
    source: String(data.source || 'rsvp'),
    sourceLabel: String(data.sourceLabel || 'RSVP'),
    status: data.status || 'pendente',
    createdAt: FieldValue.serverTimestamp()
  };
  await ref.set(message);
  const saved = await ref.get();
  return { id: ref.id, ...serialize(saved.data()) };
}

async function createGiftIntent(data) {
  const giftId = String(data.giftId || '');
  if (!giftId || !data.authorName) throw Object.assign(new Error('Giftcard e nome são obrigatórios.'), { status: 400 });
  const messageRef = messagesCollection.doc();
  const giftRef = giftsCollection.doc(giftId);
  await db.runTransaction(async transaction => {
    const giftSnapshot = await transaction.get(giftRef);
    if (!giftSnapshot.exists) throw Object.assign(new Error('Giftcard não encontrado.'), { status: 404 });
    const gift = giftSnapshot.data();
    if (gift.reserved) throw Object.assign(new Error('Este giftcard já está reservado.'), { status: 409 });
    const message = {
      authorName: String(data.authorName), message: String(data.message || 'Presente selecionado com muito carinho para os noivos.'),
      source: 'gift', sourceLabel: `Presente: ${gift.title}`, giftId, giftTitle: gift.title,
      giftPrice: gift.price, giftCategory: gift.category, status: 'pendente', createdAt: FieldValue.serverTimestamp()
    };
    transaction.set(messageRef, message);
    transaction.update(giftRef, { reserved: true, reservedByMessageId: messageRef.id });
  });
  const savedGift = await giftRef.get();
  const savedMessage = await messageRef.get();
  return {
    gift: { id: savedGift.id, ...serialize(savedGift.data()) },
    message: { id: savedMessage.id, ...serialize(savedMessage.data()) }
  };
}

async function deleteMessage(id) {
  const messageRef = messagesCollection.doc(String(id));
  await db.runTransaction(async transaction => {
    const messageSnapshot = await transaction.get(messageRef);
    if (!messageSnapshot.exists) return;
    const message = messageSnapshot.data();
    if (message.source === 'gift' && message.giftId) {
      const giftRef = giftsCollection.doc(message.giftId);
      const giftSnapshot = await transaction.get(giftRef);
      if (giftSnapshot.exists && giftSnapshot.data().reservedByMessageId === id) {
        transaction.update(giftRef, { reserved: false, reservedByMessageId: FieldValue.delete() });
      }
    }
    transaction.delete(messageRef);
  });
}

async function handleApi(req, res, pathname) {
  if (req.method === 'GET' && pathname === '/api/state') return json(res, 200, await getState());
  if (req.method === 'GET' && pathname === '/api/events') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    clients.add(res);
    res.write(`data: ${JSON.stringify(await getState())}\n\n`);
    req.on('close', () => clients.delete(res));
    return;
  }
  if (req.method === 'POST' && pathname === '/api/messages') {
    const body = await readBody(req); const message = await createMessage(body); await broadcastState(); return json(res, 201, { message });
  }
  if (req.method === 'POST' && pathname === '/api/gift-intents') {
    const body = await readBody(req); const result = await createGiftIntent(body); await broadcastState(); return json(res, 201, result);
  }
  if (req.method === 'DELETE' && pathname.startsWith('/api/messages/')) {
    await deleteMessage(pathname.split('/').pop()); await broadcastState(); return json(res, 200, { ok: true });
  }
  return false;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) {
      const handled = await handleApi(req, res, decodeURIComponent(url.pathname));
      if (handled !== false) return;
      return json(res, 404, { error: 'Endpoint não encontrado.' });
    }
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    else if (pathname === '/convidados' || pathname === '/convidados/') pathname = '/convidados.html';
    else if (pathname === '/mensagens' || pathname === '/mensagens/') pathname = '/mensagens.html';
    const safePath = path.normalize(pathname).replace(/^((\.\.[/\\])+)/, '');
    let filePath = path.join(PUBLIC_DIR, safePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) filePath += '.html';
    if (!fs.existsSync(filePath)) filePath = path.join(PUBLIC_DIR, 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) return res.end('Erro interno do servidor');
      res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
      res.end(content);
    });
  } catch (error) {
    console.error(error);
    json(res, error.status || 500, { error: error.message || 'Erro interno do servidor.' });
  }
});

server.listen(PORT, '0.0.0.0', () => console.log(`Servidor Firebase rodando na porta ${PORT}`));
