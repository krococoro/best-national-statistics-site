// Population section: headline demographic facts, the census story since
// 1961, the 2024 age pyramid, recent mid-year estimates, and the eight
// most populous provinces (from the same province table as the Provinces
// page, so the numbers agree).

import { censusSeries, recentEstimates, agePyramid, populationFacts } from '../data/population.js';
import { provinces } from '../data/regions.js';
import { lineChart, pyramidChart, TEAL } from '../charts.js';
import { fixed, group } from '../format.js';
import { chartCard, factTile, sectionHead, sourceLine } from './common.js';

export function renderPopulation() {
  const facts = [
    factTile({ label: 'People per km², 2024', value: group(populationFacts.densityPerKm2), note: `Across ${group(populationFacts.landAreaKm2)} km² of land` }),
    factTile({ label: 'Median age', value: fixed(populationFacts.medianAge, 1), unit: ' years', note: 'Half the population is younger' }),
    factTile({ label: 'Live in urban areas', value: fixed(populationFacts.urbanShare2024, 1), unit: '%', note: 'Up from 49.8% in 2010' }),
    factTile({ label: 'Males per 100 females', value: group(populationFacts.sexRatio), note: 'Sex ratio at the 2020 census' }),
    factTile({ label: 'Aged 15-64', value: fixed(populationFacts.shareWorkingAge, 1), unit: '%', note: `Dependency ratio ${fixed(populationFacts.dependencyRatio, 0)} per 100` }),
    factTile({ label: 'Aged 65 and over', value: fixed(populationFacts.shareOver64, 1), unit: '%', note: 'Up from 5.0% in 2010 - the population is ageing' }),
  ].join('');

  const top = [...provinces].sort((a, b) => b.population - a.population).slice(0, 8);
  const rows = top.map((p, i) => `<tr>
      <td>${i + 1}</td><td class="name">${p.name}</td>
      <td class="num">${fixed(p.population, 2)}</td>
      <td class="num">${group(Math.round((p.population * 1e6) / p.areaKm2))}</td>
      <td class="num">${fixed((p.population / populationFacts.total2024) * 100, 1)}%</td>
    </tr>`).join('');

  const estimates = recentEstimates.years.map((y, i) => `<tr>
      <td>${y}</td><td class="num">${fixed(recentEstimates.values[i], 2)} million</td>
      <td class="num">${i === 0 ? '-' : `+${fixed(recentEstimates.values[i] - recentEstimates.values[i - 1], 2)} million`}</td>
    </tr>`).join('');

  return `
  ${sectionHead('Population', 'Indonesia counted 87.79 million people in 1961 and 270.20 million at the 2020 census. The mid-year estimate for 2024 is 281.61 million, growing at about 1.0% a year - slower at every census since the 1970s, but still adding a city the size of Surabaya each year.')}
  <section class="fact-row">${facts}</section>
  <section class="grid-2">
    ${chartCard({
      title: 'Population by census, 1961-2024',
      subtitle: 'Million people; 2024 is a mid-year estimate',
      body: lineChart(censusSeries, { color: TEAL }),
      source: censusSeries.source,
    })}
    <section class="card chart-card">
      <header><h3>Age pyramid, 2024</h3><p class="card-sub">Share of the population in each five-year group, %</p></header>
      ${pyramidChart(agePyramid)}
      ${sourceLine('BPS, 2024 mid-year estimate by age and sex')}
    </section>
  </section>
  <section class="grid-2">
    <section class="card">
      <header><h3>Mid-year estimates</h3><p class="card-sub">The projection path from the 2020 census</p></header>
      <table class="data-table">
        <thead><tr><th>Year</th><th class="num">Population</th><th class="num">Change</th></tr></thead>
        <tbody>${estimates}</tbody>
      </table>
      ${sourceLine(recentEstimates.source)}
    </section>
    <section class="card">
      <header><h3>Most populous provinces</h3><p class="card-sub">The three Java provinces alone hold half the country</p></header>
      <table class="data-table">
        <thead><tr><th>#</th><th>Province</th><th class="num">People, m</th><th class="num">Per km²</th><th class="num">Share</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${sourceLine('BPS, mid-year estimates 2024; full table on the Provinces page')}
    </section>
  </section>`;
}
