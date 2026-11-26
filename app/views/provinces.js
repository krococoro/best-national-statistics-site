// Provinces section: one table, every control live. The search box filters
// by province name as you type; clicking a column heading sorts by that
// column (click again to reverse). Density is computed from population and
// area. Extremes under the table are computed from the same rows, so they
// can never disagree with it.

import { provinces, provincesNote } from '../data/regions.js';
import { fixed, group } from '../format.js';
import { sectionHead, sourceLine } from './common.js';

const columns = [
  { key: 'name', label: 'Province', numeric: false },
  { key: 'population', label: 'People, m', numeric: true },
  { key: 'density', label: 'Per km²', numeric: true },
  { key: 'gdpPerCapita', label: 'GDP per head, Rp m', numeric: true },
  { key: 'poverty', label: 'Poverty, %', numeric: true },
  { key: 'hdi', label: 'HDI', numeric: true },
];

function withDensity(p) {
  return { ...p, density: Math.round((p.population * 1e6) / p.areaKm2) };
}

function cellValue(p, key) {
  if (key === 'population') return fixed(p.population, 2);
  if (key === 'density') return group(p.density);
  if (key === 'gdpPerCapita') return fixed(p.gdpPerCapita, 1);
  if (key === 'poverty') return fixed(p.poverty, 2);
  if (key === 'hdi') return fixed(p.hdi, 2);
  return p.name;
}

export function renderProvinces() {
  return `
  ${sectionHead('Provinces', 'One country, wide gaps. Jakarta holds 16,133 people per square kilometre and a GDP per head of Rp 322.6 million; East Nusa Tenggara, the poorest province, records Rp 27.6 million and a poverty rate of 19.02%. Search the table, or click any heading to sort by it.')}
  <section class="card">
    <div class="table-tools">
      <label class="search-box">
        <span>Search provinces</span>
        <input id="province-search" type="search" placeholder="Try: Java, Kalimantan, Bali..." autocomplete="off">
      </label>
      <p class="table-count" id="province-count"></p>
    </div>
    <div class="table-scroll">
      <table class="data-table sortable" id="province-table">
        <thead><tr>${columns.map((c) => `<th data-key="${c.key}" class="${c.numeric ? 'num sortable-head' : 'sortable-head'}">${c.label}<span class="sort-mark"></span></th>`).join('')}</tr></thead>
        <tbody id="province-body"></tbody>
      </table>
    </div>
    <p class="empty-note" id="province-empty" hidden>No province matches that search. Clear it to see the whole table.</p>
    ${sourceLine(provincesNote)}
  </section>
  <section class="card prose" id="province-extremes"></section>`;
}

export function mountProvinces(root) {
  const rows = provinces.map(withDensity);
  const body = root.querySelector('#province-body');
  const count = root.querySelector('#province-count');
  const empty = root.querySelector('#province-empty');
  const search = root.querySelector('#province-search');
  const extremes = root.querySelector('#province-extremes');
  let sortKey = 'population';
  let sortDir = -1;
  let query = '';

  function draw() {
    const visible = rows
      .filter((p) => p.name.toLowerCase().includes(query))
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
        return cmp * sortDir;
      });
    body.innerHTML = visible.map((p) => `<tr>
      ${columns.map((c) => `<td class="${c.numeric ? 'num' : 'name'}">${cellValue(p, c.key)}</td>`).join('')}
    </tr>`).join('');
    count.textContent = `Showing ${visible.length} of ${rows.length} provinces`;
    empty.hidden = visible.length > 0;
    root.querySelectorAll('#province-table th').forEach((th) => {
      const active = th.dataset.key === sortKey;
      th.querySelector('.sort-mark').textContent = active ? (sortDir === 1 ? ' ▲' : ' ▼') : '';
      th.classList.toggle('sorted', active);
    });
    const richest = [...rows].sort((a, b) => b.gdpPerCapita - a.gdpPerCapita)[0];
    const poorest = [...rows].sort((a, b) => b.poverty - a.poverty)[0];
    const densest = [...rows].sort((a, b) => b.density - a.density)[0];
    const bestHdi = [...rows].sort((a, b) => b.hdi - a.hdi)[0];
    const bestHdiOutsideCapital = [...rows].filter((p) => p.name !== 'Jakarta').sort((a, b) => b.hdi - a.hdi)[0];
    extremes.innerHTML = `<header><h3>The extremes</h3></header>
      <p><strong>Richest:</strong> ${richest.name}, Rp ${fixed(richest.gdpPerCapita, 1)} million per head - the capital effect: finance, headquarters and services book their output here. East Kalimantan follows at Rp 235.8 million on mining rents.
      <strong>Highest poverty:</strong> ${poorest.name} at ${fixed(poorest.poverty, 2)}%.
      <strong>Densest:</strong> ${densest.name} at ${group(densest.density)} people per km².
      <strong>Highest HDI:</strong> ${bestHdi.name} at ${fixed(bestHdi.hdi, 2)}; outside the capital, ${bestHdiOutsideCapital.name} leads at ${fixed(bestHdiOutsideCapital.hdi, 2)}.</p>`;
  }

  search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    draw();
  });
  root.querySelectorAll('#province-table th').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      if (key === sortKey) sortDir = -sortDir;
      else {
        sortKey = key;
        sortDir = key === 'name' ? 1 : -1;
      }
      draw();
    });
  });
  draw();
}
