// Front page: the country at a glance. A dark hero band with the six
// headline indicators, the two signature charts (population since 1961 and
// GDP growth since 2015), a short "reading the numbers" brief, and cards
// leading into each section of the site.

import { censusSeries, populationFacts } from '../data/population.js';
import { growthSeries, economyFacts } from '../data/economy.js';
import { societyFacts } from '../data/social.js';
import { lineChart, barChart, TEAL, AMBER } from '../charts.js';
import { kpiCard, chartCard, sectionHead } from './common.js';

export function renderOverview() {
  const kpis = [
    kpiCard({ label: 'Population, 2024', value: '281.6', unit: ' million', delta: '4th largest country in the world', source: 'BPS estimate' }),
    kpiCard({ label: 'GDP, 2024', value: 'Rp 22,139', unit: ' trillion', delta: 'Rp 78.6 million per person', source: 'BPS National Accounts' }),
    kpiCard({ label: 'Economic growth, 2024', value: '5.03', unit: '%', delta: 'Near 5% every year since 2015, except 2020', source: 'BPS National Accounts' }),
    kpiCard({ label: 'Inflation, Dec 2024', value: '1.57', unit: '% y/y', delta: 'Down from 5.51% in Dec 2022', source: 'BPS Consumer Prices' }),
    kpiCard({ label: 'Poverty, Mar 2024', value: '9.03', unit: '%', delta: '25.22 million people; falling since 2021', source: 'BPS Susenas' }),
    kpiCard({ label: 'Human development, 2024', value: '75.02', unit: ' HDI', delta: 'High human development since 2016', source: 'BPS HDI' }),
  ].join('');

  const domains = [
    { href: '#/population', title: 'Population', text: '281.6 million people, a median age of 30.7, and a census story from 87.8 million in 1961 to today - with the full 2024 age pyramid.', meta: 'Censuses 1961-2020 · BPS' },
    { href: '#/economy', title: 'Economy', text: 'A Rp 22,139 trillion economy growing at 5.03%: what each industry contributes, how prices moved through 2024, and what Indonesia sells to the world.', meta: 'National Accounts 2024 · BPS' },
    { href: '#/society', title: 'Society', text: 'Life expectancy of 74.2 years, literacy at 96.5%, stunting down to 19.8% - the health, schooling and work numbers behind the headlines.', meta: 'Susenas & Sakernas 2024 · BPS' },
    { href: '#/provinces', title: 'Provinces', text: 'Jakarta packs 16,133 people into each square kilometre; East Kalimantan has 31. Compare all the big provinces by people, income, poverty and HDI.', meta: '18 provinces · BPS 2024' },
    { href: '#/indicators', title: 'Indicator explorer', text: 'Every series on the site in one searchable list. Open any indicator for its chart, its year-by-year table, and what the figure means.', meta: '15 indicators · 3 domains' },
  ].map((d) => `<a class="domain-card" href="${d.href}">
      <h3>${d.title}</h3><p>${d.text}</p><p class="domain-meta">${d.meta}</p>
    </a>`).join('');

  return `
  <section class="hero">
    <div class="hero-inner">
      <p class="hero-kicker">Indonesia · National Statistics Portal</p>
      <h1>Nusantara in Numbers</h1>
      <p class="hero-lede">The official-style figures for the world's fourth most populous
      country - its people, its economy and its provinces - each number with its
      source and year, ready to explore.</p>
    </div>
  </section>
  <section class="kpi-row">${kpis}</section>
  <section class="grid-2">
    ${chartCard({
      title: 'Population, 1961-2024',
      subtitle: 'Census counts and the 2024 mid-year estimate, million people',
      body: lineChart(censusSeries, { color: TEAL }),
      source: censusSeries.source,
    })}
    ${chartCard({
      title: 'Real GDP growth, 2015-2024',
      subtitle: 'Percent year on year; 2020 is the pandemic contraction',
      body: barChart(growthSeries, { color: AMBER }),
      source: growthSeries.source,
    })}
  </section>
  <section class="brief card">
    ${sectionHead('Reading the numbers', '')}
    <div class="brief-cols">
      <p><strong>A young, urbanising country.</strong> Half of Indonesia's ${populationFacts.total2024} million
      people are under ${populationFacts.medianAge}; ${populationFacts.urbanShare2024}% live in urban areas, and the
      working-age share is ${populationFacts.shareWorkingAge}% - the demographic window planners call the bonus.</p>
      <p><strong>Steady growth, calm prices.</strong> The economy grew ${economyFacts.growth2024}% in 2024 while
      inflation eased to ${economyFacts.inflationDec2024}% - but GDP per head ranges from Rp 322.6 million in
      Jakarta to Rp 27.6 million in East Nusa Tenggara, the widest gap on the provinces page.</p>
      <p><strong>Progress with homework.</strong> Poverty is at a record low of ${societyFacts.povertyMar2024}% and
      the HDI reached ${societyFacts.hdi2024}, yet one child in five is stunted and senior-secondary
      participation is 73.4%. The society section tracks both sides.</p>
    </div>
  </section>
  <section>
    ${sectionHead('Explore the sections', 'Five ways into the same dataset - every chart and table on this site is drawn from the figures collected here.')}
    <div class="domain-grid">${domains}</div>
  </section>`;
}
