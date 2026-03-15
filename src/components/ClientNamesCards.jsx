import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  projects,
  TEXT_DARK,
  TEXT_LIGHT,
  TEXT_SELECTORS,
} from "../config/clientNames.config";

export default function ClientNamesCards() {
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const rows = cardsRef.current.querySelectorAll(".cl-names-row");
    const cleanup = [];

    rows.forEach((row) => {
      const bg = document.createElement("div");
      bg.style.cssText = `
        position: absolute;
        inset: 0;
        background: ${TEXT_DARK};
        z-index: -1;
        pointer-events: none;
      `;

      row.style.position = "relative";
      row.style.overflow = "hidden";
      row.style.isolation = "isolate";
      row.insertBefore(bg, row.firstChild);

      gsap.set(bg, { y: "100%" });

      // Collect all text nodes inside this row
      const textEls = TEXT_SELECTORS.flatMap((sel) => [
        ...row.querySelectorAll(sel),
      ]);

      const handleMouseEnter = (e) => {
        const rect = row.getBoundingClientRect();
        const fromTop = e.clientY < rect.top + rect.height / 2;

        gsap.fromTo(
          bg,
          { y: fromTop ? "-100%" : "100%" },
          { y: "0%", duration: 0.5, ease: "power2.out" },
        );

        gsap.to(textEls, { color: TEXT_LIGHT, duration: 0.2, overwrite: true });
      };

      const handleMouseLeave = (e) => {
        const rect = row.getBoundingClientRect();
        const fromTop = e.clientY < rect.top + rect.height / 2;

        gsap.to(bg, {
          y: fromTop ? "-100%" : "100%",
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(textEls, { color: TEXT_DARK, duration: 0.2, overwrite: true });
      };

      row.addEventListener("mouseenter", handleMouseEnter);
      row.addEventListener("mouseleave", handleMouseLeave);

      cleanup.push(() => {
        row.removeEventListener("mouseenter", handleMouseEnter);
        row.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1024px)", () => {
        const rows = cardsRef.current.querySelectorAll(".cl-names-row");

        rows.forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    },
    { scope: cardsRef },
  );

  return (
    <div className="cl-names-cards" ref={cardsRef}>
      {projects.map((project) => (
        <div className="cl-names-row" key={project.num}>
          <div className="cl-names-row-num" style={{ padding: "16px" }}>
            {project.num}
          </div>

          <div className="cl-names-row-thumb" />

          <div className="cl-names-row-info" style={{ padding: "0 18px" }}>
            <span className="cl-names-row-name">{project.name}</span>
            <span className="cl-names-row-sub">{project.sub}</span>
          </div>

          <div className="cl-names-row-type" style={{ padding: "0 18px" }}>
            {project.type}
          </div>

          <div className="cl-names-row-arrow">→</div>
        </div>
      ))}
    </div>
  );
}
