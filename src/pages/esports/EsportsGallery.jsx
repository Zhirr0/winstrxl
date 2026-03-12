import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const images = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  src: `/images/img${i + 1}.webp`,
  alt: `Design ${i + 1}`,
}));

const COLUMN_CONFIGS = {
  5: { from: [20, 15, 10, 30, 25], to: [-30, -35, -30, -50, -20] },
  4: { from: [15, 20, 5, 10], to: [-65, -70, -60, -55] },
  3: { from: [20, 25, 30], to: [-30, -10, -20] },
  2: { from: [30, 30], to: [-20, -30] },
};

const getColCount = () => {
  const w = window.innerWidth;
  if (w >= 1024) return 5;
  if (w >= 768) return 4;
  if (w >= 640) return 3;
  return 2;
};

export default function EsportsGallery() {
  const [colCount, setColCount] = useState(() => getColCount());
  const sectionRef = useRef(null);
  const colRefs = useRef([]);

  useEffect(() => {
    const update = () => setColCount(getColCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const columns = Array.from({ length: colCount }, (_, ci) =>
    images.filter((_, i) => i % colCount === ci),
  );

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const makeAnimation = (cols) => {
      const { from, to } = COLUMN_CONFIGS[cols];
      const colEls = colRefs.current.filter(Boolean).slice(0, cols);

      gsap.set(colEls, { yPercent: (i) => from[i] });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          invalidateOnRefresh: true,
          scrub: true,
        },
      });

      tl.to(colEls, { yPercent: (i) => to[i], ease: "none" }, 0);
    };

    mm.add("(min-width: 1024px)", () => makeAnimation(5));
    mm.add("(min-width: 768px) and (max-width: 1023.99px)", () =>
      makeAnimation(4),
    );
    mm.add("(min-width: 640px) and (max-width: 767.99px)", () =>
      makeAnimation(3),
    );
    mm.add("(max-width: 639.99px)", () => makeAnimation(2));

    return () => mm.revert();
  }, [colCount]);

  return (
    <section ref={sectionRef} className="es-gallery">
      <div className="es-gallery-grid">
        {columns.map((colImages, ci) => (
          <div
            key={ci}
            ref={(el) => (colRefs.current[ci] = el)}
            className="es-gallery-col"
          >
            {colImages.map((img) => (
              <div key={img.id} className="es-gallery-img">
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
