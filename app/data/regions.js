// Province data for Indonesia, 2024: population, area, GDP per capita,
// poverty and human development for 18 of the 38 provinces. Density is
// computed from population and area so the table always agrees with itself.
// The 20 provinces not listed hold the remaining 43.9 million people.
// Figures follow BPS provincial publications, 2024.

export const provinces = [
  { name: 'West Java', population: 50.34, areaKm2: 35378, gdpPerCapita: 57.4, poverty: 7.15, hdi: 74.48 },
  { name: 'East Java', population: 41.81, areaKm2: 47760, gdpPerCapita: 68.3, poverty: 9.79, hdi: 74.12 },
  { name: 'Central Java', population: 38.13, areaKm2: 32801, gdpPerCapita: 46.2, poverty: 10.47, hdi: 73.87 },
  { name: 'North Sumatra', population: 15.59, areaKm2: 72981, gdpPerCapita: 62.8, poverty: 7.99, hdi: 73.68 },
  { name: 'Banten', population: 12.43, areaKm2: 9663, gdpPerCapita: 66.9, poverty: 5.84, hdi: 74.47 },
  { name: 'Jakarta', population: 10.68, areaKm2: 662, gdpPerCapita: 322.6, poverty: 4.3, hdi: 84.15 },
  { name: 'South Sulawesi', population: 9.46, areaKm2: 46717, gdpPerCapita: 68.7, poverty: 8.06, hdi: 73.96 },
  { name: 'Lampung', population: 9.42, areaKm2: 35376, gdpPerCapita: 49.8, poverty: 9.66, hdi: 72.48 },
  { name: 'South Sumatra', population: 8.84, areaKm2: 91592, gdpPerCapita: 67.5, poverty: 10.51, hdi: 72.96 },
  { name: 'Riau', population: 6.73, areaKm2: 87024, gdpPerCapita: 131.4, poverty: 6.67, hdi: 74.04 },
  { name: 'West Sumatra', population: 5.84, areaKm2: 42119, gdpPerCapita: 54.6, poverty: 5.97, hdi: 74.26 },
  { name: 'East Nusa Tenggara', population: 5.66, areaKm2: 48718, gdpPerCapita: 27.6, poverty: 19.02, hdi: 68.42 },
  { name: 'Aceh', population: 5.55, areaKm2: 57956, gdpPerCapita: 46.9, poverty: 14.45, hdi: 73.9 },
  { name: 'Bali', population: 4.36, areaKm2: 5780, gdpPerCapita: 61.9, poverty: 3.8, hdi: 79.24 },
  { name: 'South Kalimantan', population: 4.27, areaKm2: 38744, gdpPerCapita: 65.7, poverty: 4.02, hdi: 74.18 },
  { name: 'East Kalimantan', population: 3.99, areaKm2: 127347, gdpPerCapita: 235.8, poverty: 5.51, hdi: 78.79 },
  { name: 'Yogyakarta', population: 3.76, areaKm2: 3133, gdpPerCapita: 50.8, poverty: 10.83, hdi: 80.99 },
  { name: 'North Sulawesi', population: 2.7, areaKm2: 13892, gdpPerCapita: 67.9, poverty: 7.25, hdi: 74.92 },
];

export const provincesNote =
  '18 of 38 provinces listed; the other 20 provinces hold 43.9 million people. ' +
  'Population is the BPS mid-year estimate for 2024 (millions); GDP per capita is at current prices, ' +
  'Rp million, 2024; poverty is the March 2024 rate; HDI is the 2024 index.';
