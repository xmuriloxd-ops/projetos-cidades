'use strict';
// Fronteira do Sul RP — servidor sem dependências (apenas Node.js >= 18).
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 3000;
const ADMIN_USER = process.env.ADMIN_USER || 'adm';
const ADMIN_PASS = process.env.ADMIN_PASS || '142536';
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data');
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
const DATA_FILE = path.join(DATA_DIR, 'site.json');
const SEED_FILE = path.join(ROOT, 'content', 'seed.txt');

const MAX_JSON = 3 * 1024 * 1024;
const MAX_UPLOAD = 8 * 1024 * 1024;
const SESSION_MS = 12 * 60 * 60 * 1000;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.svg': 'image/svg+xml',
};
const UPLOAD_TYPES = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif' };

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---------- conteúdo ----------
function newId() { return crypto.randomBytes(5).toString('hex'); }

function buildSeed() {
  const tabs = {
    geral: { id: 'geral', label: 'Regulamento geral', kicker: 'DOCUMENTO DA CIDADE', title: 'Regulamento completo', badge: 'CONSULTA ABERTA', intro: '', numbered: true, sections: [] },
    policia: { id: 'policia', label: 'Regras da Polícia', kicker: 'REGRAS DA POLÍCIA', title: 'Multas de Trânsito', badge: '', intro: 'pts = pontos na carteira (CNH).', numbered: false, sections: [] },
  };
  let tab = null, sec = null;
  for (const line of fs.readFileSync(SEED_FILE, 'utf8').split(/\r?\n/)) {
    if (line.startsWith('@@tab ')) { tab = tabs[line.slice(6).trim()]; sec = null; }
    else if (line.startsWith('@@section ')) { sec = { id: newId(), title: line.slice(10).trim(), body: '' }; tab.sections.push(sec); }
    else if (sec) sec.body += line + '\n';
  }
  for (const t of Object.values(tabs)) for (const s of t.sections) s.body = s.body.trim();
  return {
    brand: { name: 'FRONTEIRA DO SUL', sub: 'GUIA OFICIAL DA CIDADE', logo: '/img/logo.png', footer: 'FRONTEIRA DO SUL RP · REGRAS PARA UMA CIDADE MELHOR' },
    hero: {
      kicker: 'CENTRAL DE REGRAS', title: 'Roleplay justo.', titleEm: 'Histórias melhores.',
      text: 'Consulte o regulamento da cidade com clareza. Navegue pelas seções ou pesquise qualquer termo para encontrar a regra certa, sem perder o contexto.',
    },
    destaque: {
      tag: 'REGRA DE INTEGRIDADE', title: 'Cheats ou vantagens indevidas são proibidos',
      text: 'É proibido qualquer tipo de cheat, modificação ou recurso que conceda vantagem no jogo. Isso inclui retirar mato ou arbustos, retirar água e deixar o jogo sempre de dia. A proibição também abrange qualquer alteração equivalente que facilite a jogabilidade de forma injusta.',
    },
    convite: {
      kicker: 'CONVITE OFICIAL', title: 'Uma nova história começa aqui.',
      text: 'Conheça a cidade, confira as regras oficiais e prepare-se para o roleplay.',
      button: 'Consultar regras oficiais', image: '/img/convite.jpg',
    },
    tabs: [tabs.geral, tabs.policia],
  };
}

function loadContent() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { const c = buildSeed(); saveContent(c); return c; }
}
function saveContent(c) {
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(c, null, 1));
  fs.renameSync(tmp, DATA_FILE);
}
let content = loadContent();

const str = (v, max) => (typeof v === 'string' ? v : '').slice(0, max);
function pick(src, keys, max) {
  const o = {}; src = src && typeof src === 'object' ? src : {};
  for (const k of keys) o[k] = str(src[k], max);
  return o;
}
// Reconstrói o objeto aceitando só os campos conhecidos.
function sanitize(input) {
  if (!input || typeof input !== 'object' || !Array.isArray(input.tabs)) throw new Error('Conteúdo inválido.');
  const out = {
    brand: pick(input.brand, ['name', 'sub', 'logo', 'footer'], 500),
    hero: pick(input.hero, ['kicker', 'title', 'titleEm', 'text'], 2000),
    destaque: pick(input.destaque, ['tag', 'title', 'text'], 4000),
    convite: pick(input.convite, ['kicker', 'title', 'text', 'button', 'image'], 2000),
    tabs: [],
  };
  for (const id of ['geral', 'policia']) {
    const t = input.tabs.find((x) => x && x.id === id);
    if (!t || !Array.isArray(t.sections)) throw new Error('Aba ausente: ' + id);
    if (t.sections.length > 300) throw new Error('Seções demais.');
    out.tabs.push({
      id, ...pick(t, ['label', 'kicker', 'title', 'badge', 'intro'], 500), numbered: !!t.numbered,
      sections: t.sections.map((s) => ({
        id: /^[a-z0-9]{4,20}$/.test(s && s.id) ? s.id : newId(),
        title: str(s && s.title, 300), body: str(s && s.body, 200000),
      })),
    });
  }
  return out;
}

