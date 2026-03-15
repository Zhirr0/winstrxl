export const CARDS = [
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
          You'll fill out a brief covering your content style, visual
          references, and the feeling you want to land. No guesswork, just a
          clear creative direction before a single pixel is placed.
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

export const CARD2_THRESHOLD = 0.4;
export const CARD3_THRESHOLD = 0.9;

export const BG_DURATION = 0.3;
export const COLOR_DELAY = BG_DURATION + 0.05;

export const CHAR_VARS = {
  scaleX: 0,
  duration: 1,
  stagger: 0.075,
  ease: "power3.out",
};
export const LINE_VARS = {
  yPercent: -100,
  duration: 2,
  stagger: 0.075,
  ease: "power3.out",
};

export const BG_TARGETS = [".cl-process-card", ".cl-page"];
export const BG_COLORS = {
  light: "oklch(94.7% 0.024 47.1)",
  dark: "oklch(14% 0.006 173.6)",
  white: "oklch(100% 0.00011 271.152)",
};
