import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useFadeOnScroll(container, selectorToFadeOut) {
  useGSAP(() => {
    if (!container) return;

    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "top 20%",
      scrub: 0.4,
      onUpdate(e) {
        const opacity = gsap.utils.interpolate(1, 0, e.progress);
        gsap.set(selectorToFadeOut, { opacity });
      },
    });
  }, [container, selectorToFadeOut]);
}