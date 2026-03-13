import { useRef, useEffect } from "react";

const STRIP = 3;

function spawnShockwave(shockwaves, x, y, speed) {
  shockwaves.push({
    x, y,
    radius: 0,
    maxRadius: 130,
    strength: Math.min(speed * 1.2, 40),
  });
}

function advanceShockwaves(shockwaves) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    shockwaves[i].radius += 4;
    if (shockwaves[i].radius > shockwaves[i].maxRadius) shockwaves.splice(i, 1);
  }
}

function computeRowOffset(r, t, mouse, isHovered, shockwaves) {
  const sy = r * STRIP;
  const cy = sy + STRIP / 2;
  const idlePhase = t + r * 0.018;
  let offsetX = Math.sin(idlePhase) * 1.5;

  if (isHovered) {
    const dist = Math.abs(cy - mouse.y);
    if (dist < 80) {
      const falloff = (1 - dist / 80) ** 2;
      offsetX += Math.sin(idlePhase * 2.5 + dist * 0.05) * 18 * falloff;
    }
  }

  shockwaves.forEach((sw) => {
    const dist = Math.abs(cy - sw.y);
    const ringDist = Math.abs(dist - sw.radius);
    if (ringDist < 18) {
      const ringFalloff = (1 - ringDist / 18) ** 2;
      const decay = 1 - sw.radius / sw.maxRadius;
      offsetX += Math.sin(dist * 0.3 - t * 8) * sw.strength * ringFalloff * decay;
    }
  });

  return { sy, offsetX };
}

export function useWaveCanvas(src) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const state = {
      img: null, W: 0, H: 0, time: 0, raf: null,
      mouse: { x: -9999, y: -9999 },
      prevMouse: { x: -9999, y: -9999 },
      mouseVel: { x: 0, y: 0 },
      isHovered: false,
      shockwaves: [],
      _lastShock: null,
    };

    const resize = () => {
      state.W = canvas.width  = canvas.offsetWidth;
      state.H = canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      const { W, H, img, mouse, prevMouse, mouseVel, isHovered, shockwaves } = state;

      if (!img) { state.raf = requestAnimationFrame(draw); return; }

      state.time += 0.012;
      const t = state.time;

      mouseVel.x = mouse.x - prevMouse.x;
      mouseVel.y = mouse.y - prevMouse.y;
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
      const speed = Math.sqrt(mouseVel.x ** 2 + mouseVel.y ** 2);

      if (isHovered && speed > 6 && (!state._lastShock || t - state._lastShock > 0.08)) {
        spawnShockwave(shockwaves, mouse.x, mouse.y, speed);
        state._lastShock = t;
      }

      advanceShockwaves(shockwaves);
      ctx.clearRect(0, 0, W, H);

      const rows = Math.ceil(H / STRIP);
      const scaleY = img.naturalHeight / H;

      for (let r = 0; r < rows; r++) {
        const { sy, offsetX } = computeRowOffset(r, t, mouse, isHovered, shockwaves);
        ctx.drawImage(img, 0, sy * scaleY, img.naturalWidth, STRIP * scaleY, offsetX, sy, W, STRIP);
      }

      state.raf = requestAnimationFrame(draw);
    };

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => { state.img = image; };
    image.src = src;

    resize();
    draw();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mouse.x = e.clientX - rect.left;
      state.mouse.y = e.clientY - rect.top;
    };
    const onEnter = () => { state.isHovered = true; };
    const onLeave = () => {
      state.isHovered = false;
      state.mouse.x = state.mouse.y = -9999;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(state.raf);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [src]);

  return canvasRef;
}
