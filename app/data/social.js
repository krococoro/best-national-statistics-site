// Society data for Indonesia: human development, health, education, poverty
// and work. Figures follow Badan Pusat Statistik (BPS) social statistics,
// the National Socioeconomic Survey (Susenas) and the Indonesian
// Demographic and Health Survey programme.

export const hdiSeries = {
  label: 'Human Development Index',
  unit: 'index, 0-100',
  source: 'BPS, Human Development Index 2015-2024',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [69.55, 70.18, 70.81, 71.39, 71.92, 71.94, 72.29, 72.91, 74.39, 75.02],
};

export const lifeExpectancySeries = {
  label: 'Life expectancy at birth',
  unit: 'years',
  source: 'BPS, from the HDI series 2015-2024 (method revised 2023)',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [71.1, 71.2, 71.3, 71.5, 71.7, 71.5, 71.6, 71.9, 73.9, 74.2],
};

export const literacySeries = {
  label: 'Adult literacy rate, age 15 and over',
  unit: '% of population 15+',
  source: 'BPS, Susenas 2015-2024',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [95.22, 95.38, 95.5, 95.66, 96.04, 96.04, 96.1, 96.25, 96.34, 96.53],
};

export const povertySeries = {
  label: 'Poverty rate, March',
  unit: '% of population',
  source: 'BPS, Susenas March rounds 2015-2024',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [11.22, 10.86, 10.64, 9.82, 9.41, 9.78, 10.14, 9.54, 9.36, 9.03],
};

export const unemploymentSeries = {
  label: 'Open unemployment rate, February',
  unit: '% of labour force',
  source: 'BPS, National Labour Force Survey (Sakernas), February 2015-2024',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [5.81, 5.5, 5.33, 5.13, 5.01, 4.94, 6.26, 5.83, 5.45, 4.82],
};

export const stuntingSeries = {
  label: 'Stunting among children under five',
  unit: '% of children under 5',
  source: 'Ministry of Health, SSGI nutrition surveys 2018-2024',
  years: [2018, 2019, 2021, 2022, 2023, 2024],
  values: [30.8, 27.7, 24.4, 21.6, 21.5, 19.8],
};

export const internetSeries = {
  label: 'Population using the internet',
  unit: '% of population',
  source: 'BPS, Susenas 2018-2024',
  years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [39.9, 47.7, 53.7, 62.1, 66.5, 69.2, 72.8],
};

export const schoolParticipation2024 = [
  { ages: '7-12 years (primary)', rate: 99.19 },
  { ages: '13-15 years (junior secondary)', rate: 96.17 },
  { ages: '16-18 years (senior secondary)', rate: 73.42 },
  { ages: '19-24 years (tertiary)', rate: 29.16 },
];

export const societyFacts = {
  hdi2024: 75.02,
  lifeExpectancy2024: 74.2, // years
  literacy2024: 96.53, // %
  meanSchooling2024: 9.22, // years
  expectedSchooling2024: 13.21, // years
  povertyMar2024: 9.03, // %
  poorPeopleMar2024: 25.22, // million
  unemploymentFeb2024: 4.82, // %
  giniMar2024: 0.379,
  stunting2024: 19.8, // %
  electricityAccess2024: 99.83, // % of households
  source: 'BPS, Susenas and Sakernas 2024; Ministry of Health SSGI 2024',
};
