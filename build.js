import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// Limpa e recria dist
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// Arquivos e pastas a copiar para o dist do GitHub Pages
const itemsToCopy = [
  'index.html',
  'convidados.html',
  'mensagens.html',
  'style.css',
  'data.js',
  'firebase-config.js',
  'app.js',
  '.nojekyll',
  'assets',
  'public',
  'convidados',
  'mensagens'
];

for (const item of itemsToCopy) {
  const src = path.join(ROOT_DIR, item);
  const dest = path.join(DIST_DIR, item);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
  }
}

// Garante 404.html para roteamento no GitHub Pages
const indexSrc = path.join(ROOT_DIR, 'index.html');
const notFoundDest = path.join(DIST_DIR, '404.html');
if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, notFoundDest);
}

// Garante assets de imagens na raiz de dist
const publicAssets = path.join(ROOT_DIR, 'public/assets');
const distAssets = path.join(DIST_DIR, 'assets');
if (fs.existsSync(publicAssets)) {
  copyRecursive(publicAssets, distAssets);
}
const publicEnvelope = path.join(ROOT_DIR, 'public/wedding_envelope.mp4');
const distEnvelope = path.join(DIST_DIR, 'wedding_envelope.mp4');
if (fs.existsSync(publicEnvelope)) {
  fs.copyFileSync(publicEnvelope, distEnvelope);
}

console.log('Build estático (sem Vite e sem TypeScript) concluído com sucesso em dist/!');
