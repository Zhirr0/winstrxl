import { HEIGHT_MIN, HEIGHT_MAX, IMAGE_COUNT, ZOOM_DIST_X, ZOOM_DIST_Y } from "../config/projects.config";
/* Returns a random integer between the given min and max values inclusive */
export function getRandomHeight() {
  return Math.floor(Math.random() * (HEIGHT_MAX - HEIGHT_MIN + 1)) + HEIGHT_MIN;
}

/* Linearly interpolates between start and end by the given factor
   where 0 returns start and 1 returns end */
export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

/* Returns an array of sequential image indices from 1 to IMAGE_COUNT */
export function createImagePool() {
  return Array.from({ length: IMAGE_COUNT }, (_, i) => i + 1);
}

/* Shuffles an array in place using the Fisher Yates algorithm
   and returns the same array */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* Calculates the x and y offsets needed to zoom a given image element
   outward from the center of the viewport, rounding values on touch devices */
export function getZoomOffsets(img, isTouchDevice) {
  const rect = img.getBoundingClientRect();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const distX = (rect.left + rect.width / 2 - centerX) / 100;
  const distY = (rect.top + rect.height / 2 - centerY) / 100;
  const x = distX * ZOOM_DIST_X;
  const y = distY * ZOOM_DIST_Y;

  return {
    x: isTouchDevice ? Math.round(x) : x,
    y: isTouchDevice ? Math.round(y) : y,
  };
}
