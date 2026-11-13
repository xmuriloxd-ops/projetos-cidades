/**
 * Fronteira do Sul RP — servidor do site de regras
 * Sem dependências externas (apenas módulos nativos do Node).
 *
 * Rotas:
 *   GET  /api/content        → conteúdo público (regras, convite, galeria)
 *   POST /api/login          → login do admin (admin / senha configurada)
 *   POST /api/content        → salva o conteúdo (autenticado)
 *   POST /api/upload         → envia uma foto (autenticado)
 *   GET  /uploads/*          → fotos enviadas pelo admin
 *   GET  /convite/           → página de convite
 *   GET  /admin/             → painel de admin
 *   GET  /                   → site principal
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const PUB = path.join(ROOT, 'public');
const UPLOADS = path.join(ROOT, 'uploads');
const DATA = path.join(ROOT, 'data');
const CONTENT_FILE = path.join(DATA, 'content.json');
const CONFIG_FILE = path.join(DATA, 'config.json');
const SESSIONS_FILE = path.join(DATA, 'sessions.json');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const SESSION_TTL = 12 * 60 * 60 * 1000; // 12 horas
const MAX_BODY = 15 * 1024 * 1024; // 15 MB (fotos em base64)
const MAX_IMAGE = 10 * 1024 * 1024; // 10 MB por imagem

for (const dir of [PUB, UPLOADS, DATA]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/* ---------------- configuração (usuário/senha do admin) ---------------- */
function loadConfig() {
  try {
    const cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    if (cfg && cfg.user && cfg.pass) return cfg;
  } catch (_) {}
  const cfg = { user: 'admin', pass: '142536' };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2));
  return cfg;
}
const config = loadConfig();

/* ---------------- conteúdo ---------------- */
function loadContent() {
  try {
    const raw = fs.readFileSync(CONTENT_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.general && parsed.police) return parsed;
    throw new Error('formato inválido');
  } catch (e) {
    if (e.code !== 'ENOENT') console.warn('[content] falha ao ler content.json, usando padrão:', e.message);
    return require('./data/default-content.js');
  }
}
function saveContent(obj) {
  const tmp = CONTENT_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2));
  fs.renameSync(tmp, CONTENT_FILE);
}

/* ---------------- sessões ---------------- */
function loadSessions() {
  try {
    const s = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
    return s && typeof s === 'object' ? s : {};
  } catch (_) {
    return {};
  }
}
let sessions = loadSessions();
function persistSessions() {
  try { fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions)); } catch (_) {}
}
function cleanupSessions() {
  const now = Date.now();
  let dirty = false;
  for (const [k, v] of Object.entries(sessions)) {
    if (!v || v < now) { delete sessions[k]; dirty = true; }
  }
  if (dirty) persistSessions();
}
setInterval(cleanupSessions, 5 * 60 * 1000).unref();

