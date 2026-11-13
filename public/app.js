(function () {
  var el = FS.el, $ = function (id) { return document.getElementById(id); };
  var data = null, current = 'geral';

  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tab() { return data.tabs.filter(function (t) { return t.id === current; })[0] || data.tabs[0]; }

  // Marca as ocorrências do termo pesquisado dentro de um elemento já renderizado.
  function highlight(root, term) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var text = node.nodeValue, low = norm(text);
      if (low.length !== text.length) return; // caracteres especiais: não arrisca desalinhar
      var i = low.indexOf(term), last = 0;
      if (i < 0) return;
      var frag = document.createDocumentFragment();
      while (i >= 0) {
        frag.appendChild(document.createTextNode(text.slice(last, i)));
        frag.appendChild(el('mark', '', text.slice(i, i + term.length)));
        last = i + term.length; i = low.indexOf(term, last);
      }
      frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  function renderChrome() {
    var b = data.brand, h = data.hero, d = data.destaque;
    $('brandName').textContent = b.name; $('emblemName').textContent = b.name; $('emblemSub').textContent = b.sub;
    var logo = FS.safeUrl(b.logo);
    [$('brandLogo'), $('emblemLogo')].forEach(function (img) { if (logo) img.src = logo; else img.hidden = true; });
    $('heroKicker').textContent = h.kicker; $('heroTitle').textContent = h.title; $('heroEm').textContent = h.titleEm; $('heroText').textContent = h.text;
    $('dTag').textContent = d.tag; $('dTitle').textContent = d.title; $('dText').textContent = d.text;
    $('footer').textContent = b.footer;

    var tabs = $('tabs'); tabs.textContent = '';
    data.tabs.forEach(function (t) {
      var a = el('a', t.id === current ? 'active' : '', t.label);
      a.href = '#' + t.id;
      if (t.id === current) a.setAttribute('aria-current', 'page');
      tabs.appendChild(a);
    });
  }

  function renderTab() {
    var t = tab(), term = norm($('q').value.trim());
    $('docKicker').textContent = t.kicker; $('docTitle').textContent = t.title;
    $('docIntro').textContent = t.intro; $('docIntro').hidden = !t.intro;
    $('docBadge').textContent = t.badge; $('docBadge').hidden = !t.badge;
    $('destaque').hidden = t.id !== 'geral' || !!term || !data.destaque.title;

    var toc = $('toc'), box = $('sections'), shown = 0;
    toc.textContent = ''; box.textContent = '';
    t.sections.forEach(function (s, i) {
      if (term && norm(s.title + '\n' + s.body).indexOf(term) < 0) return;
      shown++;
      var num = pad(i + 1), id = 'secao-' + s.id;
      var link = el('a'); link.href = '#' + id;
      if (t.numbered) link.appendChild(el('span', 'n', num));
      link.appendChild(el('span', '', s.title));
      link.addEventListener('click', function (e) {
        e.preventDefault(); document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      toc.appendChild(link);

      var art = el('article', 'section'); art.id = id;
      var head = el('header');
      if (t.numbered) { head.appendChild(el('span', 'big-n', num)); head.appendChild(el('p', 'kicker', 'SEÇÃO ' + num)); }
      head.appendChild(el('h3', '', s.title));
      art.appendChild(head);
      art.appendChild(FS.renderBody(s.body));
      if (term) highlight(art, term);
      box.appendChild(art);
    });
    $('empty').hidden = shown > 0;
    var total = t.sections.length, word = total === 1 ? ' seção' : ' seções';
    $('meta').textContent = term ? shown + ' de ' + total + word + ' com “' + $('q').value.trim() + '”' : total + word + ' · Busca em todo o regulamento';
  }

  function route() {
    var h = location.hash.slice(1);
    if (data.tabs.some(function (t) { return t.id === h; }) && h !== current) {
      current = h; $('q').value = ''; renderChrome(); renderTab(); window.scrollTo(0, 0);
    }
  }

  fetch('/api/content').then(function (r) { return r.json(); }).then(function (c) {
    data = c;
    var h = location.hash.slice(1);
    if (c.tabs.some(function (t) { return t.id === h; })) current = h;
    renderChrome(); renderTab();
    $('q').addEventListener('input', renderTab);
    window.addEventListener('hashchange', route);
  }).catch(function () {
    $('empty').hidden = false; $('empty').textContent = 'Não foi possível carregar o regulamento. Recarregue a página.';
  });
})();
