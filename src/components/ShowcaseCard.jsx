import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { WaveCanvas } from "./WaveCanvas";
import {
  revealChars,
  wipeIn,
  scaleInLine,
  drawSvgIn,
} from "../utils/animationHelpers";
import ShowcaseCardSvg from "../components/ShowcaseCardSvg";

export function ShowcaseCard({ client, index }) {
  const cardRef = useRef(null);
  const imgWrapRef = useRef(null);
  const titleRef = useRef(null);
  const typeRef = useRef(null);
  const lineRef = useRef(null);
  const svgPathRef = useRef(null);
  const isReversed = index % 2 === 1;

  useGSAP(() => {
    const card = cardRef.current;
    scaleInLine(lineRef.current, card);
    wipeIn(imgWrapRef.current, card);
    revealChars(titleRef.current, card, {
      rotateX: -80,
      duration: 1.1,
      ease: "power3.out",
      stagger: { amount: 0.35, from: "start" },
      scrollTrigger: { trigger: card, start: "top 72%" },
    });
    revealChars(typeRef.current, card, {
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.02,
      delay: 0.3,
      scrollTrigger: { trigger: card, start: "top 72%" },
    });
    drawSvgIn(svgPathRef.current, card);
  }, []);

  return (
    <div
      ref={cardRef}
      className={[
        "relative border-t border-light-primary/10",
        "flex flex-col gap-8",
        "md:grid md:items-center md:gap-12 lg:gap-20",
        isReversed
          ? "md:grid-cols-[1fr_minmax(300px,55%)]"
          : "md:grid-cols-[minmax(300px,55%)_1fr]",
      ].join(" ")}
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
    >
      {/* Image */}
      <div
        ref={imgWrapRef}
        className={[
          "w-full order-1 aspect-video sm:aspect-16/7",
          "relative overflow-hidden rounded-lg",
          isReversed ? "md:order-2" : "md:order-1",
        ].join(" ")}
        style={{ zIndex: 1 }}
      >
        <WaveCanvas src={client.src} />
        <div
          className="absolute bottom-0 left-0 h-0.5 w-2/5 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.6), transparent)",
          }}
        />
      </div>

      {/* Text */}
      <div
        className={[
          "order-2 min-w-0",
          isReversed ? "md:order-1" : "md:order-2",
        ].join(" ")}
        style={{ zIndex: 1 }}
      >
        <div  style={{ marginBottom: "1rem" }}>
          <div
            ref={typeRef}
            className="relative items-center max-[1200px]:translate-x-2 max-[768px]:translate-x-0 max-[768px]:translate-y-3 translate-x-10 gap-2.5 font-mono text-[12px] tracking-[0px] text-light-primary uppercase"
            style={{ zIndex: 2 }}
          >
            {client.type} / {client.year}
          </div>
        </div>

        <div
          className="relative overflow-visible"
          style={{ perspective: "600px" }}
        >
          {/* SVG behind the title */}
          <div
            className="absolute inset-0 flex items-center pointer-events-none -translate-y-5 -translate-x-5 max-[768px]:translate-y-0 max-[768px]:translate-x-0"
            style={{ zIndex: -1 }}
          >
            <ShowcaseCardSvg ref={svgPathRef} fill={client.svgColor} />
          </div>

          <h2
            ref={titleRef}
            className="font-display text-[clamp(44px,7vw,110px)] max-[1200px]:translate-x-2 max-[768px]:translate-x-0 max-[768px]: translate-x-10 text-light-primary leading-[0.88] tracking-[0px] relative"
            style={{ margin: 0, zIndex: 1 }}
          >
            {client.name}
          </h2>
        </div>
      </div>

      {/* Bottom rule */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 h-px bg-light-primary/5"
      />
    </div>
  );
}
