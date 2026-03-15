import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CARD2_THRESHOLD,
  CARD3_THRESHOLD,
  COLOR_DELAY,
  CHAR_VARS,
  LINE_VARS,
  BG_COLORS,
  BG_TARGETS,
} from "../config/ClientProcess.config";
import {
  animateBg,
  animateColor,
  driveTextTimeline,
  createCardTimeline,
} from "../utils/clientProceesAnimationHelpers";

/* Registers all scroll triggered animations for the process section.
   Card timelines are built after fonts resolve to guarantee accurate
   text splitting. The matchMedia blocks handle the difference in
   card offset values between desktop and mobile viewports */
export function useClientProcess() {
  useGSAP(() => {
    let card1Tl = null;
    let card2Tl = null;
    let card3Tl = null;

    /* Background and text color transition when the section enters
       or leaves the viewport */
    ScrollTrigger.create({
      trigger: ".cl-process",
      start: "top center",
      invalidateOnRefresh: true,
      end: `+=${window.innerHeight * 4.5}`,
      onEnter() {
        animateBg(BG_TARGETS, BG_COLORS.light);
        animateColor(BG_TARGETS, BG_COLORS.dark, COLOR_DELAY);
      },
      onLeaveBack() {
        animateColor(BG_TARGETS, BG_COLORS.white);
        animateBg(BG_TARGETS, BG_COLORS.dark, COLOR_DELAY);
      },
    });

    /* Trigger that plays or reverses card 1s text timeline based
       on whether the card has entered the viewport */
    ScrollTrigger.create({
      trigger: ".cl-process-card-1",
      start: "top 60%",
      invalidateOnRefresh: true,
      onEnter() {
        card1Tl?.play();
      },
      onLeaveBack() {
        card1Tl?.reverse();
      },
    });

    /* Drives the yPercent of cards 2 and 3 and fires their text
       timelines based on how far through the pinned section the
       user has scrolled */
    function handleUpdate(self, yPct2, yPct3) {
      const p = self.progress;

      gsap.set(".cl-process-card-2", {
        yPercent: p <= 0.5 ? -yPct2 * (p / 0.5) : -yPct2,
      });
      gsap.set(".cl-process-card-3", {
        yPercent: p > 0.5 ? -yPct3 * ((p - 0.5) / 0.5) : 0,
      });

      driveTextTimeline(card2Tl, p >= CARD2_THRESHOLD);
      driveTextTimeline(card3Tl, p >= CARD3_THRESHOLD);
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: ".cl-process",
        invalidateOnRefresh: true,
        start: "top top",
        end: `+=${window.innerHeight * 3}px`,
        invalidateOnRefresh: true,
        pin: true,
        onUpdate(self) {
          handleUpdate(self, 81, 61);
        },
      });
    });

    mm.add("(max-width: 767.99px)", () => {
      ScrollTrigger.create({
        trigger: ".cl-process",
        invalidateOnRefresh: true,
        start: "top top",
        end: `+=${window.innerHeight * 3}px`,
        invalidateOnRefresh: true,
        pin: true,
        onUpdate(self) {
          handleUpdate(self, 87, 74);
        },
      });
    });

    /* Text timelines are deferred until fonts are ready so that
       SplitText measures characters at their final rendered size */
    document.fonts.ready.then(() => {
      card1Tl = createCardTimeline(1, CHAR_VARS, LINE_VARS);
      card2Tl = createCardTimeline(2, CHAR_VARS, LINE_VARS);
      card3Tl = createCardTimeline(3, CHAR_VARS, LINE_VARS);

      const card1Trigger = ScrollTrigger.getById("card1");
      if (card1Trigger?.isActive) card1Tl.play();
    });
  }, []);
}
