// src/config/getChartColors.js

export function getChartColors(count = 10) {
  let palette = [];
  if (typeof window !== "undefined" && window.getComputedStyle) {
    const cssPalette = getComputedStyle(document.documentElement)
      .getPropertyValue('--chart-colors')
      // unescaped [ is fine here
      .replace(/[[\]']/g, "")
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);
    palette = cssPalette;
  }
  if (palette.length < count) {
    const extra = Array.from({ length: count - palette.length }, (_, i) =>
      `hsl(${(i * 360) / count}, 70%, 60%)`
    );
    palette = [...palette, ...extra];
  }
  return palette.slice(0, count);
}
