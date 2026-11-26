// Economy section: headline facts, real growth (annual and by quarter),
// what each industry contributes to GDP, how inflation behaved through
// 2024, and the trade account with its biggest export earners.

import {
  growthSeries, quarterlyGrowth2024, sectorShares2024,
  inflationMonthly2024, tradeTotals2024, exportCommodities2024, economyFacts,
} from '../data/economy.js';
import { barChart, donutChart, lineChart, donutPalette, AMBER, TEAL } from '../charts.js';
import { fixed } from '../format.js';
import { chartCard, factTile, sectionHead, sourceLine } from './common.js';

export function renderEconomy() {
  const facts = [
    factTile({ label: 'GDP per capita, 2024', value: `Rp ${fixed(economyFacts.gdpPerCapita2024, 1)}`, unit: ' m', note: `About US$ ${economyFacts.gdpPerCapitaUsd2024.toLocaleString('en-US')}` }),
    factTile({ label: 'Growth, Q4 2024', value: fixed(quarterlyGrowth2024.values[3], 2), unit: '% y/y', note: 'Full-year growth 5.03%' }),
    factTile({ label: 'Trade surplus, 2024', value: `US$ ${fixed(tradeTotals2024.balanceBn, 1)}`, unit: ' bn', note: 'Fifth straight annual surplus' }),
    factTile({ label: 'Largest industry', value: '18.98', unit: '%', note: 'Manufacturing share of GDP, 2024' }),
  ].join('');

  const legend = sectorShares2024.map((s, i) => `<li>
      <span class="dot" style="background:${donutPalette[i % donutPalette.length]}"></span>
      <span class="legend-name">${s.sector}</span>
      <span class="legend-value">${fixed(s.share, 2)}%</span>
    </li>`).join('');

  const maxCommodity = Math.max(...exportCommodities2024.map((c) => c.valueBn));
  const commodities = exportCommodities2024.map((c) => `<div class="hbar-row">
      <span class="hbar-name">${c.commodity}</span>
      <span class="hbar-track"><span class="hbar-fill" style="width:${(c.valueBn / maxCommodity) * 100}%"></span></span>
      <span class="hbar-value">US$ ${fixed(c.valueBn, 2)} bn</span>
    </div>`).join('');

  return `
  ${sectionHead('Economy', 'Indonesia\'s economy produced Rp 22,139 trillion of output in 2024 and grew 5.03% in real terms, extending a decade of growth near 5% that only the pandemic interrupted. Inflation, the quiet story of 2024, ended the year at 1.57%.')}
  <section class="fact-row four">${facts}</section>
  <section class="grid-2">
    ${chartCard({
      title: 'Real GDP growth, 2015-2024',
      subtitle: 'Percent year on year',
      body: barChart(growthSeries, { color: AMBER }),
      source: growthSeries.source,
    })}
    ${chartCard({
      title: 'Growth by quarter, 2024',
      subtitle: 'Percent year on year; a steady year between 4.95% and 5.11%',
      body: barChart(quarterlyGrowth2024, { color: TEAL }),
      source: quarterlyGrowth2024.source,
    })}
  </section>
  <section class="grid-2">
    <section class="card chart-card">
      <header><h3>What the economy is made of</h3><p class="card-sub">Share of GDP by industry, current prices, 2024</p></header>
      <div class="donut-wrap">
        ${donutChart(sectorShares2024)}
        <ul class="legend">${legend}</ul>
      </div>
      ${sourceLine('BPS, National Accounts 2024; "Other industries" gathers the remaining sectors')}
    </section>
    ${chartCard({
      title: 'Inflation through 2024',
      subtitle: 'Consumer prices, % year on year, by month',
      body: lineChart(inflationMonthly2024, { color: '#c0392b' }),
      source: inflationMonthly2024.source,
    })}
  </section>
  <section class="card">
    <header><h3>Trade, 2024</h3>
    <p class="card-sub">Exports of US$ ${fixed(tradeTotals2024.exportsBn, 1)} billion against imports of
    US$ ${fixed(tradeTotals2024.importsBn, 2)} billion left a surplus of US$ ${fixed(tradeTotals2024.balanceBn, 2)} billion.
    Resource exports still pay the bills: the top earners are coal, the iron and steel of the nickel
    smelters, and palm oil.</p></header>
    <div class="hbar-list">${commodities}</div>
    ${sourceLine(tradeTotals2024.source)}
  </section>`;
}
