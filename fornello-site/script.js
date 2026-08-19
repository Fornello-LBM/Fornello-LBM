async function loadMenu() {
  const res = await fetch('content/menu.json', { cache: 'no-store' });
  const data = await res.json();

  // Footer / restaurant info
  document.getElementById('footer-address').textContent =
    `${data.restaurant.address} — ${data.restaurant.city}`;
  document.getElementById('footer-phone').textContent = data.restaurant.phone;
  document.getElementById('footer-service').textContent = data.restaurant.service;

  const root = document.getElementById('menu-root');
  root.innerHTML = '';

  data.categories.forEach((cat, i) => {
    const band = document.createElement('section');
    band.className = `cat-band ${i % 2 === 0 ? 'on-cream' : 'on-pine'}`;
    band.id = cat.id;

    const inner = document.createElement('div');
    inner.className = 'cat-inner';

    inner.innerHTML = `
      <p class="cat-eyebrow">Fornello</p>
      <h2 class="cat-title display">${cat.title}</h2>
      ${cat.subtitle ? `<p class="cat-subtitle">${cat.subtitle}</p>` : ''}
    `;

    if (cat.composer) {
      inner.appendChild(renderComposer(cat.composer));
    } else if (cat.items && cat.items.length > 0) {
      inner.appendChild(renderItems(cat.items));
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
    composer.charcuteries_extra.map(s => `<div class="supp-row"><span>${s.label}</span><span>${s.price}</span></div>`).join('');
  wrap.appendChild(supp);

  return wrap;
}

function renderEmptyState() {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `<p class="display">Bientôt disponible</p><p>Cette section arrive prochainement — reviens vite !</p>`;
  return div;
}

loadMenu();
