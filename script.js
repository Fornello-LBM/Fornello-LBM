async function loadMenu() {
  const res = await fetch('content/menu.json', { cache: 'no-store' });
  const data = await res.json();

  // Footer / restaurant info
  document.getElementById('footer-address').textContent =
    `${data.restaurant.address} — ${data.restaurant.city}`;
  document.getElementById('footer-phone').textContent = data.restaurant.phone;
  document.getElementById('footer-service').textContent = data.restaurant.service;

  // Hero partner/since line — built from restaurant.partner and restaurant.since.
  // Leave either field blank in the back office to remove that part; leave both blank to hide the whole line.
  const partnerEl = document.getElementById('hero-partner');
  const parts = [data.restaurant.partner, data.restaurant.since].filter(Boolean);
  if (parts.length === 0) {
    partnerEl.style.display = 'none';
  } else {
    partnerEl.innerHTML = parts.join(' <span class="dot">·</span> ');
  }

  const root = document.getElementById('menu-root');
  root.innerHTML = '';

  data.categories.forEach((cat, i) => {
    const band = document.createElement('section');
    band.className = `cat-band ${i % 2 === 0 ? 'on-cream' : 'on-pine'}`;
    band.id = cat.id;

    const inner = document.createElement('div');
    inner.className = 'cat-inner';

    inner.innerHTML = `
      <h2 class="cat-title display">${cat.title}</h2>
      ${cat.subtitle ? `<p class="cat-subtitle">${cat.subtitle}</p>` : ''}
      ${cat.note_image ? `<img class="cat-note-image" src="${cat.note_image}" alt="${cat.note || ''}">` : (cat.note ? `<p class="cat-note">${cat.note}</p>` : '')}
      ${cat.note2 ? `<p class="cat-note">${cat.note2}</p>` : ''}
    `;

    if (cat.composer) {
      inner.appendChild(renderComposer(cat.composer));
    } else if (cat.items && cat.items.length > 0) {
      inner.appendChild(renderItems(cat.items));
      if (cat.extras) {
        inner.appendChild(renderExtras(cat.extras));
      }
    } else {
      inner.appendChild(renderEmptyState());
    }

    band.appendChild(inner);
    root.appendChild(band);
  });
}

function renderItems(items) {
  const list = document.createElement('div');
  list.className = 'item-list';
  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-price">${item.price}</span>
      <span class="item-desc">${item.desc}</span>
      ${item.image ? `<span class="item-photo"><img src="${item.image}" alt="${item.name}" loading="lazy"></span>` : ''}
    `;
    list.appendChild(row);
  });
  return list;
}

function renderComposer(composer) {
  const wrap = document.createElement('div');

  const price = document.createElement('div');
  price.className = 'composer-price display';
  price.textContent = composer.base_price;
  wrap.appendChild(price);

  const groups = document.createElement('div');
  groups.className = 'composer-groups';
  composer.groups.forEach(group => {
    const g = document.createElement('div');
    g.className = 'composer-group';
    g.innerHTML = `<h3>${group.label}</h3><ul>${group.options.map(o => `<li>${o}</li>`).join('')}</ul>`;
    groups.appendChild(g);
  });
  wrap.appendChild(groups);

  const supp = document.createElement('div');
  supp.className = 'composer-supp';
  supp.innerHTML = `<h3>Suppléments</h3>` +
    composer.supplements.map(s => `<div class="supp-row"><span>${s.label}</span><span>${s.price}</span></div>`).join('') +
    (composer.charcuteries_extra ? composer.charcuteries_extra.map(s => `<div class="supp-row"><span>${s.label}</span><span>${s.price}</span></div>`).join('') : '');
  wrap.appendChild(supp);

  return wrap;
}

function renderExtras(groups) {
  const wrap = document.createElement('div');
  wrap.className = 'composer-groups extras-groups';
  groups.forEach(group => {
    const g = document.createElement('div');
    g.className = 'composer-group';
    g.innerHTML = `<h3>${group.label}</h3><ul>${group.options.map(o => `<li>${o}</li>`).join('')}</ul>`;
    wrap.appendChild(g);
  });
  return wrap;
}

function renderEmptyState() {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `<p class="display">Bientôt disponible</p><p>Cette section arrive prochainement — reviens vite !</p>`;
  return div;
}

loadMenu();
