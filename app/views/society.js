// Society section: human development and its components, poverty and
// work, and the two social series that move slowly but matter most -
// stunting among young children and the spread of the internet.

import {
  hdiSeries, povertySeries,
  stuntingSeries, internetSeries, schoolParticipation2024, societyFacts,
} from '../data/social.js';
import { lineChart, barChart, TEAL, AMBER, GREEN } from '../charts.js';
import { fixed } from '../format.js';
import { chartCard, factTile, sectionHead, sourceLine } from './common.js';

export function renderSociety() {
  const facts = [
    factTile({ label: 'Life expectancy, 2024', value: fixed(societyFacts.lifeExpectancy2024, 1), unit: ' years', note: 'Up from 71.7 in 2019' }),
    factTile({ label: 'Adult literacy, 2024', value: fixed(societyFacts.literacy2024, 2), unit: '%', note: 'Youth literacy is above 99%' }),
    factTile({ label: 'Mean years of schooling', value: fixed(societyFacts.meanSchooling2024, 2), note: `Expected years for a child starting now: ${fixed(societyFacts.expectedSchooling2024, 2)}` }),
    factTile({ label: 'Unemployment, Feb 2024', value: fixed(societyFacts.unemploymentFeb2024, 2), unit: '%', note: 'Below the pre-pandemic rate' }),
    factTile({ label: 'Income inequality (Gini)', value: fixed(societyFacts.giniMar2024, 3), note: 'March 2024; 0 is equal, 1 is not' }),
    factTile({ label: 'Households with electricity', value: fixed(societyFacts.electricityAccess2024, 2), unit: '%', note: 'Electrification ratio, 2024' }),
  ].join('');

  const schooling = schoolParticipation2024.map((row) => `<tr>
      <td class="name">${row.ages}</td><td class="num">${fixed(row.rate, 2)}%</td>
      <td><span class="hbar-track slim"><span class="hbar-fill teal" style="width:${row.rate}%"></span></span></td>
    </tr>`).join('');

  return `
  ${sectionHead('Society', 'Development in one line: Indonesians live longer, read more and earn more than a decade ago - the HDI reached 75.02 in 2024 - while poverty fell to a record low of 9.03%. The stubborn figures are in the nursery and the classroom: one child in five is stunted, and a quarter of teenagers are out of senior secondary school.')}
  <section class="fact-row">${facts}</section>
  <section class="grid-2">
    ${chartCard({
      title: 'Human Development Index, 2015-2024',
      subtitle: 'Health, schooling and income combined; 70 marks "high" development',
      body: lineChart(hdiSeries, { color: TEAL }),
      source: hdiSeries.source,
    })}
    ${chartCard({
      title: 'Poverty rate, March 2015-2024',
      subtitle: '% of the population below the national poverty line',
      body: lineChart(povertySeries, { color: AMBER }),
      source: povertySeries.source,
    })}
  </section>
  <section class="grid-2">
    ${chartCard({
      title: 'Stunting among under-fives',
      subtitle: '% of children too short for their age - the flagship nutrition target',
      body: barChart(stuntingSeries, { color: GREEN }),
      source: stuntingSeries.source,
    })}
    ${chartCard({
      title: 'Using the internet, 2018-2024',
      subtitle: '% of the population; cheap mobile data did this',
      body: lineChart(internetSeries, { color: TEAL }),
      source: internetSeries.source,
    })}
  </section>
  <section class="grid-2">
    <section class="card">
      <header><h3>Who is in school, 2024</h3><p class="card-sub">School participation rate by age group</p></header>
      <table class="data-table">
        <thead><tr><th>Age group</th><th class="num">In school</th><th></th></tr></thead>
        <tbody>${schooling}</tbody>
      </table>
      ${sourceLine('BPS, Susenas 2024')}
    </section>
    <section class="card prose">
      <header><h3>Work, in brief</h3></header>
      <p>Open unemployment fell to <strong>${fixed(societyFacts.unemploymentFeb2024, 2)}%</strong> in February 2024,
      below its pre-pandemic level, after the pandemic spike to 6.26% in 2021
      (see the Unemployment series in the indicator explorer). The harder problem is
      job quality: around six in ten workers are informally employed, without a
      contract or social security.</p>
      <p>Life expectancy tells the health story in one number:
      <strong>${fixed(societyFacts.lifeExpectancy2024, 1)} years</strong> in 2024, recovering the ground lost
      in 2020. Its provincial spread mirrors the HDI's - longest in Yogyakarta and
      Bali, shortest in the east.</p>
      ${sourceLine(societyFacts.source)}
    </section>
  </section>`;
}
