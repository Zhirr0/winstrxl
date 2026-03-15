import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import ProcessCard from "../../components/ClientProcessCard";

const CARDS = [
  {
    title: "Discovery",
    number: "01",
    tag: "Week 1",
    description: (
      <>
        <p>
          Every project starts with a conversation. I dig into your brand voice,
          target audience, and the platforms you live on whether that's YouTube,
          Twitter, or anywhere your content needs to stop the scroll.
        </p>
        <p>
          You'll fill out a brief covering your content style, visual references,
          and the feeling you want to land. No guesswork, just a clear creative
          direction before a single pixel is placed.
        </p>
      </>
    ),
    className: "cl-process-card-1",
    titleClassName: "process-card-title-1",
    numebrClassName: "process-card-number-1",
    descriptionFirstClassName: "process-card-description-11",
    descriptionSecondClassName: "process-card-description-12",
  },
  {
    title: "Design",
    number: "02",
    tag: "Week 1–2",
    description: (
      <>
        <p>
          I build 2–3 distinct concepts based on your brief, each one a complete
          visual direction, not a rough sketch. Thumbnails are designed at full
          resolution, tested at small sizes, and optimised for click-through.
        </p>
        <p>
          You get one round of structured revisions. Feedback is handled through
          a shared board, keeping decisions clear and the timeline tight. No
          endless back-and-forth.
        </p>
      </>
    ),
    className: "cl-process-card-2 absolute inset-0 z-5",
    titleClassName: "process-card-title-2",
    numebrClassName: "process-card-number-2",
    descriptionFirstClassName: "process-card-description-21",
    descriptionSecondClassName: "process-card-description-22",
  },
  {
    title: "Delivery",
    number: "03",
    tag: "Week 2",
    description: (
      <>
        <p>
          Final files land in your inbox as export-ready PNGs, layered PSDs, and
          any platform-specific cuts you need sized for YouTube, Twitter cards,
          or wherever your content lives.
        </p>
        <p>
          Every project ships with a one-page style guide so your team can stay
          consistent long after delivery. The work is yours, fully licensed, no
          strings attached.
        </p>
      </>
    ),
    className: "cl-process-card-3 absolute inset-0 z-20",
    titleClassName: "process-card-title-3",
    numebrClassName: "process-card-number-3",
    descriptionFirstClassName: "process-card-description-31",
    descriptionSecondClassName: "process-card-description-32",
  },
];