function getSessionToken(req) {
  const h = req.headers['authorization'] || '';
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1] : null;
}
function isAuthenticated(req) {
  const t = getSessionToken(req);
  if (!t) return false;
  cleanupSessions();
  return Boolean(sessions[t] && sessions[t] > Date.now());
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/* tentativas de login (proteção simples contra força bruta) */
const loginAttempts = new Map(); // ip -> {count, first}
function rateLimited(ip) {
  const now = Date.now();
  const rec = loginAttempts.get(ip);
  if (!rec || now - rec.first > 60000) {
    loginAttempts.set(ip, { count: 1, first: now });
    return false;
  }
  rec.count += 1;
  return rec.count > 8;
}

/* ---------------- utilitários ---------------- */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function sendFile(res, filePath, cache) {
  fs.readFile(filePath, (err, data) => {
    if (err) { notFound(res); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': cache ? 'public, max-age=3600' : 'no-store'
    });
    res.end(data);
  });
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) {
        reject(Object.assign(new Error('payload muito grande'), { code: 'TOO_BIG' }));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function notFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Página não encontrada</title>
<style>body{background:#0a0e17;color:#e6eaf2;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}a{color:#f0b429}</style></head>
<body><div style="text-align:center"><h1>404</h1><p>Página não encontrada.</p><a href="/">Voltar para o início</a></div></body></html>`);
}

function securityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'same-origin');
}

/* ---------------- rotas ---------------- */
async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/content') {
    sendJson(res, 200, loadContent());
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/login') {
    const ip = req.socket.remoteAddress || 'unknown';
    if (rateLimited(ip)) {
      sendJson(res, 429, { error: 'Muitas tentativas. Aguarde um minuto.' });
      return;
    }
    const raw = await readBody(req, 64 * 1024);
    let body = {};
    try { body = JSON.parse(raw.toString('utf8')); } catch (_) {}
    const user = String(body.user || '');
    const pass = String(body.pass || '');
    const okUser = safeEqual(user, config.user);
    const okPass = safeEqual(pass, config.pass);
    if (okUser && okPass) {
      cleanupSessions();
      const token = crypto.randomBytes(32).toString('hex');
      sessions[token] = Date.now() + SESSION_TTL;
      persistSessions();
      sendJson(res, 200, { token });
    } else {
      sendJson(res, 401, { error: 'Usuário ou senha inválidos.' });
    }
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/content') {
    if (!isAuthenticated(req)) { sendJson(res, 401, { error: 'Não autenticado.' }); return; }
    const raw = await readBody(req, MAX_BODY);
    let body;
    try { body = JSON.parse(raw.toString('utf8')); } catch (_) {
      sendJson(res, 400, { error: 'JSON inválido.' }); return;
    }
    if (!body || typeof body !== 'object' || !body.general || !body.police) {
      sendJson(res, 400, { error: 'Conteúdo em formato inválido.' }); return;
    }
    saveContent(body);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/upload') {
    if (!isAuthenticated(req)) { sendJson(res, 401, { error: 'Não autenticado.' }); return; }
    const raw = await readBody(req, MAX_BODY);
    let body;
    try { body = JSON.parse(raw.toString('utf8')); } catch (_) {
      sendJson(res, 400, { error: 'JSON inválido.' }); return;
    }
    const dataUrl = String(body.data || '');
    const m = /^data:image\/(png|jpe?g|webp|gif);base64,(.+)$/i.exec(dataUrl);
    if (!m) { sendJson(res, 400, { error: 'Envie uma imagem PNG, JPG, WEBP ou GIF.' }); return; }
    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > MAX_IMAGE) { sendJson(res, 413, { error: 'Imagem muito grande (máx. 10 MB).' }); return; }
    const ext = m[1].toLowerCase().replace('jpeg', 'jpg');
    const name = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;
    fs.writeFileSync(path.join(UPLOADS, name), buf);
    sendJson(res, 200, { url: `/uploads/${name}` });
    return;
  }

  sendJson(res, 404, { error: 'Rota não encontrada.' });
}

const server = http.createServer(async (req, res) => {
  securityHeaders(res);
  const url = new URL(req.url, 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);

  try {
    if (pathname.startsWith('/api/')) {
      await handleApi(req, res, url);
      return;
    }

    if (pathname.startsWith('/uploads/')) {
      const name = path.basename(pathname);
      const filePath = path.join(UPLOADS, name);
      if (!filePath.startsWith(UPLOADS)) { notFound(res); return; }
      sendFile(res, filePath, true);
      return;
    }

    if (pathname === '/convite') { res.writeHead(301, { Location: '/convite/' }); res.end(); return; }
    if (pathname === '/admin') { res.writeHead(301, { Location: '/admin/' }); res.end(); return; }

    if (pathname === '/' || pathname === '/index.html') {
      sendFile(res, path.join(PUB, 'index.html'), false);
      return;
    }
    if (pathname === '/convite/' || pathname === '/convite/index.html') {
      sendFile(res, path.join(PUB, 'convite', 'index.html'), false);
      return;
    }
    if (pathname === '/admin/' || pathname === '/admin/index.html') {
      sendFile(res, path.join(PUB, 'admin', 'index.html'), false);
      return;
    }

    // arquivos estáticos (/css, /js, /assets)
    const safe = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
    const filePath = path.join(PUB, safe);
    if (filePath.startsWith(PUB) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      sendFile(res, filePath, true);
      return;
    }

    notFound(res);
  } catch (err) {
    if (err && err.code === 'TOO_BIG') { sendJson(res, 413, { error: 'Conteúdo muito grande.' }); return; }
    console.error(err);
    sendJson(res, 500, { error: 'Erro interno do servidor.' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Fronteira do Sul RP — servidor rodando em http://${HOST}:${PORT}`);
});
