// Hand-rolled SVG charts: line, bar, donut and population pyramid. No
// library, no animation, deterministic output sized for a 720-unit
// viewBox so labels stay readable when a card is screenshotted small.

import { tick } from './format.js';

export const TEAL = '#0a5c5e';
export const TEAL_LIGHT = '#12808a';
export const AMBER = '#e39a2d';
export const RED = '#c0392b';
export const GREEN = '#5b8c5a';
const GRID = '#e0dacb';
const INK = '#42565e';

export const donutPalette = [
  '#0a5c5e', '#12808a', '#e39a2d', '#c4452b', '#5b8c5a',
  '#7a6fa0', '#3e7cb1', '#b5651d', '#87986a', '#546e7a',
];

function scale(domainMin, domainMax, rangeMin, rangeMax) {
  const span = domainMax - domainMin || 1;
  return (value) => rangeMin + ((value - domainMin) / span) * (rangeMax - rangeMin);
}

function yDomain(values, padRatio = 0.12) {
  let min = Math.min(...values, 0);
  let max = Math.max(...values);
  if (min === max) max = min + 1;
  const pad = (max - min) * padRatio;
  if (min > 0) min = Math.max(0, min - pad * 2);
  return [min, max + pad];
}

function frame(width, height, inner) {
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${inner}</svg>`;
}

function axes(width, height, margin, yTicks, y) {
  let out = '';
  for (const t of yTicks) {
    const yy = y(t);
    out += `<line x1="${margin.left}" y1="${yy}" x2="${width - margin.right}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${margin.left - 10}" y="${yy + 5}" text-anchor="end" class="tick">${tick(t)}</text>`;
  }
  out += `<line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="#b9b09a" stroke-width="1.5"/>`;
  return out;
}

function tickValues(min, max, count = 4) {
  // Round the step to a nice 1 / 2 / 2.5 / 5 so axis labels read cleanly.
  const rawStep = (max - min) / count || 1;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  const nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 2.5 ? 2.5 : normalized <= 5 ? 5 : 10;
  const step = nice * magnitude;
  const out = [];
  for (let t = Math.ceil(min / step) * step; t <= max + step * 0.001; t += step) out.push(Number(t.toFixed(6)));
  return out;
}

export function lineChart(series, { color = TEAL, width = 720, height = 400 } = {}) {
  const margin = { left: 64, right: 24, top: 22, bottom: 44 };
  const [min, max] = yDomain(series.values);
  const x = scale(0, series.values.length - 1, margin.left, width - margin.right);
  const y = scale(min, max, height - margin.bottom, margin.top);
  let inner = axes(width, height, margin, tickValues(min, max), y);
  const points = series.values.map((v, i) => [x(i), y(v)]);
  const area = `M ${points.map((p) => p.join(' ')).join(' L ')} L ${x(series.values.length - 1)} ${height - margin.bottom} L ${margin.left} ${height - margin.bottom} Z`;
  inner += `<path d="${area}" fill="${color}" opacity="0.10"/>`;
  inner += `<path d="M ${points.map((p) => p.join(' ')).join(' L ')}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round"/>`;
  points.forEach(([px, py], i) => {
    inner += `<circle cx="${px}" cy="${py}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`;
    const every = series.values.length > 8 ? 2 : 1;
    if (i % every === 0 || i === series.values.length - 1) {
      inner += `<text x="${px}" y="${height - margin.bottom + 28}" text-anchor="middle" class="tick">${series.years[i]}</text>`;
    }
  });
  const [lx, ly] = points[points.length - 1];
  inner += `<text x="${lx}" y="${ly - 14}" text-anchor="end" class="value-label">${tick(series.values[series.values.length - 1])}</text>`;
  return frame(width, height, inner);
}

