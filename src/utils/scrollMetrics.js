function getScrollMetrics(progressPercent, vhMultiplier) {
  const t = progressPercent / 100;
  const totalPx = window.innerHeight * vhMultiplier;
  const scrolledPx = t * totalPx;
  const scrollesvh = scrolledPx / window.innerHeight;
  const remainingPercent = 100 - progressPercent;
  const fixedProgress = progressPercent.toFixed(4);
  return { scrolledPx, scrollesvh, fixedProgress, remainingPercent };
}

export default getScrollMetrics;
