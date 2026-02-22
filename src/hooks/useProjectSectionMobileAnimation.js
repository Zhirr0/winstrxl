import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { STAGGER, DURATION } from "../config/projectsSectionAnimation.config";

const PROJECT_COUNT = 3;

function animateSplit(element, options, trigger) {
  if (!element) return;

  document.fonts.ready.then(() => {
    SplitText.create(element, {
      type: options.type,
      mask: options.type,
      autoSplit: true,
      onSplit: (self) => {
        gsap.from(self[options.type], {
          yPercent: 100,
          duration: options.duration,
          ease: "power3.out",
          rotation: options.rotation ?? 0,
          ...(options.stagger && {
            stagger: { amount: options.stagger, from: "start" },
          }),
          scrollTrigger: {
            trigger,
            start: "top 75%",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        });
      },
    });
  });
}

function animateProject(index) {
  const n = index + 1;

  const container = document.querySelector(`.projects-description-${n}`);
  const label = document.querySelector(`.project-lable-${n}`);
  const number = document.querySelector(`.project-number-${n}`);
  const expand = document.querySelector(`.project-expnad-${n}`);
  const title = document.querySelector(`.project-title-${n}`);
  const description = document.querySelector(`.project-description-${n}`);

  if (!container) return;

  animateSplit(label, { type: "words", duration: DURATION.label, stagger: STAGGER.label }, container);
  animateSplit(number, { type: "chars", duration: DURATION.number, stagger: STAGGER.number }, container);
  animateSplit(expand, { type: "lines", duration: DURATION.expand, rotation: 360 }, container);
  animateSplit(title, { type: "words", duration: DURATION.title, stagger: STAGGER.title }, container);
  animateSplit(description, { type: "lines", duration: DURATION.description, stagger: STAGGER.description }, container);
}

export function useProjectsSectionMobile(isDesktop) {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 1024px)", () => {W
      Array.from({ length: PROJECT_COUNT }, (_, i) => animateProject(i));
    });
  }, [isDesktop]);
}