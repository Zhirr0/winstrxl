import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function drawSvgIn(target, trigger, vars = {}) {
  gsap.from(target, {
    drawSVG: "0%",
    duration: 2.8,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger,
      start: "top 88%",
      toggleActions: "play none none reverse",
    },
    ...vars,
  });
}

export function revealChars(target, trigger, vars = {}) {
  document.fonts.ready.then(() => {
    SplitText.create(target, {
      type: "chars",
      mask: "chars",
      onSplit(self) {
        gsap.from(self.chars, {
          yPercent: 110,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          ...vars,
        });
      },
    });
  });
}

export function revealWords(target, trigger, vars = {}) {
  document.fonts.ready.then(() => {
    SplitText.create(target, {
      type: "words",
      mask: "words",
      onSplit(self) {
        gsap.from(self.words, {
          yPercent: 105,
          filter: "blur(12px)",
          opacity: 0,
          duration: 1.3,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          ...vars,
        });
      },
    });
  });
}

export function fadeUp(target, trigger, vars = {}) {
  gsap.fromTo(
    target,
    { opacity: 0, y: vars.y ?? 20 },
    {
      opacity: 1,
      y: 0,
      duration: vars.duration ?? 1,
      ease: vars.ease ?? "power2.out",
      delay: vars.delay ?? 0,
      scrollTrigger: {
        trigger,
        start: vars.start ?? "top 80%",
        toggleActions: "play none none reverse",
      },
      ...vars,
    },
  );
}

export function wipeIn(target, trigger, vars = {}) {
  gsap.fromTo(
    target,
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.4,
      ease: "expo.inOut",
      delay: 0.1,
      scrollTrigger: {
        trigger,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
      ...vars,
    },
  );
}

export function scaleInLine(target, trigger, vars = {}) {
  gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: "left" },
    {
      scaleX: 1,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: {
        trigger,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      ...vars,
    },
  );
}
