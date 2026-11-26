// Population data for Indonesia: census counts, mid-year estimates, age
// structure and headline demographic facts. Figures follow Badan Pusat
// Statistik (BPS) publications; mid-year estimates use the BPS 2020-2050
// projection path so totals, growth and per-capita figures agree.

export const censusSeries = {
  label: 'Population by census year',
  unit: 'million people',
  source: 'BPS, Population Censuses 1961-2020; 2024 mid-year estimate',
  years: [1961, 1971, 1980, 1990, 2000, 2010, 2020, 2024],
  values: [87.79, 119.21, 147.49, 179.38, 206.26, 237.64, 270.2, 281.61],
};

export const recentEstimates = {
  label: 'Mid-year population estimates',
  unit: 'million people',
  source: 'BPS, mid-year estimates 2020-2024',
  years: [2020, 2021, 2022, 2023, 2024],
  values: [270.2, 272.68, 275.77, 278.69, 281.61],
};

export const intercensalGrowth = {
  label: 'Average annual population growth between censuses',
  unit: '% per year',
  source: 'BPS, computed from census counts',
  years: ['1971-80', '1980-90', '1990-2000', '2000-10', '2010-20', '2020-24'],
  values: [2.32, 1.98, 1.4, 1.49, 1.25, 1.04],
};

// Share of the 2024 population in each five-year age group, and the male
// share within the group (higher for the young, lower for the old).
export const agePyramid = [
  { group: '0-4', share: 9.0, maleShare: 0.512 },
  { group: '5-9', share: 8.4, maleShare: 0.512 },
  { group: '10-14', share: 7.9, maleShare: 0.511 },
  { group: '15-19', share: 8.6, maleShare: 0.51 },
  { group: '20-24', share: 8.4, maleShare: 0.508 },
  { group: '25-29', share: 8.6, maleShare: 0.506 },
  { group: '30-34', share: 7.9, maleShare: 0.505 },
  { group: '35-39', share: 7.4, maleShare: 0.504 },
  { group: '40-44', share: 6.8, maleShare: 0.503 },
  { group: '45-49', share: 6.1, maleShare: 0.501 },
  { group: '50-54', share: 5.3, maleShare: 0.498 },
  { group: '55-59', share: 4.5, maleShare: 0.494 },
  { group: '60-64', share: 3.7, maleShare: 0.488 },
  { group: '65-69', share: 2.9, maleShare: 0.478 },
  { group: '70-74', share: 2.1, maleShare: 0.464 },
  { group: '75+', share: 2.4, maleShare: 0.436 },
];

export const populationFacts = {
  total2024: 281.61, // million
  landAreaKm2: 1916907,
  densityPerKm2: 147,
  urbanShare2024: 58.6, // %
  sexRatio: 102, // males per 100 females
  medianAge: 30.7, // years
  shareUnder15: 25.3, // %
  shareWorkingAge: 68.5, // % aged 15-64
  shareOver64: 6.2, // %
  dependencyRatio: 46.0, // dependents per 100 working-age
  source: 'BPS, 2024 mid-year estimate and 2020 Census long form',
};
