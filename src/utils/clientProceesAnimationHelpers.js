import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { BG_DURATION } from "../config/ClientProcess.config";

/* Kills any running background color tweens then transitions
   the background color of the given targets to the new color */
export function animateBg(targets, color, delay = 0) {
  gsap.killTweensOf(targets, "backgroundColor");
  gsap.to(targets, {
    backgroundColor: color,
    duration: BG_DURATION,
    delay,
    ease: "power1.in",
  });
}

/* Kills any running color tweens then transitions
   the text color of the given targets to the new color */
export function animateColor(targets, color, delay = 0) {
  gsap.killTweensOf(targets, "color");
  gsap.to(targets, { color, duration: 0.3, delay, ease: "power1.in" });
}

/* Plays a timeline forward if it should be active and is not already
   complete, or reverses it if it should no longer be active */
export function driveTextTimeline(tl, shouldPlay) {
  if (!tl) return;
  if (shouldPlay) {
    if (!tl.isActive() && tl.progress() < 1) tl.play();
  } else {
    if (tl.progress() > 0) tl.reverse();
  }
}

/* Builds a paused GSAP timeline from an array of split text items.
   Each item describes a selector, split type, optional mask, and the
   fromVars that define how the characters or lines animate in */
export function buildTimeline(items) {
  const tl = gsap.timeline({ paused: true });
  items.forEach(({ selector, type, mask, fromVars }) => {
    if (!document.querySelector(selector)) return;
    const split = SplitText.create(selector, {
      type,
      ...(mask ? { mask } : {}),
    });
    const targets = type === "chars" ? split.chars : split.lines;
    if (targets?.length) tl.from(targets, { ...fromVars }, 0);
  });
  return tl;
}

/* Builds the full text reveal timeline for a single card using
   its card number to derive all the relevant selectors */
export function createCardTimeline(num, charVars, lineVars) {
  return buildTimeline([
    {
      selector: `.process-card-title-${num}`,
      type: "chars",
      fromVars: charVars,
    },
    {
      selector: `.process-card-number-${num}`,
      type: "chars",
      fromVars: charVars,
    },
    {
      selector: `.process-card-description-${num}1`,
      type: "lines",
      mask: "lines",
      fromVars: lineVars,
    },
    {
      selector: `.process-card-description-${num}2`,
      type: "lines",
      mask: "lines",
      fromVars: lineVars,
    },
  ]);
}
