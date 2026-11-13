/* Fronteira do Sul RP — renderização do site público */
(function () {
  let content = null;
  let currentTab = 'general';

  const $ = (sel) => document.querySelector(sel);

  const els = {
    heroLabel: $('#hero-label'),
    heroTitle: $('#hero-title'),
    heroSub: $('#hero-sub'),
    heroMeta: $('#hero-meta'),
    docLabel: $('#doc-label'),
    docTitle: $('#doc-title'),
    highlightBadge: $('#highlight-badge'),
    highlightTag: $('#highlight-tag'),
    highlightTitle: $('#highlight-title'),
    highlightText: $('#highlight-text'),
    highlight: $('#highlight'),
    sections: $('#sections'),
    extras: $('#extras'),
    empty: $('#empty-state'),
    index: $('#index'),
    gallerySection: $('#gallery-section'),
    gallery: $('#gallery'),
    footer: $('#footer-text'),
    search: $('#search'),
    searchCount: $('#search-count'),
    brandName: $('#brand-name'),
    brandTag: $('#brand-tag'),
    brandLogo: $('#brand-logo')
  };

  function doc() {
    return currentTab === 'police' ? content.police : content.general;
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function applyStatic() {
    const s = content.site || {};
    if (s.pageTitle) document.title = s.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && s.description) metaDesc.setAttribute('content', s.description);
    if (s.name) {
      els.brandName.textContent = s.name;
      document.querySelectorAll('.brand-mini-name').forEach((el) => (el.textContent = s.name));
    }
    if (s.tagline) els.brandTag.textContent = s.tagline;
    if (s.logo) {
      els.brandLogo.src = s.logo;
      document.querySelectorAll('.brand-mini img').forEach((el) => (el.src = s.logo));
      const fav = document.querySelector('link[rel="icon"]');
      if (fav) fav.href = s.logo;
    }
    if (s.footer) els.footer.textContent = s.footer;
  }

  function renderHero() {
    const d = doc();
    const h = d.hero || {};
    els.heroLabel.textContent = h.label || '';
    els.heroTitle.innerHTML = h.titleHtml || '';
    els.heroSub.textContent = h.subtitle || '';
    const total = (d.sections || []).length;
    els.heroMeta.textContent = h.meta && h.meta.trim()
      ? h.meta
      : `${total} seções · Busca em todo o regulamento`;
    els.docLabel.textContent = d.docLabel || '';
    els.docTitle.textContent = d.docTitle || '';

    const hl = d.highlight || {};
    if (hl.title || hl.text) {
      els.highlight.hidden = false;
      els.highlightBadge.textContent = hl.badge || '';
      els.highlightTag.textContent = hl.tag || '';
      els.highlightTitle.textContent = hl.title || '';
      els.highlightText.textContent = hl.text || '';
      els.highlightBadge.hidden = !hl.badge;
      els.highlightTag.hidden = !hl.tag;
    } else {
      els.highlight.hidden = true;
    }
  }

  function renderSections() {
    const d = doc();
    const sections = d.sections || [];
    els.sections.innerHTML = sections
      .map((sec, i) => {
        const num = pad(i + 1);
        return `
        <article class="section" id="${esc(sec.id || 'sec-' + (i + 1))}">
          <div class="section-num" aria-hidden="true">${num}</div>
          <div class="sec-body">
            <div class="sec-tag">SEÇÃO ${num}</div>
            <h3>${esc(sec.title || '')}</h3>
            <div class="content">${sec.html || ''}</div>
          </div>
        </article>`;
      })
      .join('');

    // Índice lateral
    els.index.innerHTML =
      '<div class="index-title">ÍNDICE</div>' +
      sections
        .map((sec, i) => {
          const num = pad(i + 1);
          return `<a href="#${esc(sec.id || 'sec-' + (i + 1))}"><span class="idx-num">${num}</span><span>${esc(sec.title || '')}</span></a>`;
        })
        .join('');

    // Extras (multas, CNH etc.)
    const extras = d.extrasHtml || '';
    els.extras.innerHTML = extras;
    els.extras.hidden = !extras.trim();

    setupScrollSpy();
  }

  function renderGallery() {
    const items = Array.isArray(content.gallery) ? content.gallery : [];
    if (!items.length) {
      els.gallerySection.hidden = true;
      return;
    }
    els.gallerySection.hidden = false;
    els.gallery.innerHTML = items
      .map(
        (g) => `
      <figure>
        <img src="${esc(g.url || '')}" alt="${esc(g.caption || 'Foto da cidade')}" loading="lazy">
        ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}
      </figure>`
      )
      .join('');
  }

  /* ---------- pesquisa ---------- */
  function applySearch() {
    const q = els.search.value.trim().toLowerCase();
    const sections = Array.from(els.sections.querySelectorAll('.section'));
    let hits = 0;

    sections.forEach((sec) => {
      const hit = !q || sec.textContent.toLowerCase().includes(q);
      sec.hidden = !hit;
      if (hit && q) hits++;
    });

    if (q) {
      const extrasVisible = els.extras.textContent.toLowerCase().includes(q);
      els.extras.hidden = !extrasVisible;
      if (extrasVisible) hits++;
    } else {
      els.extras.hidden = !(els.extras.innerHTML || '').trim();
    }

    const gallerySection = els.gallerySection;
    if (q && !gallerySection.hidden) {
      const galHit = gallerySection.textContent.toLowerCase().includes(q);
      gallerySection.hidden = !galHit;
      if (galHit) hits++;
    }

    const searching = Boolean(q);
    els.searchCount.hidden = !searching;
    if (searching) {
      els.searchCount.textContent = `${hits} resultado${hits === 1 ? '' : 's'}`;
      els.heroMeta.textContent = `${hits} de ${sections.length} seções encontradas`;
    } else {
      const d = doc();
      const h = d.hero || {};
      const total = (d.sections || []).length;
      els.heroMeta.textContent = h.meta && h.meta.trim()
        ? h.meta
        : `${total} seções · Busca em todo o regulamento`;
    }

    // estado vazio
    const anyVisible =
      sections.some((s) => !s.hidden) || !els.extras.hidden || !gallerySection.hidden;
    els.empty.hidden = !(searching && !anyVisible);

    // limpar estado da galeria quando a pesquisa é apagada
    if (!searching) renderGallery();
  }

  /* ---------- índice ativo ---------- */
  let observer = null;
  function setupScrollSpy() {
    if (observer) observer.disconnect();
    const links = Array.from(els.index.querySelectorAll('a'));
    if (!links.length) return;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((a) => a.classList.toggle('current', a.getAttribute('href') === '#' + id));
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    els.sections.querySelectorAll('.section').forEach((s) => observer.observe(s));
  }

  function renderTab() {
    renderHero();
    renderSections();
    renderGallery();
    applySearch();
  }

  /* ---------- eventos ---------- */
  document.querySelectorAll('.tab[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentTab = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab[data-tab]').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      els.search.value = '';
      renderTab();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  els.search.addEventListener('input', applySearch);

  /* ---------- boot ---------- */
  fetch('/api/content', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      content = data;
      applyStatic();
      renderTab();
    })
    .catch(() => {
      els.empty.hidden = false;
      els.empty.textContent = 'Não foi possível carregar o regulamento. Tente novamente.';
    });
})();
