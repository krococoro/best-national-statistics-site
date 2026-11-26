// Shared building blocks for the views: KPI tiles, chart cards, section
// headings and source lines, so every page carries the same furniture and
// every figure is credited where it appears.

export function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

export function kpiCard({ label, value, unit, delta, source }) {
  return `<article class="kpi">
    <p class="kpi-label">${label}</p>
    <p class="kpi-value">${value}<span class="kpi-unit">${unit ?? ''}</span></p>
    ${delta ? `<p class="kpi-delta">${delta}</p>` : ''}
    ${source ? `<p class="kpi-source">${source}</p>` : ''}
  </article>`;
}

export function chartCard({ title, subtitle, body, source }) {
  return `<section class="card chart-card">
    <header>
      <h3>${title}</h3>
      ${subtitle ? `<p class="card-sub">${subtitle}</p>` : ''}
    </header>
    ${body}
    ${source ? sourceLine(source) : ''}
  </section>`;
}

export function sectionHead(title, intro) {
  return `<div class="section-head">
    <h2>${title}</h2>
    ${intro ? `<p>${intro}</p>` : ''}
  </div>`;
}

export function factTile({ label, value, unit, note }) {
  return `<article class="fact">
    <p class="fact-value">${value}<span class="fact-unit">${unit ?? ''}</span></p>
    <p class="fact-label">${label}</p>
    ${note ? `<p class="fact-note">${note}</p>` : ''}
  </article>`;
}