export default function ClientProcess() {
  useGSAP(() => {
    // These are mutable refs shared via closure between the
    // synchronous ScrollTrigger callbacks and the async font loader.
    // By the time any user can scroll, fonts.ready will have resolved.
    let card1Tl = null;
    let card2Tl = null;
    let card3Tl = null;

    // ── Background / colour transition (sync) ────────────────────────────────
    const bgTargets = [".cl-process-card", ".cl-page"];
    const bgDuration = 0.3;
    const colorDelay = bgDuration + 0.05;

    const animateBg = (color, delay = 0) => {
      gsap.killTweensOf(bgTargets, "backgroundColor");
      gsap.to(bgTargets, { backgroundColor: color, duration: bgDuration, delay, ease: "power1.in" });
    };
    const animateColor = (color, delay = 0) => {
      gsap.killTweensOf(bgTargets, "color");
      gsap.to(bgTargets, { color, duration: 0.3, delay, ease: "power1.in" });
    };

    ScrollTrigger.create({
      trigger: ".cl-process",
      start: "top center",
      end: `+=${window.innerHeight * 4.5}`,
      onEnter() {
        animateBg("oklch(94.7% 0.024 47.1)");
        animateColor("oklch(14% 0.006 173.6)", colorDelay);
      },
      onLeaveBack() {
        animateColor("oklch(100% 0.00011 271.152)");
        animateBg("oklch(14% 0.006 173.6)", colorDelay);
      },
    });

    // ── Card 1: in normal flow so DOM position is correct (sync) ────────────
    ScrollTrigger.create({
      trigger: ".cl-process-card-1",
      start: "top 60%",
      onEnter()     { card1Tl?.play(); },
      onLeaveBack() { card1Tl?.reverse(); },
    });

    // ── Pin + cards 2 & 3 driven by progress (sync) ──────────────────────────
    // CARD2_THRESHOLD: 0.4 = 40% through the pin = card 2 is mostly slid in
    // CARD3_THRESHOLD: 0.9 = 90% through the pin = card 3 is mostly slid in
    const CARD2_THRESHOLD = 0.4;
    const CARD3_THRESHOLD = 0.9;

    function driveTextTimeline(tl, shouldPlay) {
      if (!tl) return;
      if (shouldPlay) {
        if (!tl.isActive() && tl.progress() < 1) tl.play();
      } else {
        if (tl.progress() > 0) tl.reverse();
      }
    }

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

    // mm.add is called synchronously — safe for useGSAP cleanup
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: ".cl-process",
        start: "top top",
        end: `+=${window.innerHeight * 3}px`,
        invalidateOnRefresh: true,
        pin: true,
        onUpdate(self) { handleUpdate(self, 81, 61); },
      });
    });

    mm.add("(max-width: 767.99px)", () => {
      ScrollTrigger.create({
        trigger: ".cl-process",
        start: "top top",
        end: `+=${window.innerHeight * 3}px`,
        invalidateOnRefresh: true,
        pin: true,
        onUpdate(self) { handleUpdate(self, 87, 74); },
      });
    });

    document.fonts.ready.then(() => {
      const charVars = { scaleX: 0, duration: 1, stagger: 0.075, ease: "power3.out" };
      const lineVars = { yPercent: -100, duration: 2, stagger: 0.075, ease: "power3.out" };

      function buildTimeline(items) {
        const tl = gsap.timeline({ paused: true });
        items.forEach(({ selector, type, mask, fromVars }) => {
          if (!document.querySelector(selector)) return;
          const split = SplitText.create(selector, { type, ...(mask ? { mask } : {}) });
          const targets = type === "chars" ? split.chars : split.lines;
          if (targets?.length) tl.from(targets, { ...fromVars }, 0);
        });
        return tl;
      }

      card1Tl = buildTimeline([
        { selector: ".process-card-title-1",       type: "chars",               fromVars: charVars },
        { selector: ".process-card-number-1",       type: "chars",               fromVars: charVars },
        { selector: ".process-card-description-11", type: "lines", mask: "lines", fromVars: lineVars },
        { selector: ".process-card-description-12", type: "lines", mask: "lines", fromVars: lineVars },
      ]);

      card2Tl = buildTimeline([
        { selector: ".process-card-title-2",       type: "chars",               fromVars: charVars },
        { selector: ".process-card-number-2",       type: "chars",               fromVars: charVars },
        { selector: ".process-card-description-21", type: "lines", mask: "lines", fromVars: lineVars },
        { selector: ".process-card-description-22", type: "lines", mask: "lines", fromVars: lineVars },
      ]);

      card3Tl = buildTimeline([
        { selector: ".process-card-title-3",       type: "chars",               fromVars: charVars },
        { selector: ".process-card-number-3",       type: "chars",               fromVars: charVars },
        { selector: ".process-card-description-31", type: "lines", mask: "lines", fromVars: lineVars },
        { selector: ".process-card-description-32", type: "lines", mask: "lines", fromVars: lineVars },
      ]);

      // If card 1 is already in view when fonts finish loading, play immediately
      const card1Trigger = ScrollTrigger.getById("card1");
      if (card1Trigger?.isActive) card1Tl.play();
    });
  }, []);

  const [card1, card2, card3] = CARDS;

  return (
    <section className="cl-process">
      <div className="cl-process-wrapper">
        <ProcessCard {...card1} />
      </div>
      <div className="cl-process-wrapper relative z-3">
        <ProcessCard {...card2} />
        <ProcessCard {...card3} />
      </div>
    </section>
  );
}