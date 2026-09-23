const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
const start = source.indexOf('const INITIAL_GUESTS = [');
const end = source.indexOf('\n];', start) + 3;
if (start < 0 || end < 3) throw new Error('Não foi possível localizar INITIAL_GUESTS em data.js');

const context = {};
vm.runInNewContext(`${source.slice(start, end)}; result = INITIAL_GUESTS;`, context);
const guests = context.result.map(({ id, name, invitationGroup, type, phone }) => ({
  id,
  name,
  invitationGroup,
  type,
  ...(phone ? { phone } : {}),
  status: 'Pendente'
}));

const storeFile = path.join(root, 'data', 'store.json');
let store = { guests: [], messages: [], reservedGifts: [] };
if (fs.existsSync(storeFile)) {
  try { store = JSON.parse(fs.readFileSync(storeFile, 'utf8')); } catch {}
}
store.guests = guests;
store.messages = [];
store.reservedGifts = [];
fs.writeFileSync(storeFile, JSON.stringify(store, null, 2) + '\n');
console.log(`Reset concluído: ${guests.length} convidados como Pendente; mensagens e reservas removidas.`);
