(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const LS_KEY = 'hp_pelis_api_base_url';
  const apiUrlInput = $('#apiBaseUrl');
  const apiStatus = $('#apiStatus');
  const saveApiUrlBtn = $('#saveApiUrl');
  const listContainer = $('#listContainer');
  const refreshBtn = $('#refreshBtn');
  const searchInput = $('#searchInput');

  const form = $('#pelisForm');
  const nameInput = $('#name');
  const infoInput = $('#info');
  const urlInput = $('#url');
  const imageInput = $('#image');
  const resetBtn = $('#resetBtn');

  // Paneles para alternar entre listado y detalle
  const listPanel = listContainer.closest('.panel');
  const listTitle = listPanel.querySelector('h2');
  const controlsEl = listPanel.querySelector('.controls');
  const formPanel = form.closest('.panel');

  let API_BASE = localStorage.getItem(LS_KEY) || '';
  let currentItems = [];

  function setApiBase(url) {
    API_BASE = url?.trim().replace(/\/$/, '') || '';
    localStorage.setItem(LS_KEY, API_BASE);
    apiUrlInput.value = API_BASE || '';
  }

  function status(msg, ok = true) {
    apiStatus.textContent = msg || '';
    apiStatus.style.color = ok ? '#8bd17c' : '#ff6b6b';
  }

  async function request(path = '', opts = {}) {
    if (!API_BASE) throw new Error('Configura la URL base de la API');
    const url = `${API_BASE}${path}`;
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    const res = await fetch(url, { ...opts, headers });
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      const detail = typeof data === 'string' ? data : JSON.stringify(data);
      throw new Error(`${res.status} ${res.statusText} - ${detail}`);
    }
    return data;
  }

  function cardFromData(p) {
    const tmpl = $('#pelisCardTmpl');
    const node = tmpl.content.firstElementChild.cloneNode(true);
    if (p.image) {
      const img = $('.card-img', node);
      img.src = p.image;
      img.alt = p.name || '';
      img.style.display = '';
    }
    $('.card-title', node).textContent = p.name || '(Sin nombre)';
    const subparts = [];
    if (p.url) subparts.push('Ver más');
    $('.card-subtitle', node).textContent = subparts.join(' · ');
    $('.card-text', node).textContent = p.info || '';

    // Navegar al detalle al hacer clic en la tarjeta
    node.style.cursor = 'pointer';
    node.addEventListener('click', () => {
      const id = p._id || p.id;
      if (id != null) location.hash = `#/pelis/${encodeURIComponent(id)}`;
    });

    // Si existe link externo, que no intercepte la navegación a detalle
    if (p.url) {
      const link = document.createElement('a');
      link.href = p.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Abrir enlace';
      link.style.display = 'inline-block';
      link.style.marginTop = '6px';
      link.addEventListener('click', (e) => e.stopPropagation());
      $('.card-body', node).appendChild(link);
    }

    return node;
  }

  function render(items) {
    listContainer.innerHTML = '';
    const term = searchInput.value.trim().toLowerCase();
    items
      .filter(p => !term || (p.name || '').toLowerCase().includes(term))
      .forEach(p => listContainer.appendChild(cardFromData(p)));
  }

  function renderDetail(p) {
    setView('detail');
    const wrapper = document.createElement('div');
    wrapper.className = 'detail';

    const back = document.createElement('button');
    back.textContent = '← Volver';
    back.className = 'secondary';
    back.style.marginBottom = '10px';
    back.addEventListener('click', () => { location.hash = '#/'; });

    const card = document.createElement('div');
    card.className = 'card';

    if (p.image) {
      const img = document.createElement('img');
      img.src = p.image;
      img.alt = p.name || '';
      img.style.width = '100%';
      img.style.height = '260px';
      img.style.objectFit = 'cover';
      img.style.borderBottom = '1px solid var(--border)';
      card.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.style.fontSize = '18px';
    title.textContent = p.name || '(Sin nombre)';

    const subtitle = document.createElement('div');
    subtitle.className = 'card-subtitle';
    subtitle.textContent = p.url ? 'Tiene enlace externo' : '';

    const text = document.createElement('p');
    text.className = 'card-text';
    text.textContent = p.info || '';

    body.appendChild(title);
    body.appendChild(subtitle);
    body.appendChild(text);

    if (p.url) {
      const link = document.createElement('a');
      link.href = p.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Abrir enlace externo';
      link.style.display = 'inline-block';
      link.style.marginTop = '8px';
      body.appendChild(link);
    }

    card.appendChild(body);

    wrapper.appendChild(back);
    wrapper.appendChild(card);

    listContainer.innerHTML = '';
    listContainer.appendChild(wrapper);
  }

  async function load() {
    try {
      status('Cargando...');
      const data = await request('', { method: 'GET' }); // GET /pelis
      currentItems = Array.isArray(data) ? data : data?.data || [];
      setView('list');
      render(currentItems);
      status('OK');
    } catch (e) {
      status(e.message, false);
    }
  }

  async function loadDetailById(id) {
    try {
      status('Cargando detalle...');
      const data = await request(`/${encodeURIComponent(id)}`, { method: 'GET' }); // GET /pelis/:id
      renderDetail(data);
      status('OK');
    } catch (e) {
      status(e.message, false);
    }
  }

  function setView(view) {
    if (!listTitle || !controlsEl || !formPanel) return;
    if (view === 'detail') {
      listTitle.textContent = 'Detalle';
      controlsEl.style.display = 'none';
      formPanel.style.display = 'none';
    } else {
      listTitle.textContent = 'Listado';
      controlsEl.style.display = 'flex';
      formPanel.style.display = '';
    }
  }

  function parseHash() {
    const h = window.location.hash || '';
    // Formatos admitidos: '#/pelis/:id' o '#pelis/:id'
    const m = h.match(/^#\/?pelis\/([^/?#]+)$/i);
    if (m) return { route: 'detail', id: decodeURIComponent(m[1]) };
    return { route: 'list' };
  }

  async function router() {
    const r = parseHash();
    if (r.route === 'detail') {
      await loadDetailById(r.id);
    } else {
      await load();
    }
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const body = {
      name: nameInput.value.trim(),
      info: infoInput.value.trim() || undefined,
      url: urlInput.value.trim() || undefined,
      image: imageInput.value.trim() || undefined,
    };
    try {
      await request('', { method: 'POST', body: JSON.stringify(body) });
      form.reset();
      nameInput.focus();
      // Tras crear, si estamos en detalle, volvemos a listado
      if (parseHash().route === 'detail') location.hash = '#/';
      else await load();
    } catch (e) { alert(e.message); }
  });

  resetBtn.addEventListener('click', () => { form.reset(); nameInput.focus(); });
  refreshBtn.addEventListener('click', () => {
    const r = parseHash();
    if (r.route === 'detail') loadDetailById(r.id);
    else load();
  });
  searchInput.addEventListener('input', () => {
    // Filtrar en memoria solo en modo listado
    const r = parseHash();
    if (r.route === 'list') render(currentItems);
  });

  saveApiUrlBtn.addEventListener('click', () => {
    setApiBase(apiUrlInput.value);
    router();
  });

  window.addEventListener('hashchange', router);

  // Boot
  setApiBase(API_BASE || inferDefaultApi());
  router();

  function inferDefaultApi() {
    const loc = window.location;
    // Backend monta rutas en '/', y pelis.routes define '/pelis'
    return `${loc.protocol}//${loc.hostname}:3000/pelis`;
  }
})();
