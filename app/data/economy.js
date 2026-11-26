// Economy data for Indonesia: national accounts, growth, prices and trade.
// Figures follow Badan Pusat Statistik (BPS) national accounts and price
// statistics, and BPS foreign-trade releases, rounded for display; totals
// and per-capita values are computed on the same population path.

export const gdpSeries = {
  label: 'Gross domestic product, current prices',
  unit: 'Rp trillion',
  source: 'BPS, National Accounts 2015-2024',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [11526, 12402, 13590, 14838, 15833, 15438, 16977, 19588, 20892, 22139],
};

export const gdpPerCapitaSeries = {
  label: 'GDP per capita, current prices',
  unit: 'Rp million',
  source: 'BPS, National Accounts 2015-2024',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [45.1, 47.9, 52.0, 56.0, 59.1, 57.1, 62.3, 71.0, 75.0, 78.6],
};

export const growthSeries = {
  label: 'Real GDP growth',
  unit: '% year on year',
  source: 'BPS, National Accounts 2015-2024',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03],
};

export const quarterlyGrowth2024 = {
  label: 'Real GDP growth by quarter, 2024',
  unit: '% year on year',
  source: 'BPS, quarterly National Accounts 2024',
  years: ['Q1', 'Q2', 'Q3', 'Q4'],
  values: [5.11, 5.05, 4.95, 5.02],
};

// Share of GDP by industry, current prices, 2024. "Other services" gathers
// the remaining industries so the shares sum to 100.
export const sectorShares2024 = [
  { sector: 'Manufacturing', share: 18.98 },
  { sector: 'Wholesale & retail trade', share: 13.08 },
  { sector: 'Agriculture & fisheries', share: 12.61 },
  { sector: 'Construction', share: 10.09 },
  { sector: 'Mining & quarrying', share: 8.96 },
  { sector: 'Transport & warehousing', share: 5.9 },
  { sector: 'Information & communication', share: 4.3 },
  { sector: 'Financial services', share: 4.2 },
  { sector: 'Accommodation & food', share: 2.4 },
  { sector: 'Other industries', share: 19.48 },
];

export const inflationSeries = {
  label: 'Consumer price inflation, December',
  unit: '% year on year',
  source: 'BPS, Consumer Price Index 2015-2024',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
};

export const inflationMonthly2024 = {
  label: 'Inflation through 2024, by month',
  unit: '% year on year',
  source: 'BPS, Consumer Price Index 2024',
  years: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [2.57, 2.75, 3.05, 3.0, 2.84, 2.51, 2.13, 2.12, 1.84, 1.71, 1.55, 1.57],
};

export const tradeTotals2024 = {
  exportsBn: 264.7, // US$ billion
  importsBn: 233.66,
  balanceBn: 31.04,
  source: 'BPS, Foreign Trade Statistics 2024',
};

export const exportCommodities2024 = [
  { commodity: 'Coal', valueBn: 30.49 },
  { commodity: 'Iron and steel', valueBn: 25.86 },
  { commodity: 'Palm oil', valueBn: 22.98 },
  { commodity: 'Natural gas', valueBn: 12.36 },
  { commodity: 'Footwear & garments', valueBn: 11.84 },
  { commodity: 'Electrical machinery', valueBn: 9.76 },
  { commodity: 'Rubber products', valueBn: 7.42 },
];

export const economyFacts = {
  gdp2024Trillion: 22139,
  gdpPerCapita2024: 78.6, // Rp million
  gdpPerCapitaUsd2024: 4981, // US$
  growth2024: 5.03, // %
  inflationDec2024: 1.57, // %
  source: 'BPS, National Accounts and CPI, 2024',
};
