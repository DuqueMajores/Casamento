const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');
const PORT = Number(process.env.PORT || 3000);

fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(STORE_FILE)) {
  fs.writeFileSync(STORE_FILE, JSON.stringify({ guests: [], messages: [], reservedGifts: [] }, null, 2) + '\n');
}

function readStore() {
  try {
    return JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
  } catch (error) {
    console.error('Não foi possível ler data/store.json:', error);
    return { guests: [], messages: [], reservedGifts: [] };
  }
}

function writeStore(store) {
  const temporary = `${STORE_FILE}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(store, null, 2) + '\n');
  fs.renameSync(temporary, STORE_FILE);
}

function id(prefix) {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
}

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 1_000_000) req.destroy(new Error('Payload muito grande'));
    });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch { reject(new Error('JSON inválido')); }
    });
    req.on('error', reject);
  });
}

function clean(value, fallback = '') {
  return String(value ?? fallback).trim().slice(0, 5000);
}

async function api(req, res, url) {
  const store = readStore();

  if (req.method === 'GET' && url.pathname === '/api/state') {
    return json(res, 200, { messages: store.messages, guests: store.guests, reservedGifts: store.reservedGifts });
  }

  if (req.method === 'PUT' && url.pathname === '/api/guests') {
    const body = await readBody(req);
    store.guests = Array.isArray(body.guests) ? body.guests : store.guests;
    writeStore(store);
    return json(res, 200, { ok: true });
  }

  if (req.method === 'POST' && url.pathname === '/api/messages') {
    const body = await readBody(req);
    const message = {
      id: id('message'),
      authorName: clean(body.authorName, 'Convidado'),
      authorEmail: clean(body.authorEmail),
      message: clean(body.message, 'Mensagem de carinho aos noivos.'),
      source: body.source === 'gift' ? 'gift' : 'rsvp',
      sourceLabel: clean(body.sourceLabel, 'Recado'),
      status: clean(body.status, 'pendente'),
      createdAt: new Date().toISOString()
    };
    store.messages.unshift(message);
    writeStore(store);
    return json(res, 201, { message });
  }

  if (req.method === 'POST' && url.pathname === '/api/gift-intents') {
    const body = await readBody(req);
    const giftId = clean(body.giftId);
    if (!giftId) return json(res, 400, { error: 'Presente não informado.' });
    if (store.reservedGifts.some(item => item.giftId === giftId)) {
      return json(res, 409, { error: 'Este presente já está reservado.' });
    }

    const message = {
      id: id('message'),
      authorName: clean(body.authorName, 'Convidado'),
      message: clean(body.message, 'Presente selecionado com muito carinho para os noivos.'),
      source: 'gift',
      sourceLabel: `Presente: ${clean(body.giftTitle, 'Presente')}`,
      giftId,
      giftTitle: clean(body.giftTitle, 'Presente'),
      giftPrice: Number(body.giftPrice) || 0,
      giftCategory: clean(body.giftCategory),
      status: 'pendente',
      createdAt: new Date().toISOString()
    };
    store.messages.unshift(message);
    store.reservedGifts.push({ giftId, messageId: message.id });
    writeStore(store);

    return json(res, 201, {
      message,
      gift: {
        id: giftId,
        title: message.giftTitle,
        price: message.giftPrice,
        category: message.giftCategory,
        linkConferir: clean(body.linkConferir),
        imageUrl: clean(body.imageUrl),
        description: clean(body.description),
        reserved: true,
        reservedByMessageId: message.id
      }
    });
  }

  const deleteMatch = url.pathname.match(/^\/api\/messages\/([^/]+)$/);
  if (req.method === 'DELETE' && deleteMatch) {
    const messageId = decodeURIComponent(deleteMatch[1]);
    const message = store.messages.find(item => item.id === messageId);
    store.messages = store.messages.filter(item => item.id !== messageId);
    if (message?.giftId) {
      store.reservedGifts = store.reservedGifts.filter(item => item.giftId !== message.giftId);
    }
    writeStore(store);
    return json(res, 200, { ok: true });
  }

  return json(res, 404, { error: 'Rota da API não encontrada.' });
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

function staticFile(req, res, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/' || pathname === '/index.html') pathname = '/index.html';
  if (pathname === '/mensagens') pathname = '/mensagens.html';
  if (pathname === '/convidados') pathname = '/convidados.html';
  const file = path.normalize(path.join(ROOT, pathname));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return json(res, 404, { error: 'Arquivo não encontrado.' });
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) await api(req, res, url);
    else staticFile(req, res, url);
  } catch (error) {
    console.error(error);
    json(res, 500, { error: 'Erro interno ao salvar os dados.' });
  }
});

server.listen(PORT, '0.0.0.0', () => console.log(`Convite disponível em http://0.0.0.0:${PORT}`));