// ---------- autenticação ----------
const sessions = new Map(); // token -> expira em
const failures = new Map(); // ip -> { n, until }

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}
function isAuthed(req) {
  const m = /^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization || '');
  if (!m) return false;
  const exp = sessions.get(m[1]);
  if (!exp || exp < Date.now()) { sessions.delete(m[1]); return false; }
  return true;
}
function clientIp(req) {
  return String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '?';
}

// ---------- utilitários HTTP ----------
function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin', ...headers });
  res.end(body);
}
function json(res, status, obj) {
  send(res, status, JSON.stringify(obj), { 'Content-Type': MIME['.json'], 'Cache-Control': 'no-store' });
}
function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) { reject(Object.assign(new Error('Arquivo muito grande.'), { status: 413 })); req.resume(); return; }
      chunks.push(c);
    });
    req.on('end', () => { if (size <= limit) resolve(Buffer.concat(chunks)); });
    req.on('error', reject);
  });
}
function sniffImage(buf) {
  if (buf.length < 12) return null;
  if (buf[0] === 0x89 && buf.toString('latin1', 1, 4) === 'PNG') return 'image/png';
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'image/jpeg';
  if (buf.toString('latin1', 0, 4) === 'GIF8') return 'image/gif';
  if (buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') return 'image/webp';
  return null;
}
function serveFile(res, baseDir, relPath, cache) {
  const file = path.normalize(path.join(baseDir, relPath));
  if (file !== baseDir && !file.startsWith(baseDir + path.sep)) return send(res, 403, 'Proibido');
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, 'Não encontrado', { 'Content-Type': 'text/plain; charset=utf-8' });
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': st.size, 'Cache-Control': cache, 'X-Content-Type-Options': 'nosniff',
    });
    fs.createReadStream(file).pipe(res);
  });
}

// ---------- rotas ----------
async function handle(req, res) {
  const url = new URL(req.url, 'http://x');
  let p;
  try { p = decodeURIComponent(url.pathname); } catch { return send(res, 400, 'URL inválida'); }
  if (p.includes('\0')) return send(res, 400, 'URL inválida');

  if (p === '/api/content' && req.method === 'GET') return json(res, 200, content);

  if (p === '/api/login' && req.method === 'POST') {
    const ip = clientIp(req), f = failures.get(ip);
    if (f && f.until > Date.now()) return json(res, 429, { error: 'Muitas tentativas. Aguarde um minuto e tente de novo.' });
    let body = {};
    try { body = JSON.parse((await readBody(req, 4096)).toString('utf8')); } catch { /* vazio */ }
    const ok = safeEqual(body.user, ADMIN_USER) & safeEqual(body.pass, ADMIN_PASS);
    if (!ok) {
      const n = (f ? f.n : 0) + 1;
      failures.set(ip, { n: n >= 5 ? 0 : n, until: n >= 5 ? Date.now() + 60000 : 0 });
      return json(res, 401, { error: 'Login ou senha incorretos.' });
    }
    failures.delete(ip);
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, Date.now() + SESSION_MS);
    return json(res, 200, { token });
  }

  if (p === '/api/session' && req.method === 'GET') return json(res, isAuthed(req) ? 200 : 401, { ok: isAuthed(req) });

  if (p === '/api/content' && req.method === 'PUT') {
    if (!isAuthed(req)) return json(res, 401, { error: 'Sessão expirada. Entre novamente.' });
    let next;
    try { next = sanitize(JSON.parse((await readBody(req, MAX_JSON)).toString('utf8'))); }
    catch (e) { return json(res, e.status || 400, { error: e.message || 'Conteúdo inválido.' }); }
    saveContent(next); content = next;
    return json(res, 200, { ok: true });
  }

  if (p === '/api/upload' && req.method === 'POST') {
    if (!isAuthed(req)) return json(res, 401, { error: 'Sessão expirada. Entre novamente.' });
    let buf;
    try { buf = await readBody(req, MAX_UPLOAD); }
    catch (e) { return json(res, e.status || 400, { error: 'A foto passa do limite de 8 MB.' }); }
    const type = sniffImage(buf);
    if (!type) return json(res, 400, { error: 'Envie uma imagem PNG, JPG, WEBP ou GIF.' });
    const name = Date.now().toString(36) + '-' + crypto.randomBytes(6).toString('hex') + UPLOAD_TYPES[type];
    fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
    return json(res, 200, { url: '/uploads/' + name });
  }

  if (p.startsWith('/api/')) return json(res, 404, { error: 'Rota não encontrada.' });
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Método não permitido');

  if (p.startsWith('/uploads/')) return serveFile(res, UPLOAD_DIR, p.slice('/uploads/'.length), 'public, max-age=31536000, immutable');

  // páginas: /, /convite/, /admin/
  if (p === '/convite' || p === '/admin') return send(res, 301, '', { Location: p + '/' + url.search });
  if (p.endsWith('/')) p += 'index.html';
  return serveFile(res, PUBLIC_DIR, p, 'no-cache');
}

http.createServer((req, res) => {
  handle(req, res).catch((e) => { console.error(e); if (!res.headersSent) json(res, 500, { error: 'Erro interno.' }); else res.end(); });
}).listen(PORT, '0.0.0.0', () => console.log('Fronteira do Sul RP em http://0.0.0.0:' + PORT));

setInterval(() => { const now = Date.now(); for (const [t, e] of sessions) if (e < now) sessions.delete(t); }, 600000).unref();
