import { useEffect } from "react";

export default function GlitchWordmark({ text = "WINSTRXL" }) {
  const config = {
    fontSize: "clamp(72px, 16.5vw, 320px)",
    fontFamily: "'Bebas Neue', sans-serif",
    letterSpacing: "0px",
    strokeWidth: "0.15px",
    strokeColor: "oklch(62% 0.336 25.1 / 0.3)",
    glitchColorR: "oklch(62% 0.336 25.1 / 0.22)",
    glitchColorB: "oklch(68% 0.28 15 / 0.16)",
    interval: 3,
  };

  const styles = `
    .glitch-wrap {
      position: relative;
      display: block;
      line-height: 0.86;
      user-select: none;
    }
    .glitch-main,
    .glitch-r,
    .glitch-b {
      display: block;
      font-family: ${config.fontFamily};
      font-size: ${config.fontSize};
      letter-spacing: ${config.letterSpacing};
      line-height: 0.86;
      white-space: nowrap;
    }
    .glitch-main {
      position: relative;
      z-index: 2;
      color: transparent;
      -webkit-text-stroke: ${config.strokeWidth} ${config.strokeColor};
      animation: glitchMain var(--glitch-interval, 9s) infinite;
    }
    .glitch-r {
      position: absolute;
      top: 0; left: 0;
      z-index: 3;
      color: ${config.glitchColorR};
      pointer-events: none;
      animation: glitchR var(--glitch-interval, 9s) infinite;
    }
    .glitch-b {
      position: absolute;
      top: 0; left: 0;
      z-index: 1;
      color: ${config.glitchColorB};
      pointer-events: none;
      animation: glitchB var(--glitch-interval, 9s) infinite;
    }
    @keyframes glitchMain {
      0%, 87%, 100% { transform: none; clip-path: none; }
      88% { transform: translateX(-3px); clip-path: inset(12% 0 58% 0); }
      89% { transform: translateX(4px);  clip-path: inset(68% 0 8%  0); }
      90% { transform: translateX(-1px); clip-path: inset(38% 0 32% 0); }
      91% { transform: none; clip-path: none; }
      93% { transform: translateX(2px);  clip-path: inset(52% 0 22% 0); }
      94% { transform: none; clip-path: none; }
    }
    @keyframes glitchR {
      0%, 87%, 100% { transform: none; }
      88% { transform: translateX(6px) skewX(1.5deg); }
      89% { transform: translateX(-5px); }
      90% { transform: none; }
      93% { transform: translateX(4px); }
      94% { transform: none; }
    }
    @keyframes glitchB {
      0%, 87%, 100% { transform: none; }
      88% { transform: translateX(-8px); }
      89% { transform: translateX(3px); }
      90% { transform: none; }
      93% { transform: translateX(-5px); }
      94% { transform: none; }
    }
  `;

  useEffect(() => {
    const existing = document.getElementById("glitch-wordmark-styles");
    if (existing) existing.remove();
    const tag = document.createElement("style");
    tag.id = "glitch-wordmark-styles";
    tag.textContent = styles;
    document.head.appendChild(tag);
  }, []);

  return (
    <div
      className="glitch-wrap"
      style={{ "--glitch-interval": `${config.interval}s` }}
    >
      <span className="glitch-r" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-b" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-main">{text}</span>
    </div>
  );
}
