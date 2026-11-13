/* Fronteira do Sul RP — painel de administração */
(function () {
  const TOKEN_KEY = 'fsrp_admin_token';

  let token = localStorage.getItem(TOKEN_KEY) || '';
  let content = null;
  let currentPanel = 'general';
  let dirty = false;
  let currentDoc = null; // referência do documento aberto (general/police)

  const $ = (s) => document.querySelector(s);
  const els = {
    viewLogin: $('#view-login'),
    viewPanel: $('#view-panel'),
    panelRoot: $('#panel-root'),
    tabs: $('#admin-tabs'),
    btnSave: $('#btn-save'),
    btnLogout: $('#btn-logout'),
    saveStatus: $('#save-status'),
    loginForm: $('#login-form'),
    loginError: $('#login-error'),
    toast: $('#toast')
  };

  /* ================= util ================= */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function uid(p) { return p + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function toast(msg, kind) {
    els.toast.textContent = msg;
    els.toast.className = 'toast ' + (kind || 'ok');
    els.toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { els.toast.hidden = true; }, 2600);
  }

  function markDirty() {
    dirty = true;
    els.saveStatus.textContent = 'Alterações não salvas';
    els.saveStatus.className = 'save-status';
  }

  function autoGrow(ta) {
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight + 2, 640) + 'px';
  }

  function authHeaders() {
    return { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' };
  }

  /* ================= autenticação ================= */
  function showLogin(msg) {
    els.viewLogin.hidden = false;
    els.viewPanel.hidden = true;
    els.tabs.hidden = true;
    els.btnSave.hidden = true;
    els.btnLogout.hidden = true;
    els.saveStatus.textContent = '';
    if (msg) {
      els.loginError.textContent = msg;
      els.loginError.hidden = false;
    }
  }

  function showPanel() {
    els.viewLogin.hidden = true;
    els.viewPanel.hidden = false;
    els.tabs.hidden = false;
    els.btnSave.hidden = false;
    els.btnLogout.hidden = false;
    renderPanel();
  }

  function logout(msg) {
    token = '';
    localStorage.removeItem(TOKEN_KEY);
    showLogin(msg || '');
  }

  els.loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    els.loginError.hidden = true;
    const user = $('#login-user').value.trim();
    const pass = $('#login-pass').value;
    try {
      const r = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'Falha no login.');
      token = j.token;
      localStorage.setItem(TOKEN_KEY, token);
      $('#login-pass').value = '';
      showPanel();
    } catch (err) {
      els.loginError.textContent = err.message || 'Falha no login.';
      els.loginError.hidden = false;
    }
  });

  els.btnLogout.addEventListener('click', () => logout());

  els.btnSave.addEventListener('click', save);

  async function save() {
    els.saveStatus.textContent = 'Salvando…';
    try {
      const r = await fetch('/api/content', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(content)
      });
      if (r.status === 401) { logout('Sessão expirada. Entre novamente.'); return; }
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'Erro ao salvar.');
      dirty = false;
      els.saveStatus.textContent = 'Todas as alterações salvas';
      els.saveStatus.className = 'save-status ok';
      toast('Alterações salvas com sucesso!');
    } catch (err) {
      els.saveStatus.textContent = 'Erro ao salvar';
      els.saveStatus.className = 'save-status err';
      toast(err.message || 'Erro ao salvar.', 'err');
    }
  }

  window.addEventListener('beforeunload', (e) => {
    if (dirty) { e.preventDefault(); e.returnValue = ''; }
  });

  /* ================= upload de imagens ================= */
  function pickImage(multiple, cb) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg,image/webp,image/gif';
    input.multiple = Boolean(multiple);
    input.onchange = () => {
      const files = Array.from(input.files || []);
      if (!files.length) return;
      files.forEach((f) => {
        const r = new FileReader();
        r.onload = () => cb(r.result, f.name);
        r.readAsDataURL(f);
      });
    };
    input.click();
  }

  async function uploadImage(dataUrl) {
    const r = await fetch('/api/upload', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ data: dataUrl })
    });
    if (r.status === 401) { logout('Sessão expirada. Entre novamente.'); throw new Error('Sessão expirada.'); }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || 'Erro no upload.');
    return j.url;
  }

  function copyText(text) {
    const done = () => toast('Caminho copiado!');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else fallback();
    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (_) { toast('Não foi possível copiar.', 'err'); }
      document.body.removeChild(ta);
    }
  }

  /* ================= abas ================= */
  document.querySelectorAll('.atab').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentPanel = btn.dataset.panel;
      document.querySelectorAll('.atab').forEach((b) => b.classList.toggle('active', b === btn));
      renderPanel();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* ================= render ================= */
  function renderPanel() {
    if (currentPanel === 'general') renderDoc(content.general, 'Regras gerais', 'Edite as seções do regulamento, adicione novas regras e coloque fotos.');
    else if (currentPanel === 'police') renderDoc(content.police, 'Regras da Polícia', 'Edite o documento da Polícia da Fronteira do Sul.');
    else if (currentPanel === 'site') renderSite();
    else if (currentPanel === 'invite') renderInvite();
    else if (currentPanel === 'gallery') renderGallery();
    document.querySelectorAll('.panel textarea.html-area').forEach(autoGrow);
  }

  /* ---------- documento (regras) ---------- */
  function renderDoc(doc, title, desc) {
    currentDoc = doc;
    const hero = doc.hero || (doc.hero = {});
    const hl = doc.highlight || (doc.highlight = {});

    els.panelRoot.innerHTML = `
      <div class="panel-head"><h2>${esc(title)}</h2><p>${esc(desc)}</p></div>

      <div class="card">
        <p class="card-title">CABEÇALHO DA PÁGINA</p>
        <div class="grid-2">
          <label class="field"><span>Selo (label)</span>
            <input data-g="hero" data-f="label" value="${esc(hero.label || '')}"></label>
          <label class="field"><span>Texto de apoio (meta)</span>
            <input data-g="hero" data-f="meta" value="${esc(hero.meta || '')}" placeholder="vazio = auto (12 seções · Busca…)"></label>
        </div>
        <label class="field"><span>Título principal (pode usar &lt;em&gt; para itálico)</span>
          <input data-g="hero" data-f="titleHtml" value="${esc(hero.titleHtml || '')}"></label>
        <label class="field"><span>Subtítulo</span>
          <textarea data-g="hero" data-f="subtitle" rows="2">${esc(hero.subtitle || '')}</textarea></label>
        <div class="grid-2">
          <label class="field"><span>Selo do documento</span>
            <input data-f="docLabel" value="${esc(doc.docLabel || '')}"></label>
          <label class="field"><span>Título do documento</span>
            <input data-f="docTitle" value="${esc(doc.docTitle || '')}"></label>
        </div>
      </div>

      <div class="card">
        <p class="card-title">DESTAQUE (CARTÃO SUPERIOR)</p>
        <div class="grid-3">
          <label class="field"><span>Selo 1</span>
            <input data-g="highlight" data-f="badge" value="${esc(hl.badge || '')}"></label>
          <label class="field"><span>Selo 2</span>
            <input data-g="highlight" data-f="tag" value="${esc(hl.tag || '')}"></label>
          <label class="field"><span>Título</span>
            <input data-g="highlight" data-f="title" value="${esc(hl.title || '')}"></label>
        </div>
        <label class="field"><span>Texto</span>
          <textarea data-g="highlight" data-f="text" rows="3">${esc(hl.text || '')}</textarea></label>
      </div>

      <div class="card">
        <p class="card-title">SEÇÕES · ${doc.sections.length} REGRA(S)</p>
        <div id="sec-list"></div>
        <div class="add-bar">
          <button class="btn btn-gold" id="add-sec" type="button">+ Adicionar nova regra</button>
        </div>
      </div>

      <div class="card">
        <p class="card-title">COMPLEMENTO DO DOCUMENTO (multas, CNH etc.)</p>
        <label class="field"><span>HTML — deixe vazio para ocultar</span>
          <textarea class="html-area" data-f="extrasHtml">${esc(doc.extrasHtml || '')}</textarea></label>
      </div>
    `;

    // campos simples
    els.panelRoot.querySelectorAll('[data-f]').forEach((el) => {
      if (el.dataset.g) return;
      el.addEventListener('input', () => { doc[el.dataset.f] = el.value; markDirty(); });
      if (el.tagName === 'TEXTAREA') el.addEventListener('input', () => autoGrow(el));
    });
    // campos de grupo (hero / highlight)
    els.panelRoot.querySelectorAll('[data-g]').forEach((el) => {
      el.addEventListener('input', () => {
        doc[el.dataset.g][el.dataset.f] = el.value;
        markDirty();
      });
      if (el.tagName === 'TEXTAREA') el.addEventListener('input', () => autoGrow(el));
    });

    renderSecList(doc);

    els.panelRoot.querySelector('#add-sec').addEventListener('click', () => {
      doc.sections.push({
        id: uid('sec'),
        title: 'Nova regra',
        html: '<p>Escreva aqui o conteúdo da nova regra.</p>'
      });
      markDirty();
      renderDoc(doc, title, desc);
      const cards = els.panelRoot.querySelectorAll('.sec-card');
      const last = cards[cards.length - 1];
      if (last && typeof last.scrollIntoView === 'function') last.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast('Nova regra adicionada. Não esqueça de salvar.');
    });
  }

  function renderSecList(doc) {
    const list = els.panelRoot.querySelector('#sec-list');
    if (!list) return;

    list.innerHTML = doc.sections
      .map(
        (sec, i) => `
      <div class="sec-card" data-i="${i}">
        <div class="sec-card-top">
          <span class="sec-badge">SEÇÃO ${pad(i + 1)}</span>
          <span class="spacer"></span>
          <button class="btn btn-small" type="button" data-act="up" title="Mover para cima">↑</button>
          <button class="btn btn-small" type="button" data-act="down" title="Mover para baixo">↓</button>
          <button class="btn btn-small" type="button" data-act="photo" title="Enviar foto para esta regra">📷 Foto</button>
          <button class="btn btn-small btn-danger" type="button" data-act="del">Excluir</button>
        </div>
        <label class="field"><span>Título da regra</span>
          <input data-sec-f="title" value="${esc(sec.title || '')}"></label>
        <label class="field"><span>Conteúdo (HTML)</span>
          <textarea class="html-area" data-sec-f="html" rows="6">${esc(sec.html || '')}</textarea></label>
      </div>`
      )
      .join('');

    list.querySelectorAll('textarea').forEach(autoGrow);

    if (list._bound) return;
    list._bound = true;

    list.addEventListener('input', (e) => {
      const field = e.target.dataset.secF;
      if (!field) return;
      const card = e.target.closest('.sec-card');
      if (!card) return;
      const i = Number(card.dataset.i);
      currentDoc.sections[i][field] = e.target.value;
      if (e.target.tagName === 'TEXTAREA') autoGrow(e.target);
      markDirty();
    });

    list.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const card = btn.closest('.sec-card');
      const i = Number(card.dataset.i);
      const act = btn.dataset.act;
      const secs = currentDoc.sections;

      if (act === 'up' && i > 0) {
        [secs[i - 1], secs[i]] = [secs[i], secs[i - 1]];
        markDirty(); refreshList();
      } else if (act === 'down' && i < secs.length - 1) {
        [secs[i + 1], secs[i]] = [secs[i], secs[i + 1]];
        markDirty(); refreshList();
      } else if (act === 'del') {
        if (!confirm(`Excluir a seção "${secs[i].title}"?`)) return;
        secs.splice(i, 1);
        markDirty(); refreshList();
        toast('Seção removida. Clique em Salvar.');
      } else if (act === 'photo') {
        pickImage(false, async (dataUrl) => {
          try {
            const url = await uploadImage(dataUrl);
            secs[i].html = (secs[i].html || '') + `\n<img src="${url}" alt="Foto da regra">`;
            markDirty(); refreshList();
            toast('Foto adicionada à regra. Clique em Salvar.');
          } catch (err) { toast(err.message, 'err'); }
        });
      }
    });

    function refreshList() {
      const panel = currentDoc;
      const scroll = window.scrollY;
      renderPanel();
      window.scrollTo(0, scroll);
      void panel;
    }
  }

  /* ---------- ajustes do site ---------- */
  function renderSite() {
    const s = content.site || (content.site = {});
    els.panelRoot.innerHTML = `
      <div class="panel-head"><h2>Ajustes do site</h2><p>Nome, identidade visual, título e rodapé do site.</p></div>

      <div class="card">
        <p class="card-title">IDENTIDADE</p>
        <img class="logo-preview" id="logo-preview" src="${esc(s.logo || '/assets/logo.png')}" alt="">
        <div class="add-bar" style="margin-bottom:14px">
          <button class="btn" id="logo-upload" type="button">Enviar nova logo</button>
        </div>
        <div class="grid-2">
          <label class="field"><span>Nome da cidade</span>
            <input data-f="name" value="${esc(s.name || '')}"></label>
          <label class="field"><span>Linha de apoio</span>
            <input data-f="tagline" value="${esc(s.tagline || '')}"></label>
        </div>
        <label class="field"><span>Logo (caminho da imagem)</span>
          <input data-f="logo" value="${esc(s.logo || '')}"></label>
      </div>

      <div class="card">
        <p class="card-title">PÁGINA (NAVEGADOR)</p>
        <label class="field"><span>Título da aba</span>
          <input data-f="pageTitle" value="${esc(s.pageTitle || '')}"></label>
        <label class="field"><span>Descrição</span>
          <textarea data-f="description" rows="2">${esc(s.description || '')}</textarea></label>
        <label class="field"><span>Rodapé</span>
          <input data-f="footer" value="${esc(s.footer || '')}"></label>
      </div>
    `;

    els.panelRoot.querySelectorAll('[data-f]').forEach((el) => {
      el.addEventListener('input', () => { s[el.dataset.f] = el.value; markDirty(); });
      if (el.tagName === 'TEXTAREA') el.addEventListener('input', () => autoGrow(el));
    });

    els.panelRoot.querySelector('#logo-upload').addEventListener('click', () => {
      pickImage(false, async (dataUrl) => {
        try {
          const url = await uploadImage(dataUrl);
          s.logo = url;
          markDirty();
          renderSite();
          document.querySelectorAll('.html-area').forEach(autoGrow);
          toast('Logo atualizada. Clique em Salvar.');
        } catch (err) { toast(err.message, 'err'); }
      });
    });
  }

  /* ---------- convite ---------- */
  function renderInvite() {
    const inv = content.invite || (content.invite = {});
    els.panelRoot.innerHTML = `
      <div class="panel-head"><h2>Página de convite</h2><p>Conteúdo exibido em /convite/.</p></div>

      <div class="card">
        <p class="card-title">IMAGEM DO CONVITE</p>
        <img class="image-preview" id="inv-preview" src="${esc(inv.image || '/assets/convite-banner.jpg')}" alt="">
        <div class="add-bar" style="margin-bottom:14px">
          <button class="btn" id="inv-upload" type="button">Enviar nova imagem</button>
        </div>
        <label class="field"><span>Caminho da imagem</span>
          <input data-f="image" value="${esc(inv.image || '')}"></label>
      </div>

      <div class="card">
        <p class="card-title">TEXTOS</p>
        <label class="field"><span>Selo</span>
          <input data-f="label" value="${esc(inv.label || '')}"></label>
        <label class="field"><span>Título</span>
          <input data-f="title" value="${esc(inv.title || '')}"></label>
        <label class="field"><span>Subtítulo</span>
          <textarea data-f="subtitle" rows="2">${esc(inv.subtitle || '')}</textarea></label>
        <label class="field"><span>Botão (texto)</span>
          <input data-f="cta" value="${esc(inv.cta || '')}"></label>
      </div>
    `;

    els.panelRoot.querySelectorAll('[data-f]').forEach((el) => {
      el.addEventListener('input', () => { inv[el.dataset.f] = el.value; markDirty(); });
      if (el.tagName === 'TEXTAREA') el.addEventListener('input', () => autoGrow(el));
    });

    els.panelRoot.querySelector('#inv-upload').addEventListener('click', () => {
      pickImage(false, async (dataUrl) => {
        try {
          const url = await uploadImage(dataUrl);
          inv.image = url;
          markDirty();
          renderInvite();
          toast('Imagem atualizada. Clique em Salvar.');
        } catch (err) { toast(err.message, 'err'); }
      });
    });
  }

  /* ---------- galeria ---------- */
  function renderGallery() {
    if (!Array.isArray(content.gallery)) content.gallery = [];
    const gal = content.gallery;

    els.panelRoot.innerHTML = `
      <div class="panel-head"><h2>Fotos</h2>
        <p>Envie fotos da cidade. Elas aparecem na galeria do site e podem ser inseridas em qualquer regra pelo botão 📷.</p></div>

      <div class="upload-zone" id="upload-zone">
        <strong>Clique para enviar fotos</strong><br>
        PNG, JPG, WEBP ou GIF · até 10 MB cada
      </div>

      <div class="gal-grid" id="gal-grid"></div>
      ${gal.length === 0 ? '<p style="color:var(--muted)">Nenhuma foto enviada ainda.</p>' : ''}
    `;

    const grid = els.panelRoot.querySelector('#gal-grid');
    grid.innerHTML = gal
      .map(
        (g, i) => `
      <div class="gal-item" data-i="${i}">
        <img src="${esc(g.url || '')}" alt="">
        <div class="gal-body">
          <input data-cap placeholder="Legenda (opcional)" value="${esc(g.caption || '')}">
          <div class="gal-actions">
            <button class="btn btn-small" data-act="copy" type="button">Copiar caminho</button>
            <button class="btn btn-small btn-danger" data-act="del" type="button">Remover</button>
          </div>
        </div>
      </div>`
      )
      .join('');

    grid.querySelectorAll('[data-cap]').forEach((inp) => {
      inp.addEventListener('input', () => {
        gal[Number(inp.closest('.gal-item').dataset.i)].caption = inp.value;
        markDirty();
      });
    });

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const i = Number(btn.closest('.gal-item').dataset.i);
      if (btn.dataset.act === 'copy') copyText(gal[i].url);
      if (btn.dataset.act === 'del') {
        if (!confirm('Remover esta foto?')) return;
        gal.splice(i, 1);
        markDirty();
        renderGallery();
        toast('Foto removida. Clique em Salvar.');
      }
    });

    els.panelRoot.querySelector('#upload-zone').addEventListener('click', () => {
      pickImage(true, async (dataUrl) => {
        try {
          const url = await uploadImage(dataUrl);
          content.gallery.push({ id: uid('g'), url, caption: '' });
          markDirty();
          renderGallery();
          toast('Foto enviada. Clique em Salvar.');
        } catch (err) { toast(err.message, 'err'); }
      });
    });
  }

  /* ================= boot ================= */
  async function boot() {
    try {
      const r = await fetch('/api/content', { cache: 'no-store' });
      content = await r.json();
    } catch (_) {
      showLogin('Não foi possível carregar o conteúdo do site.');
      return;
    }
    if (token) showPanel();
    else showLogin();
  }

  boot();
})();
