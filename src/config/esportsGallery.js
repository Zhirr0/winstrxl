const excluded = [11, 12, 21, 40];

export const images = Array.from({ length: 40 }, (_, i) => i + 1)
  .filter((num) => !excluded.includes(num))
  .slice(0, 36)
  .map((num) => ({
    id: num,
    src: `/images/img${num}.webp`,
    alt: `Design ${num}`,
  }));

export const COLUMN_CONFIGS = {
  5: { from: [20, 15, 10, 30, 25], to: [-30, -35, -30, -50, -20] },
  4: { from: [15, 20, 5, 10], to: [-65, -70, -60, -55] },
  3: { from: [20, 25, 30], to: [-30, -10, -20] },
  2: { from: [30, 30], to: [-20, -30] },
};

export const getColCount = () => {
  const w = window.innerWidth;
  if (w >= 1024) return 5;
  if (w >= 768) return 4;
  if (w >= 640) return 3;
  return 2;
};