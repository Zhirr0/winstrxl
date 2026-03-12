import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const useTextHighlight = (selector, triggerSelector, stagger = 0.01) => {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      SplitText.create(selector, {
        type: "chars, words",
        onSplit(self) {
          self.chars.forEach((char, i) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: triggerSelector,
                invalidateOnRefresh: true,
              },
            });

            tl.fromTo(
              char,
              { opacity: 0.2 },
              {
                opacity: 1,
                color: "oklch(38% 0.336 25.1)",
                duration: 0.4,
                ease: "power3.out",
                delay: i * stagger,
              }
            ).to(char, { color: "#ffffff", duration: 0.4, ease: "power3.out" });
          });
        },
      });
    });
  }, [selector, triggerSelector, stagger]);
};

export default useTextHighlight;