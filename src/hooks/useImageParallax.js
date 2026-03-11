// useParallax.js
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PARALLAX_START = 50;
const PARALLAX_END = 0;

export default function useImageParallax(parentRef, imageSelector = "img", mediaQuery = null) {
  const getPairs = () => {
    const raw = parentRef.current;
    if (!raw) return [];

    const parents = Array.isArray(raw) ? raw : [raw];

    return parents
      .filter(Boolean)
      .map((p) => ({
        parent: p,
        target: imageSelector ? p.querySelector(imageSelector) : p,
      }))
      .filter(({ target }) => target);
  };

  // Set initial states
  useGSAP(() => {
    const init = () => {
      getPairs().forEach(({ parent, target }) => {
        const isSelf = target === parent;
        isSelf
          ? gsap.set(target, { backgroundPosition: `center ${PARALLAX_START}%` })
          : gsap.set(target, { objectPosition: `center ${PARALLAX_START}%` });
      });
    };

    if (mediaQuery) {
      gsap.matchMedia().add(mediaQuery, init);
    } else {
      init();
    }
  }, []);

  // Attach scroll triggers
  useGSAP(() => {
    const setup = () => {
      getPairs().forEach(({ parent, target }) => {
        const isSelf = target === parent;

        ScrollTrigger.create({
          trigger: parent,
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            const pos = gsap.utils.interpolate(
              PARALLAX_START,
              PARALLAX_END,
              self.progress
            );
            isSelf
              ? gsap.set(target, { backgroundPosition: `center ${pos}%` })
              : gsap.set(target, { objectPosition: `center ${pos}%` });
          },
        });
      });
    };

    if (mediaQuery) {
      gsap.matchMedia().add(mediaQuery, setup);
    } else {
      setup();
    }
  }, []);
}