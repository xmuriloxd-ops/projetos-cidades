/* Teste de fumaça com jsdom — roda com o servidor em :3000 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const ROOT = path.join(__dirname, '..');

const BASE = 'http://localhost:3000';

// Reseta o conteúdo salvo para o padrão antes de testar (idempotente)
const CONTENT_FILE = path.join(ROOT, 'data', 'content.json');
if (fs.existsSync(CONTENT_FILE)) fs.rmSync(CONTENT_FILE);

function loadPage(htmlPath, urlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, {
    url: BASE + urlPath,
    runScripts: 'outside-only',
    pretendToBeVisual: true
  });
  const w = dom.window;
  w.fetch = (u, opts) => fetch(new URL(u, BASE + urlPath).href, opts);
  w.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
  w.scrollTo = () => {};
  w.confirm = () => true;
  return dom;
}

async function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

const results = [];
function check(name, cond) {
  results.push([name, Boolean(cond)]);
  console.log((cond ? 'PASS' : 'FAIL') + ' — ' + name);
}

(async () => {
  /* ---------- página pública ---------- */
  const pub = loadPage(path.join(ROOT, 'public', 'index.html'), '/');
  pub.window.eval(fs.readFileSync(path.join(ROOT, 'public', 'js', 'site.js'), 'utf8'));
  await wait(400);

  const d = pub.window.document;
  check('site: 12 seções renderizadas', d.querySelectorAll('#sections .section').length === 12);
  check('site: índice com 12 links', d.querySelectorAll('#index a').length === 12);
  check('site: destaque preenchido', d.querySelector('#highlight-title').textContent.includes('Cheats'));
  check('site: hero meta automática', d.querySelector('#hero-meta').textContent.includes('12 seções'));
  check('site: tabela de multas presente', d.querySelectorAll('#extras table').length === 5);
  check('site: rodapé sem "manus"', !d.body.textContent.toLowerCase().includes('made with manus') && !d.body.textContent.toLowerCase().includes('manus.space'));
  check('site: tab admin presente', d.querySelector('.tab-admin')?.getAttribute('href') === '/admin/');

  // pesquisa
  const search = d.querySelector('#search');
  search.value = 'fleeca';
  search.dispatchEvent(new pub.window.Event('input', { bubbles: true }));
  await wait(50);
  const visible = [...d.querySelectorAll('#sections .section')].filter((s) => !s.hidden).length;
  check('site: pesquisa filtra seções (fleeca)', visible >= 1 && visible < 12);
  check('site: contador de busca visível', !d.querySelector('#search-count').hidden);

  search.value = '';
  search.dispatchEvent(new pub.window.Event('input', { bubbles: true }));
  await wait(50);
  check('site: limpar busca restaura tudo', [...d.querySelectorAll('#sections .section')].every((s) => !s.hidden));

  // troca de aba (polícia)
  const polTab = d.querySelector('.tab[data-tab="police"]');
  polTab.dispatchEvent(new pub.window.MouseEvent('click', { bubbles: true }));
  await wait(100);
  check('site: aba Polícia renderiza 7 seções', d.querySelectorAll('#sections .section').length === 7);
  check('site: título da aba Polícia', d.querySelector('#doc-title').textContent.includes('Polícia'));

  /* ---------- convite ---------- */
  const inv = loadPage(path.join(ROOT, 'public', 'convite', 'index.html'), '/convite/');
  await wait(300);
  const di = inv.window.document;
  check('convite: título', di.querySelector('#invite-title').textContent.includes('nova história'));
  check('convite: CTA aponta para /', di.querySelector('#invite-cta').getAttribute('href') === '/');
  check('convite: sem branding manus', !di.body.textContent.toLowerCase().includes('manus'));

  /* ---------- admin ---------- */
  const adm = loadPage(path.join(ROOT, 'public', 'admin', 'index.html'), '/admin/');
  const wa = adm.window;
  wa.eval(fs.readFileSync(path.join(ROOT, 'public', 'js', 'admin.js'), 'utf8'));
  await wait(400);
  const da = wa.document;
  check('admin: tela de login visível', !da.querySelector('#view-login').hidden);
  check('admin: painel oculto no início', da.querySelector('#view-panel').hidden);

  // login errado
  da.querySelector('#login-user').value = 'admin';
  da.querySelector('#login-pass').value = 'senha-errada';
  da.querySelector('#login-form').dispatchEvent(new wa.Event('submit', { bubbles: true, cancelable: true }));
  await wait(300);
  check('admin: login errado mostra erro', !da.querySelector('#login-error').hidden && da.querySelector('#view-panel').hidden);

  // login certo
  da.querySelector('#login-pass').value = '142536';
  da.querySelector('#login-form').dispatchEvent(new wa.Event('submit', { bubbles: true, cancelable: true }));
  await wait(400);
  check('admin: login ok abre o painel', !da.querySelector('#view-panel').hidden && da.querySelector('#view-login').hidden);
  check('admin: token salvo', Boolean(wa.localStorage.getItem('fsrp_admin_token')));
  check('admin: lista as 12 seções', da.querySelectorAll('.sec-card').length === 12);

  // editar título da 1ª seção
  const firstTitle = da.querySelector('.sec-card input[data-sec-f="title"]');
  firstTitle.value = 'Título editado pelo teste';
  firstTitle.dispatchEvent(new wa.Event('input', { bubbles: true }));
  check('admin: status "não salvas"', da.querySelector('#save-status').textContent.includes('não salvas'));

  // salvar
  da.querySelector('#btn-save').dispatchEvent(new wa.MouseEvent('click', { bubbles: true }));
  await wait(500);
  check('admin: salvar retorna ok', da.querySelector('#save-status').textContent.includes('salvas'));

  // adicionar seção
  da.querySelector('#add-sec').dispatchEvent(new wa.MouseEvent('click', { bubbles: true }));
  await wait(200);
  check('admin: nova seção adicionada (13)', da.querySelectorAll('.sec-card').length === 13);

  // salvar de novo e conferir no site público
  da.querySelector('#btn-save').dispatchEvent(new wa.MouseEvent('click', { bubbles: true }));
  await wait(500);

  const pub2 = loadPage(path.join(ROOT, 'public', 'index.html'), '/?v=2');
  pub2.window.eval(fs.readFileSync(path.join(ROOT, 'public', 'js', 'site.js'), 'utf8'));
  await wait(400);
  const d2 = pub2.window.document;
  check('site público reflete edição', d2.body.textContent.includes('Título editado pelo teste'));
  check('site público mostra nova seção (13)', d2.querySelectorAll('#sections .section').length === 13);

  /* ---------- resultado ---------- */
  const failed = results.filter(([, ok]) => !ok);
  console.log('\n' + (results.length - failed.length) + '/' + results.length + ' testes OK');
  process.exit(failed.length ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
