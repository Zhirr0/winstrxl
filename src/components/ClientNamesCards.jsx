import { useEffect, useRef } from "react";
import gsap from "gsap";

const projects = [
  { num: "01", name: "Apex Streetwear — Full Brand Identity",   sub: "2024 · Branding",   type: "Branding"   },
  { num: "02", name: "Noir Coffee Co. — Packaging System",      sub: "2024 · Packaging",  type: "Packaging"  },
  { num: "03", name: "Hollow Skate — Deck + Merch Line",        sub: "2024 · Merch",      type: "Merch"      },
  { num: "04", name: "Vivid Studio — Social Media Kit",         sub: "2024 · Social",     type: "Social"     },
  { num: "05", name: "Dusk Records — Artist Visual Identity",   sub: "2023 · Branding",   type: "Branding"   },
  { num: "06", name: "Vault Apparel — Season Lookbook",         sub: "2023 · Print",      type: "Print"      },
  { num: "07", name: "Solstice Records — EP Artwork Series",    sub: "2023 · Branding",   type: "Branding"   },
  { num: "08", name: "Phantom Studio — Web Visual Concept",     sub: "2023 · Social",     type: "Social"     },
  { num: "09", name: "Low Tide Co. — Surf Brand Identity",      sub: "2022 · Branding",   type: "Branding"   },
  { num: "10", name: "Ember Goods — Product Packaging",         sub: "2022 · Packaging",  type: "Packaging"  },
];

export default function ClientNamesCards() {
  const cardsRef = useRef(null);

  useEffect(() => {
    const rows = cardsRef.current.querySelectorAll(".cl-names-row");
    const cleanup = [];

    rows.forEach((row) => {
      const bg = document.createElement("div");
      bg.style.cssText = `
        position: absolute;
        inset: 0;
        background: oklch(38% 0.336 25.1);
        z-index: -1;
        pointer-events: none;
      `;

      row.style.position = "relative";
      row.style.overflow = "hidden";
      row.style.isolation = "isolate";
      row.insertBefore(bg, row.firstChild);

      // Start offscreen
      gsap.set(bg, { y: "100%" });

      const handleMouseEnter = (e) => {
        const rect = row.getBoundingClientRect();
        const enterFromTop = e.clientY < rect.top + rect.height / 2;

        gsap.fromTo(
          bg,
          { y: enterFromTop ? "-100%" : "100%" },
          { y: "0%", duration: 0.4, ease: "power2.out" }
        );
      };

      const handleMouseLeave = (e) => {
        const rect = row.getBoundingClientRect();
        const leavingFromTop = e.clientY < rect.top + rect.height / 2;

        gsap.to(bg, {
          y: leavingFromTop ? "-100%" : "100%",
          duration: 0.4,
          ease: "power2.out",
        });
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