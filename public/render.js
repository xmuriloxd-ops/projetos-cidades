// Converte o texto das regras em elementos seguros (nada de innerHTML com texto do usuário).
// Sintaxe:  "## Subtítulo"  |  "- item de lista"  |  "| col | col |" (tabela, 1ª linha = cabeçalho)
//           "![legenda](/uploads/foto.jpg)" (foto)  |  **negrito**  |  linha em branco separa parágrafos
(function () {
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function safeUrl(u) {
    u = String(u || '').trim();
    return /^(https?:\/\/|\/(?!\/))[^\s"'<>]*$/i.test(u) ? u : '';
  }
  function inline(parent, text) {
    text.split(/(\*\*[^*]+\*\*)/).forEach(function (part) {
      if (/^\*\*[^*]+\*\*$/.test(part)) parent.appendChild(el('strong', '', part.slice(2, -2)));
      else if (part) parent.appendChild(document.createTextNode(part));
    });
  }
  function cells(line) {
    return line.trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); });
  }
  function renderBody(text) {
    var root = el('div', 'body');
    var lines = String(text || '').split(/\r?\n/);
    var para = [], list = null, table = null;
    function flush() {
      if (para.length) { var p = el('p'); inline(p, para.join(' ')); root.appendChild(p); para = []; }
      list = null; table = null;
    }
    lines.forEach(function (raw) {
      var line = raw.trim(), m;
      if (!line) return flush();
      if (/^-{3,}$/.test(line.replace(/[|\s:]/g, '')) && table) return; // separador de tabela markdown
      if ((m = /^#{1,4}\s+(.*)$/.exec(line))) { flush(); var h = el('h4'); inline(h, m[1]); root.appendChild(h); return; }
      if ((m = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line))) {
        flush();
        var src = safeUrl(m[2]);
        if (!src) return;
        var fig = el('figure', 'foto'), img = el('img');
        img.src = src; img.alt = m[1]; img.loading = 'lazy';
        fig.appendChild(img);
        if (m[1]) fig.appendChild(el('figcaption', '', m[1]));
        root.appendChild(fig);
        return;
      }
      if ((m = /^[-•]\s+(.*)$/.exec(line))) {
        if (!list) { flush(); list = el('ul'); root.appendChild(list); }
        var li = el('li'); inline(li, m[1]); list.appendChild(li);
        return;
      }
      if (line.charAt(0) === '|') {
        var first = !table;
        if (first) {
          flush();
          var wrap = el('div', 'table-wrap'); table = el('table'); wrap.appendChild(table); root.appendChild(wrap);
          table.appendChild(el('thead')); table.appendChild(el('tbody'));
        }
        var tr = el('tr');
        cells(line).forEach(function (c) { var td = el(first ? 'th' : 'td'); inline(td, c); tr.appendChild(td); });
        table.children[first ? 0 : 1].appendChild(tr);
        return;
      }
      if (list || table) flush();
      para.push(line);
    });
    flush();
    return root;
  }
  window.FS = { el: el, safeUrl: safeUrl, renderBody: renderBody };
})();
