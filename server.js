const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');
const INITIAL_GUESTS_FILE = path.join(DATA_DIR, 'initial-guests.json');
const PORT = Number(process.env.PORT || 3000);
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;
let pool = null;

fs.mkdirSync(DATA_DIR, { recursive: true });
const initialGuests = fs.existsSync(INITIAL_GUESTS_FILE)
  ? JSON.parse(fs.readFileSync(INITIAL_GUESTS_FILE, 'utf8'))
  : [];
const emptyStore = () => ({ guests: initialGuests.map(guest => ({ ...guest })), messages: [], reservedGifts: [] });

function readLocalStore() {
  try {
    const store = JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
    return { guests: Array.isArray(store.guests) ? store.guests : [], messages: Array.isArray(store.messages) ? store.messages : [], reservedGifts: Array.isArray(store.reservedGifts) ? store.reservedGifts : [] };
  } catch (error) {
    console.error('Não foi possível ler data/store.json:', error);
    return emptyStore();
  }
}

function writeLocalStore(store) {
  const temporary = `${STORE_FILE}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(store, null, 2) + '\n');
  fs.renameSync(temporary, STORE_FILE);
}

async function initDatabase() {
  if (!DATABASE_URL) {
    console.warn('DATABASE_URL não configurada; usando data/store.json. No Render, configure um Postgres para manter os dados após reinícios.');
    if (!fs.existsSync(STORE_FILE)) writeLocalStore(emptyStore());
    return;
  }

  let Pool;
  try {
    ({ Pool } = require('pg'));
  } catch {
    throw new Error('A dependência pg não está instalada. Execute npm install antes de iniciar com DATABASE_URL.');
  }

  pool = new Pool({ connectionString: DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined });
  await pool.query(`CREATE TABLE IF NOT EXISTS wedding_state (id TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
  const existing = await pool.query('SELECT data FROM wedding_state WHERE id = $1', ['main']);
  if (existing.rowCount === 0) {
    const local = fs.existsSync(STORE_FILE) ? readLocalStore() : emptyStore();
    await pool.query('INSERT INTO wedding_state (id, data) VALUES ($1, $2::jsonb)', ['main', JSON.stringify(local)]);
    console.log('Banco persistente inicializado; dados locais migrados para wedding_state.');
  }
}

async function readStore(client = pool) {
  if (!pool) return readLocalStore();
  const result = await client.query('SELECT data FROM wedding_state WHERE id = $1', ['main']);
  return result.rowCount ? result.rows[0].data : emptyStore();
}

async function writeStore(store, client = pool) {
  if (!pool) {
    writeLocalStore(store);
    return;
  }
  await client.query(`INSERT INTO wedding_state (id, data, updated_at) VALUES ($1, $2::jsonb, NOW()) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`, ['main', JSON.stringify(store)]);
}

async function mergeInitialGuests(store) {
  const existing = new Map((store.guests || []).map(guest => [String(guest.name || '').toLowerCase(), guest]));
  let changed = false;
  for (const guest of initialGuests) {
    const key = String(guest.name || '').toLowerCase();
    if (!existing.has(key)) {
      store.guests.push(guest);
      changed = true;
    }
  }
  if (changed) await writeStore(store);
  return store;
}

function id(prefix) { return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`; }
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
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('JSON inválido')); } });
    req.on('error', reject);
  });
}
function clean(value, fallback = '') { return String(value ?? fallback).trim().slice(0, 5000); }

async function api(req, res, url) {
  const store = await mergeInitialGuests(await readStore());

  if (req.method === 'GET' && url.pathname === '/api/state') return json(res, 200, { messages: store.messages, guests: store.guests, reservedGifts: store.reservedGifts });

  if (req.method === 'POST' && url.pathname === '/api/rsvp') {
    const body = await readBody(req);
    const name = clean(body.name);
    if (!name) return json(res, 400, { error: 'Nome do convidado não informado.' });
    const status = body.status === 'Confirmado' ? 'Confirmado' : 'Ausente';
    const now = new Date().toISOString();
    const index = store.guests.findIndex(guest => String(guest.name).toLowerCase() === name.toLowerCase());
    const guest = index >= 0 ? { ...store.guests[index], status, email: clean(body.email), rsvpNotes: clean(body.rsvpNotes), updatedAt: now } : { id: id('guest'), name, invitationGroup: name, type: 'Adulto', email: clean(body.email), rsvpNotes: clean(body.rsvpNotes), status, updatedAt: now };
    if (index >= 0) store.guests[index] = guest; else store.guests.push(guest);
    await writeStore(store);
    return json(res, 200, { guest, guests: store.guests });
  }

  if (req.method === 'PUT' && url.pathname === '/api/guests') {
    const body = await readBody(req);
    store.guests = Array.isArray(body.guests) ? body.guests : store.guests;
    await writeStore(store);
    return json(res, 200, { ok: true });
  }

  if (req.method === 'POST' && url.pathname === '/api/messages') {
    const body = await readBody(req);
    const message = { id: id('message'), authorName: clean(body.authorName, 'Convidado'), authorEmail: clean(body.authorEmail), message: clean(body.message, 'Mensagem de carinho aos noivos.'), source: body.source === 'gift' ? 'gift' : 'rsvp', sourceLabel: clean(body.sourceLabel, 'Recado'), status: clean(body.status, 'pendente'), createdAt: new Date().toISOString() };
    store.messages.unshift(message);
    await writeStore(store);
    return json(res, 201, { message });
  }

  if (req.method === 'POST' && url.pathname === '/api/gift-intents') {
    const body = await readBody(req);
    const giftId = clean(body.giftId);
    if (!giftId) return json(res, 400, { error: 'Presente não informado.' });

    // Postgres transaction + row lock prevents two guests reserving the same gift at once.
    let transactionClient = null;
    try {
      if (pool) {
        transactionClient = await pool.connect();
        await transactionClient.query('BEGIN');
        const lockedStore = await readStoreForUpdate(transactionClient);
        if (lockedStore.reservedGifts.some(item => item.giftId === giftId)) {
          await transactionClient.query('ROLLBACK');
          return json(res, 409, { error: 'Este presente já está reservado.' });
        }
        const result = await createGiftReservation(lockedStore, body);
        await writeStore(lockedStore, transactionClient);
        await transactionClient.query('COMMIT');
        return json(res, 201, result);
      }
      if (store.reservedGifts.some(item => item.giftId === giftId)) return json(res, 409, { error: 'Este presente já está reservado.' });
      const result = await createGiftReservation(store, body);
      await writeStore(store);
      return json(res, 201, result);
    } catch (error) {
      if (transactionClient) await transactionClient.query('ROLLBACK').catch(() => {});
      throw error;
    } finally {
      if (transactionClient) transactionClient.release();
    }
  }

  const deleteMatch = url.pathname.match(/^\/api\/messages\/([^/]+)$/);
  if (req.method === 'DELETE' && deleteMatch) {
    const messageId = decodeURIComponent(deleteMatch[1]);
    const message = store.messages.find(item => item.id === messageId);
    store.messages = store.messages.filter(item => item.id !== messageId);
    if (message?.giftId) store.reservedGifts = store.reservedGifts.filter(item => item.giftId !== message.giftId);
    await writeStore(store);
    return json(res, 200, { ok: true });
  }

  return json(res, 404, { error: 'Rota da API não encontrada.' });
}

async function createGiftReservation(store, body) {
  const giftId = clean(body.giftId);
  const message = { id: id('message'), authorName: clean(body.authorName, 'Convidado'), message: clean(body.message, 'Presente selecionado com muito carinho para os noivos.'), source: 'gift', sourceLabel: `Presente: ${clean(body.giftTitle, 'Presente')}`, giftId, giftTitle: clean(body.giftTitle, 'Presente'), giftPrice: Number(body.giftPrice) || 0, giftCategory: clean(body.giftCategory), status: 'pendente', createdAt: new Date().toISOString() };
  store.messages.unshift(message);
  store.reservedGifts.push({ giftId, messageId: message.id });
  return { message, gift: { id: giftId, title: message.giftTitle, price: message.giftPrice, category: message.giftCategory, linkConferir: clean(body.linkConferir), imageUrl: clean(body.imageUrl), description: clean(body.description), reserved: true, reservedByMessageId: message.id } };
}

async function readStoreForUpdate(client) {
  const result = await client.query('SELECT data FROM wedding_state WHERE id = $1 FOR UPDATE', ['main']);
  return result.rowCount ? result.rows[0].data : emptyStore();
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
function staticFile(req, res, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/' || pathname === '/index.html') pathname = '/index.html';
  if (pathname === '/mensagens') pathname = '/mensagens.html';
  if (pathname === '/convidados') pathname = '/convidados.html';
  const file = path.normalize(path.join(ROOT, pathname));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return json(res, 404, { error: 'Arquivo não encontrado.' });
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store, no-cache, must-revalidate' });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try { if (url.pathname.startsWith('/api/')) await api(req, res, url); else staticFile(req, res, url); }
  catch (error) { console.error(error); json(res, 500, { error: 'Erro interno ao salvar os dados.' }); }
});

initDatabase().then(() => server.listen(PORT, '0.0.0.0', () => console.log(`Convite disponível em http://0.0.0.0:${PORT}`))).catch(error => { console.error(error); process.exit(1); });

module.exports = { initDatabase, readStore, writeStore };
