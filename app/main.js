// Router and boot: hash routes render one view each into <main>, wire its
// interactive controls, mark the current nav link and reset the scroll.
// Routes: #/ overview, #/population, #/economy, #/society, #/provinces,
// #/indicators and #/indicators/<id> for one indicator's detail page.

import { renderOverview } from './views/overview.js';
import { renderPopulation } from './views/population.js';
import { renderEconomy } from './views/economy.js';
import { renderSociety } from './views/society.js';
import { renderProvinces, mountProvinces } from './views/provinces.js';
import { renderIndicators, mountIndicators, renderIndicatorDetail } from './views/indicators.js';

const view = document.getElementById('view');

const routes = {
  overview: { title: 'Overview', render: renderOverview },
  population: { title: 'Population', render: renderPopulation },
  economy: { title: 'Economy', render: renderEconomy },
  society: { title: 'Society', render: renderSociety },
  provinces: { title: 'Provinces', render: renderProvinces, mount: mountProvinces },
  indicators: { title: 'Indicator explorer', render: renderIndicators, mount: mountIndicators },
};

function parseRoute() {
  const hash = location.hash.replace(/^#/, '');
  const parts = hash.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'overview' };
  if (parts[0] === 'indicators' && parts[1]) return { name: 'indicators', detail: parts[1] };
  if (routes[parts[0]]) return { name: parts[0] };
  return { name: 'overview' };
}

function draw() {
  const route = parseRoute();
  const def = routes[route.name];
  view.innerHTML = route.detail ? renderIndicatorDetail(route.detail) : def.render();
  document.title = route.detail
    ? 'Indicator — Nusantara in Numbers'
    : `${def.title} — Nusantara in Numbers`;
  document.querySelectorAll('.site-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route.name);
  });
  if (!route.detail && def.mount) def.mount(view);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', draw);
draw();
