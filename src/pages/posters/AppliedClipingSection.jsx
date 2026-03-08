import { Fragment, useRef } from "react";
import ClippingSection from "./ClipingSections";
import sections from "./data";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import gsap from "gsap";

export default function AppliedClippingSection() {
  const mainRef = useRef(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!mainRef.current || !lenis) return;

      const sectionEls = Array.from(
        mainRef.current.querySelectorAll("[data-snap-section]"),
      );
      const mediaEls = Array.from(
        mainRef.current.querySelectorAll("[data-media]"),
      );

      // parallax image
      mediaEls.forEach((m, i) => {
        const isLast = i === mediaEls.length - 1;
        gsap.fromTo(
          m,
          { y: "-100vh" },
          {
            y: isLast ? "0vh" : "100vh",
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionEls[i],
              start: "top bottom",
              end: isLast ? "bottom bottom" : "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      // snapping
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        let scrollTimer = null;
        let isSnapping = false;

        const getClosestSection = () => {
          const viewCenter = window.innerHeight / 2;
          let closest = null;
          let closestDist = Infinity;

          sectionEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
            if (!isVisible) return;
            const dist = Math.abs(rect.top + rect.height / 2 - viewCenter);
            if (dist < closestDist) {
              closestDist = dist;
              closest = el;
            }
          });

          return closest;
        };

        const scheduleSnap = () => {
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(() => {
            if (isSnapping) return;

            const target = getClosestSection();
            if (!target) return;

            isSnapping = true;

            lenis.scrollTo(target, {
              duration: 1.2,
              easing: (t) =>
                t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
              onComplete: () => {
                isSnapping = false;
                clearTimeout(scrollTimer);
              },
            });
          }, 80);
        };

        const handleUserInput = () => {
          if (isSnapping) {
            lenis.stop();
            lenis.start();
            isSnapping = false;
          }
          scheduleSnap();
        };

        const handleScroll = () => {
          if (isSnapping) return;
          scheduleSnap();
        };

        window.addEventListener("wheel", handleUserInput, { passive: true });
        window.addEventListener("touchmove", handleUserInput, {
          passive: true,
        });
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
          window.removeEventListener("wheel", handleUserInput);
          window.removeEventListener("touchmove", handleUserInput);
          window.removeEventListener("scroll", handleScroll);
          clearTimeout(scrollTimer);
        };
      });
    },
    { scope: mainRef, dependencies: [lenis] },
  );

  return (
    <main ref={mainRef}>
      {sections.map((s, i) => (
        <Fragment key={i}>
          <ClippingSection section={s} />
          {i < sections.length - 1 && (
            <hr className="bg-white text-white h-px" />
          )}
        </Fragment>
      ))}
    </main>
  );
}