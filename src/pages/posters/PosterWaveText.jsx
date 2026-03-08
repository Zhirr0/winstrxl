import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
const CONTENT_SECTIONS = [
  [
    "POSTERS",
    "TYPOGRAPHY",
    "LAYOUT",
    "GRID",
    "COMPOSITION",
    "CONTRAST",
    "COLOR",
    "FORM",
    "SHAPE",
    "BALANCE",
    "RHYTHM",
    "VISUALS",
    "PRINT",
    "DESIGN",
    "AESTHETIC",
    "STRUCTURE",
    "EXPRESSION",
    "CONCEPT",
    "GRAPHICS",
    "CREATIVE",
    "ARTWORK",
    "IDENTITY",
  ],
];

export default function PosterWaveText() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const texts = gsap.utils.toArray(".animated-text");
      const contentContainer =
        containerRef?.current?.querySelector(".content-container");

      if (!contentContainer) return;

      const getMinX = () => (window.innerWidth >= 1024 ? 192 : 0);
      const getMaxX = () => (window.innerWidth >= 1024 ? 511 : 150);

      const quickSetters = texts.map((t) =>
        gsap.quickTo(t, "x", { duration: 0.6, ease: "power4.out" }),
      );

      texts.forEach((t, i) => {
        const minX = getMinX();
        const range = getMaxX() - minX;
        const waveNumber = 0.5;

        const initialPhase = waveNumber * i + 0 - Math.PI / 2;
        const initialWave = Math.sin(initialPhase);
        const initialProgress = (initialWave + 1) / 2;
        const startX = minX + initialProgress * range;

        gsap.set(t, { x: startX });
      });

      ScrollTrigger.create({
        trigger: contentContainer,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate(self) {
          const progress = self.progress;
          const minX = getMinX();
          const range = getMaxX() - minX;
          const waveNumber = 0.5;
          const waveSpeed = 1.2;
          const viewportCenter = window.innerHeight / 2;

          let closestIndex = 0;
          let minDistance = Infinity;

          texts.forEach((t, i) => {
            const rect = t.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - viewportCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = i;
            }
          });

          texts.forEach((text, index) => {
            const phase =
              waveNumber * index +
              waveSpeed * progress * Math.PI * 2 -
              Math.PI / 2;
            const wave = Math.sin(phase);
            const cycleProgress = (wave + 1) / 2;
            const finalX = minX + cycleProgress * range;

            quickSetters[index](finalX);

            if (index === closestIndex) {
              text.classList.remove("text-[#4d4d4d]");
              text.classList.add("text-light-primary");
            } else {
              text.classList.remove("text-light-primary");
              text.classList.add("text-[#4d4d4d]");
            }
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <div className="content-container h-auto lg:gap-16 lg:text-[7vw] leading-none font-semibold flex w-full flex-col justify-between gap-5 text-[9vw]">
        {CONTENT_SECTIONS.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col">
            {section.map((text, textIndex) => (
              <div
                key={textIndex}
                className="animated-text font-mono w-max text-[#4d4d4d] transition-colors duration-150 ease-out"
              >
                {text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
