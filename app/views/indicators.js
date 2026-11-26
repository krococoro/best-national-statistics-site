// Indicator explorer: every series on the site in one searchable,
// filterable list. Cards show the latest value; opening one routes to a
// detail page with the full chart, the year-by-year table, the source and
// a plain-language note on what the figure means.

import { indicators, indicatorById, domains } from '../data/indicators.js';
import { lineChart, barChart, TEAL, AMBER } from '../charts.js';
import { formatValue } from '../format.js';
import { chartCard, sectionHead, sourceLine } from './common.js';

function latestOf(entry) {
  const i = entry.series.values.length - 1;
  return { year: entry.series.years[i], value: entry.series.values[i] };
}

function cardHtml(entry) {
  const latest = latestOf(entry);
  return `<a class="indicator-card" href="#/indicators/${entry.id}" data-domain="${entry.domain}">
    <p class="indicator-domain">${entry.domain}</p>
    <h3>${entry.series.label}</h3>
    <p class="indicator-latest">${formatValue(latest.value, entry.format)}<span> in ${latest.year}</span></p>
    <p class="indicator-source">${entry.series.source}</p>
  </a>`;
}

export function renderIndicators() {
  const chips = ['All', ...domains]
    .map((d, i) => `<button class="chip${i === 0 ? ' active' : ''}" data-domain="${d}">${d}</button>`)
    .join('');
  return `
  ${sectionHead('Indicator explorer', 'Fifteen headline series, one per card. Search by name, narrow by domain, and open any indicator for its full history - the same figures the section pages are built from.')}
  <div class="explorer-tools">
    <label class="search-box grow">
      <span>Search indicators</span>
      <input id="indicator-search" type="search" placeholder="Try: inflation, poverty, internet..." autocomplete="off">
    </label>
    <div class="chips" id="indicator-chips">${chips}</div>
  </div>
  <div class="indicator-grid" id="indicator-grid">${indicators.map(cardHtml).join('')}</div>
  <p class="empty-note" id="indicator-empty" hidden>No indicator matches. Try a shorter word, or clear the domain filter.</p>`;
}

export function mountIndicators(root) {
  const search = root.querySelector('#indicator-search');
  const grid = root.querySelector('#indicator-grid');
  const empty = root.querySelector('#indicator-empty');
  let domain = 'All';
  let query = '';

  function draw() {
    let shown = 0;
    grid.querySelectorAll('.indicator-card').forEach((card) => {
      const entry = indicators.find((e) => `#/indicators/${e.id}` === card.getAttribute('href'));
      const matchesDomain = domain === 'All' || entry.domain === domain;
      const matchesQuery = entry.series.label.toLowerCase().includes(query) || entry.domain.toLowerCase().includes(query);
      const visible = matchesDomain && matchesQuery;
      card.hidden = !visible;
      if (visible) shown++;
    });
    empty.hidden = shown > 0;
  }

  search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    draw();
  });
  root.querySelectorAll('#indicator-chips .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      root.querySelectorAll('#indicator-chips .chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      domain = chip.dataset.domain;
      draw();
    });
  });
}

export function renderIndicatorDetail(id) {
  const entry = indicatorById(id);
  if (!entry) {
    return `${sectionHead('Indicator not found', 'That indicator is not in the catalogue.')}
    <p><a class="back-link" href="#/indicators">← Back to the indicator explorer</a></p>`;
  }
  const chart = entry.chart === 'bar'
    ? barChart(entry.series, { color: AMBER })
    : lineChart(entry.series, { color: TEAL });
  const rows = entry.series.years.map((y, i) => `<tr>
      <td>${y}</td><td class="num">${formatValue(entry.series.values[i], entry.format)}</td>
    </tr>`).join('');
  const latest = latestOf(entry);
  return `
  <p><a class="back-link" href="#/indicators">← All indicators</a></p>
  ${sectionHead(entry.series.label, entry.note)}
  <section class="grid-2 detail-grid">
    ${chartCard({
      title: `${entry.series.label}, ${entry.series.years[0]}-${latest.year}`,
      subtitle: `Latest: ${formatValue(latest.value, entry.format)} (${latest.year}) · Unit: ${entry.series.unit}`,
      body: chart,
      source: entry.series.source,
    })}
    <section class="card">
      <header><h3>Year by year</h3><p class="card-sub">${entry.series.unit}</p></header>
      <table class="data-table">
        <thead><tr><th>Period</th><th class="num">Value</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${sourceLine(entry.series.source)}
    </section>
  </section>`;
}
