// The indicator catalogue: every headline series on the site, gathered in
// one searchable list. Each entry carries its domain, unit, source line and
// a short note saying what the figure means and why it matters. The series
// themselves live in the domain data modules and are re-exported here so
// the explorer and the domain pages always show the same numbers.

import { censusSeries, intercensalGrowth } from './population.js';
import { gdpSeries, gdpPerCapitaSeries, growthSeries, inflationSeries } from './economy.js';
import {
  hdiSeries,
  lifeExpectancySeries,
  literacySeries,
  povertySeries,
  unemploymentSeries,
  stuntingSeries,
  internetSeries,
} from './social.js';

const tradeSeries = {
  label: 'Exports of goods',
  unit: 'US$ billion',
  source: 'BPS, Foreign Trade Statistics 2015-2024',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [150.4, 145.2, 168.8, 180.0, 167.7, 163.2, 231.5, 291.9, 258.8, 264.7],
};

const urbanSeries = {
  label: 'Population living in urban areas',
  unit: '% of population',
  source: 'BPS, censuses and mid-year estimates 2010-2024',
  years: [2010, 2015, 2020, 2022, 2024],
  values: [49.8, 53.3, 56.6, 57.9, 58.6],
};

export const indicators = [
  {
    id: 'population', domain: 'Population', series: censusSeries, format: 'million', chart: 'line',
    note: 'Indonesia is the world\'s fourth most populous country. The 2024 point is a mid-year estimate on the BPS projection path from the 2020 census count of 270.20 million.',
  },
  {
    id: 'pop-growth', domain: 'Population', series: intercensalGrowth, format: 'percent', chart: 'bar',
    note: 'Growth has slowed at every census since the 1970s as fertility fell; the 2020-24 pace of about 1.0% a year still adds roughly 2.9 million people annually.',
  },
  {
    id: 'urban-share', domain: 'Population', series: urbanSeries, format: 'percent', chart: 'line',
    note: 'A majority of Indonesians have lived in urban areas since about 2010. Java\'s big metros drive the share; it shapes demand for housing, transport and services.',
  },
  {
    id: 'gdp', domain: 'Economy', series: gdpSeries, format: 'trillion', chart: 'bar',
    note: 'Nominal GDP at current prices. The 2020 dip is the pandemic contraction; the series passes Rp 22 quadrillion in 2024, keeping Indonesia the largest economy in Southeast Asia.',
  },
  {
    id: 'gdp-per-capita', domain: 'Economy', series: gdpPerCapitaSeries, format: 'rpMillion', chart: 'line',
    note: 'GDP divided by the mid-year population, on the same population path as the totals. In US dollars the 2024 figure is about $4,981.',
  },
  {
    id: 'gdp-growth', domain: 'Economy', series: growthSeries, format: 'percent', chart: 'bar',
    note: 'Real growth has held near 5% for a decade, interrupted only by the 2020 pandemic contraction of 2.07%. The 2024 rate is 5.03%.',
  },
  {
    id: 'inflation', domain: 'Economy', series: inflationSeries, format: 'percent', chart: 'line',
    note: 'December year-on-year CPI inflation. The 2022 spike to 5.51% followed the subsidised fuel price rise; by December 2024 inflation was back to 1.57%, inside the central bank\'s target band.',
  },
  {
    id: 'exports', domain: 'Economy', series: tradeSeries, format: 'usdBn', chart: 'bar',
    note: 'Goods exports peaked in 2022 on the commodity boom (coal, palm oil, nickel steel) and settled at US$264.7 billion in 2024, still a US$31.0 billion trade surplus.',
  },
  {
    id: 'hdi', domain: 'Society', series: hdiSeries, format: 'index', chart: 'line',
    note: 'The HDI combines life expectancy, schooling and income. Indonesia entered the "high" band (70+) in 2016 and reached 75.02 in 2024; Jakarta (84.15) and East Nusa Tenggara (68.42) mark the provincial range.',
  },
  {
    id: 'life-expectancy', domain: 'Society', series: lifeExpectancySeries, format: 'years', chart: 'line',
    note: 'Life expectancy dipped in 2020 during the pandemic, then rose. The step up in 2023 reflects a revised estimation method in the BPS HDI series, noted on the source line.',
  },
  {
    id: 'literacy', domain: 'Society', series: literacySeries, format: 'percent', chart: 'line',
    note: 'Adult literacy has edged up to 96.53%. The remaining gap is concentrated among older cohorts and remote districts; youth literacy is above 99%.',
  },
  {
    id: 'poverty', domain: 'Society', series: povertySeries, format: 'percent', chart: 'line',
    note: 'The March poverty rate fell below 10% in 2018, rose through the pandemic, and resumed its decline to 9.03% in March 2024 - 25.22 million people below the national poverty line.',
  },
  {
    id: 'unemployment', domain: 'Society', series: unemploymentSeries, format: 'percent', chart: 'line',
    note: 'Open unemployment (February Sakernas) spiked to 6.26% in 2021 and fell to 4.82% by February 2024, below its pre-pandemic level, though informality remains high.',
  },
  {
    id: 'stunting', domain: 'Society', series: stuntingSeries, format: 'percent', chart: 'bar',
    note: 'Stunting - low height for age among under-fives - is the government\'s flagship nutrition target. It fell from 30.8% in 2018 to 19.8% in 2024, still one child in five.',
  },
  {
    id: 'internet', domain: 'Society', series: internetSeries, format: 'percent', chart: 'line',
    note: 'Internet use (Susenas) nearly doubled in six years to 72.8% of the population in 2024, driven by cheap mobile data; fixed broadband remains a minority of households.',
  },
];

export const indicatorById = (id) => indicators.find((entry) => entry.id === id);
export const domains = ['Population', 'Economy', 'Society'];