export function barChart(series, { color = TEAL, width = 720, height = 400 } = {}) {
  const margin = { left: 64, right: 24, top: 30, bottom: 44 };
  const [min, max] = yDomain(series.values);
  const y = scale(min, max, height - margin.bottom, margin.top);
  const band = (width - margin.left - margin.right) / series.values.length;
  const barWidth = Math.min(64, band * 0.62);
  let inner = axes(width, height, margin, tickValues(min, max), y);
  if (min < 0) {
    inner += `<line x1="${margin.left}" y1="${y(0)}" x2="${width - margin.right}" y2="${y(0)}" stroke="#8a7f63" stroke-width="1.5"/>`;
  }
  series.values.forEach((v, i) => {
    const cx = margin.left + band * i + band / 2;
    const top = y(Math.max(v, 0));
    const bottom = y(Math.min(v, 0));
    const fill = v < 0 ? RED : color;
    inner += `<rect x="${cx - barWidth / 2}" y="${top}" width="${barWidth}" height="${Math.max(2, bottom - top)}" rx="3" fill="${fill}"/>`;
    inner += `<text x="${cx}" y="${v < 0 ? top - 8 : top - 8}" text-anchor="middle" class="value-label">${tick(v)}</text>`;
    inner += `<text x="${cx}" y="${height - margin.bottom + 28}" text-anchor="middle" class="tick">${series.years[i]}</text>`;
  });
  return frame(width, height, inner);
}

export function donutChart(parts, { size = 380 } = {}) {
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 8;
  const rInner = rOuter * 0.62;
  let angle = -Math.PI / 2;
  let inner = '';
  parts.forEach((part, i) => {
    const sweep = (part.share / 100) * Math.PI * 2;
    const a0 = angle;
    const a1 = angle + sweep;
    angle = a1;
    const large = sweep > Math.PI ? 1 : 0;
    const p = (r, a) => `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
    inner += `<path d="M ${p(rOuter, a0)} A ${rOuter} ${rOuter} 0 ${large} 1 ${p(rOuter, a1)} L ${p(rInner, a1)} A ${rInner} ${rInner} 0 ${large} 0 ${p(rInner, a0)} Z" fill="${donutPalette[i % donutPalette.length]}" stroke="#fff" stroke-width="2"/>`;
  });
  inner += `<text x="${cx}" y="${cy - 6}" text-anchor="middle" class="donut-center">GDP 2024</text>`;
  inner += `<text x="${cx}" y="${cy + 22}" text-anchor="middle" class="donut-sub">by industry, %</text>`;
  return `<svg viewBox="0 0 ${size} ${size}" role="img" class="chart donut">${inner}</svg>`;
}

// Paired horizontal bars: men to the left (teal), women to the right
// (amber), age group in the middle, share of population at each end.
export function pyramidChart(groups, { width = 720 } = {}) {
  const rowH = 30;
  const height = groups.length * rowH + 34;
  const mid = width / 2;
  const channel = 30; // half-width of the centre gap holding the age labels
  const maxBar = width / 2 - channel - 62;
  const maxShare = Math.max(...groups.map((g) => g.share)) / 2;
  let inner = `<text x="${mid - channel - 6}" y="18" text-anchor="end" class="pyr-head">Men, % of population</text>`;
  inner += `<text x="${mid + channel + 6}" y="18" class="pyr-head">Women, % of population</text>`;
  groups.forEach((g, i) => {
    const yTop = 26 + i * rowH;
    const male = (g.share * g.maleShare) / maxShare * maxBar;
    const female = (g.share * (1 - g.maleShare)) / maxShare * maxBar;
    inner += `<rect x="${mid - channel - male}" y="${yTop}" width="${male}" height="${rowH - 7}" rx="3" fill="${TEAL}"/>`;
    inner += `<rect x="${mid + channel}" y="${yTop}" width="${female}" height="${rowH - 7}" rx="3" fill="${AMBER}"/>`;
    inner += `<text x="${mid - channel - male - 7}" y="${yTop + 17}" text-anchor="end" class="tick">${tick(g.share * g.maleShare)}</text>`;
    inner += `<text x="${mid + channel + female + 7}" y="${yTop + 17}" class="tick">${tick(g.share * (1 - g.maleShare))}</text>`;
    inner += `<text x="${mid}" y="${yTop + 17}" text-anchor="middle" class="pyr-group">${g.group}</text>`;
  });
  return frame(width, height, inner);
}
