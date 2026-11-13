(function () {
  var el = FS.el, $ = function (id) { return document.getElementById(id); };
  var token = sessionStorage.getItem('fs_token') || '';
  var data = null, view = 'geral', dirty = false, onPick = null;

  function api(method, url, body, raw) {
    var headers = { Authorization: 'Bearer ' + token };
    if (body && !raw) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(body); }
    return fetch(url, { method: method, headers: headers, body: body }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.status === 401 && url !== '/api/login') showLogin('Sessão expirada. Entre novamente — o que você editou continua na tela.');
        if (!r.ok) throw new Error(j.error || 'Falha na conexão com o servidor.');
        return j;
      });
    }, function () { throw new Error('Sem conexão com o servidor.'); });
  }

  function status(text, cls) { var s = $('status'); s.textContent = text; s.className = 'msg ' + (cls || ''); }
  function markDirty() { dirty = true; status('Alterações não salvas'); }
  function showLogin(msg) {
    $('login').hidden = false; $('panel').hidden = true; $('logout').hidden = true;
    $('loginMsg').textContent = msg || '';
  }
  function showPanel() { $('login').hidden = true; $('panel').hidden = false; $('logout').hidden = false; }

  function upload(cb) { onPick = cb; $('file').value = ''; $('file').click(); }
  $('file').addEventListener('change', function () {
    var f = this.files[0]; if (!f) return;
    if (f.size > 8 * 1024 * 1024) return status('A foto passa do limite de 8 MB.', 'error');
    status('Enviando foto…');
    api('POST', '/api/upload', f, true).then(function (j) { onPick(j.url); markDirty(); status('Foto enviada. Clique em “Salvar alterações”.'); })
      .catch(function (e) { status(e.message, 'error'); });
  });

  function field(label, obj, key, opts) {
    opts = opts || {};
    var wrap = el('label', opts.wide ? 'wide' : '', label + ' ');
    var input = el(opts.area ? 'textarea' : 'input');
    input.value = obj[key] || '';
    input.addEventListener('input', function () { obj[key] = input.value; markDirty(); if (opts.onInput) opts.onInput(); });
    wrap.appendChild(input);
    return wrap;
  }
  function imageField(label, obj, key) {
    var wrap = el('div', 'wide'), row = el('div', 'imgfield'), img = el('img'), b = el('button', 'ghost', 'Trocar foto');
    wrap.appendChild(el('label', '', label));
    img.alt = ''; img.src = FS.safeUrl(obj[key]) || '';
    b.type = 'button';
    b.addEventListener('click', function () { upload(function (url) { obj[key] = url; img.src = url; }); });
    row.appendChild(img); row.appendChild(b); wrap.appendChild(row);
    return wrap;
  }

  function tab() { return data.tabs.filter(function (t) { return t.id === view; })[0]; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function renderRules(openId) {
    var t = tab(), box = $('tabFields'), list = $('list');
    box.textContent = '';
    box.appendChild(el('h2', '', 'Cabeçalho desta aba'));
    box.appendChild(field('Nome da aba', t, 'label'));
    box.appendChild(field('Título', t, 'title'));
    box.appendChild(field('Texto pequeno acima do título', t, 'kicker'));
    box.appendChild(field('Selo ao lado do título', t, 'badge'));
    box.appendChild(field('Observação abaixo do título', t, 'intro', { wide: true }));

    list.textContent = '';
    t.sections.forEach(function (s, i) {
      var d = el('details', 'card item'); d.open = s.id === openId;
      var sum = el('summary'), title = el('span', 't', s.title || '(sem título)'), tools = el('span', 'tools');
      sum.appendChild(el('span', 'n', pad(i + 1))); sum.appendChild(title);
      function tool(text, label, fn, disabled, cls) {
        var b = el('button', 'ghost ' + (cls || ''), text); b.type = 'button'; b.disabled = !!disabled;
        b.setAttribute('aria-label', label); b.title = label;
        b.addEventListener('click', function (e) { e.preventDefault(); fn(); });
        tools.appendChild(b);
      }
      tool('↑', 'Mover para cima', function () { t.sections.splice(i - 1, 0, t.sections.splice(i, 1)[0]); markDirty(); renderRules(d.open ? s.id : null); }, i === 0);
      tool('↓', 'Mover para baixo', function () { t.sections.splice(i + 1, 0, t.sections.splice(i, 1)[0]); markDirty(); renderRules(d.open ? s.id : null); }, i === t.sections.length - 1);
      tool('Excluir', 'Excluir seção', function () {
        if (!confirm('Excluir a seção “' + (s.title || 'sem título') + '”? Ela só some do site depois de salvar.')) return;
        t.sections.splice(i, 1); markDirty(); renderRules();
      }, false, 'danger');
      sum.appendChild(tools); d.appendChild(sum);

      var fields = el('div', 'fields'), preview = el('div', 'preview'), built = false;
      function refresh() { preview.textContent = ''; preview.appendChild(FS.renderBody(s.body)); }
      function build() {
        if (built) return; built = true;
        fields.appendChild(field('Título da seção', s, 'title', { onInput: function () { title.textContent = s.title || '(sem título)'; } }));
        var body = field('Texto das regras', s, 'body', { area: true, onInput: refresh });
        var ta = body.querySelector('textarea');
        fields.appendChild(body);
        var row = el('div', 'row');
        function ins(text, labelText) {
          var b = el('button', 'ghost', labelText); b.type = 'button';
          b.addEventListener('click', function () { text(); });
          row.appendChild(b);
        }
        function append(snippet) {
          ta.value = ta.value.replace(/\s+$/, '') + (ta.value.trim() ? '\n\n' : '') + snippet + '\n';
          s.body = ta.value; markDirty(); refresh(); ta.focus(); ta.scrollTop = ta.scrollHeight;
        }
        ins(function () { upload(function (url) { append('![](' + url + ')'); }); }, '📷 Adicionar foto');
        ins(function () { append('## Novo subtítulo'); }, '+ Subtítulo');
        ins(function () { append('- Primeiro item\n- Segundo item'); }, '+ Lista');
        ins(function () { append('| Infração | Valor | Pontos |\n| Exemplo | R$ 1.000 | 1 pts |'); }, '+ Tabela');
        fields.appendChild(row);
        fields.appendChild(el('label', '', 'Como vai aparecer no site'));
        fields.appendChild(preview); refresh();
      }
      d.addEventListener('toggle', function () { if (d.open) build(); });
      if (d.open) build();
      d.appendChild(fields); list.appendChild(d);
    });
  }

  function renderSite() {
    var v = $('viewSite'); v.textContent = '';
    function card(titleText, items) {
      var c = el('div', 'card grid2'); c.appendChild(el('h2', '', titleText));
      items.forEach(function (i) { c.appendChild(i); }); v.appendChild(c);
    }
    card('Marca', [
      field('Nome da cidade', data.brand, 'name'), field('Frase sob o emblema', data.brand, 'sub'),
      field('Rodapé', data.brand, 'footer', { wide: true }), imageField('Emblema / logo', data.brand, 'logo'),
    ]);
    card('Topo da página de regras', [
      field('Texto pequeno', data.hero, 'kicker'), field('Título', data.hero, 'title'),
      field('Título (parte em destaque)', data.hero, 'titleEm', { wide: true }), field('Descrição', data.hero, 'text', { wide: true, area: true }),
    ]);
    card('Regra em destaque', [
      field('Etiqueta', data.destaque, 'tag'), field('Título', data.destaque, 'title'),
      field('Texto', data.destaque, 'text', { wide: true, area: true }),
    ]);
    card('Página de convite', [
      field('Texto pequeno', data.convite, 'kicker'), field('Título', data.convite, 'title'),
      field('Descrição', data.convite, 'text', { wide: true, area: true }), field('Texto do botão', data.convite, 'button'),
      imageField('Foto do convite', data.convite, 'image'),
    ]);
  }

  function render() {
    [].forEach.call($('views').children, function (b) { b.className = b.dataset.view === view ? 'on' : ''; });
    $('viewRules').hidden = view === 'site'; $('viewSite').hidden = view !== 'site';
    if (view === 'site') renderSite(); else renderRules();
  }

  $('views').addEventListener('click', function (e) { if (e.target.dataset.view) { view = e.target.dataset.view; render(); } });
  $('add').addEventListener('click', function () {
    var s = { id: Math.random().toString(36).slice(2, 12).padEnd(6, '0'), title: 'Nova regra', body: '' };
    tab().sections.push(s); markDirty(); renderRules(s.id);
    $('list').lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  $('save').addEventListener('click', function () {
    var b = this; b.disabled = true; status('Salvando…');
    api('PUT', '/api/content', data).then(function () { dirty = false; status('Salvo! O site já está atualizado.', 'ok'); })
      .catch(function (e) { status(e.message, 'error'); })
      .then(function () { b.disabled = false; });
  });
  $('logout').addEventListener('click', function () {
    if (dirty && !confirm('Há alterações não salvas. Sair mesmo assim?')) return;
    dirty = false; token = ''; sessionStorage.removeItem('fs_token'); data = null; showLogin();
  });
  window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

  function start() {
    if (data) return showPanel(); // voltou de uma sessão expirada: mantém as edições
    return fetch('/api/content').then(function (r) { return r.json(); }).then(function (c) { data = c; showPanel(); render(); status(''); });
  }
  $('login').addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = this.querySelector('button'); btn.disabled = true; $('loginMsg').textContent = '';
    api('POST', '/api/login', { user: $('user').value.trim(), pass: $('pass').value }).then(function (j) {
      token = j.token; sessionStorage.setItem('fs_token', token); $('pass').value = ''; return start();
    }).catch(function (err) { $('loginMsg').textContent = err.message; }).then(function () { btn.disabled = false; });
  });

  if (!token) showLogin();
  else fetch('/api/session', { headers: { Authorization: 'Bearer ' + token } }).then(function (r) { return r.ok ? start() : showLogin(); }, function () { showLogin(); });
})();
