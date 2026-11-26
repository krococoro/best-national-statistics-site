// Number formatting helpers: English-style grouping (commas for thousands,
// a point for decimals) to match the site's English text, with compact
// forms for chart axes. fixed() always shows exactly the decimals asked
// for, so a column of figures lines up.

const enGrouping = new Intl.NumberFormat('en-US');

export function group(value) {
  return enGrouping.format(value);
}

export function fixed(value, decimals = 2) {
  const text = value.toFixed(decimals);
  const [int, frac] = text.split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return frac ? `${grouped}.${frac}` : grouped;
}

export function formatValue(value, format) {
  switch (format) {
    case 'million':
      return `${fixed(value, 2)} million`;
    case 'trillion':
      return `Rp ${group(Math.round(value))} trillion`;
    case 'rpMillion':
      return `Rp ${fixed(value, 1)} million`;
    case 'usdBn':
      return `US$ ${fixed(value, 1)} billion`;
    case 'percent':
      return `${fixed(value, 2)}%`;
    case 'index':
      return fixed(value, 2);
    case 'years':
      return `${fixed(value, 1)} years`;
    default:
      return fixed(value, 2);
  }
}

// Short axis tick: keep the number, drop trailing zeros.
export function tick(value) {
  if (Math.abs(value) >= 1000) return group(Math.round(value));
  const text = fixed(value, 2);
  return text.includes('.') ? text.replace(/\.?0+$/, '') : text;
}
