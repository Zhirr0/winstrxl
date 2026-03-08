import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

const PARALLAX_START = 0;
const PARALLAX_END = 70;

const ANIM_CONFIG = {
  progress: {
    fillOut: { duration: 0.3, ease: "power2.in" },
    trackResize: { duration: 0.35, ease: "power2.inOut" },
    fillIn: { duration: 0.32, ease: "power2.out" },
    fillInOffset: "-=0.08",
  },
  wipe: {
    duration: 1.2,
    ease: "power3.in",
  },
  text: {
    swapAt: 0.82,
    out: {
      title: { duration: 0.8, ease: "power3.in", stagger: 0.018 },
      specs: { duration: 0.65, ease: "power3.in", stagger: 0.04 },
      desc: { duration: 0.65, ease: "power3.in", stagger: 0.06 },
      counter: { duration: 0.7, ease: "power3.in" },
    },
    in: {
      title: { duration: 0.85, ease: "power3.out", stagger: 0.02 },
      specs: { duration: 0.6, ease: "power3.out", stagger: 0.05 },
      desc: { duration: 0.6, ease: "power3.out", stagger: 0.07 },
      counter: { duration: 0.75, ease: "power3.out" },
    },
  },
};

const POSTERS = [
  {
    image: "/images/img1.webp",
    title: "Burning Season",
    specs: "Screen print · 18×24 in · Limited to 50",
    desc: "Hand-drawn typography with layered grain textures and silk-screen colour blocking. Each print signed and numbered.",
  },
  {
    image: "/images/img2.webp",
    title: "Cold Meridian",
    specs: "Risograph · 11×17 in · Limited to 30",
    desc: "Two-colour risograph with deliberate ink bleed and halftone gradients. A study in restraint and noise.",
  },
  {
    image: "/images/img3.webp",
    title: "Ghost Frequency",
    specs: "Letterpress · 12×18 in · Limited to 20",
    desc: "Deep-impression letterpress on cotton stock. Text set in a custom slab, debossed to catch raking light.",
  },
  {
    image: "/images/img4.webp",
    title: "Solstice Burn",
    specs: "Woodblock · 16×20 in · Limited to 15",
    desc: "Hand-cut woodblock with deckled edges and a raw ink texture you can feel through the page.",
  },
];

const VISIBLE_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const HIDDEN_CLIP = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

const PosterHero = () => {
  const nextButtonRef = useRef(null);
  const previousButtonRef = useRef(null);
  const imageRefs = useRef([]);
  const mainContainer = useRef(null);
  const progTrackRefs = useRef([]);
  const progFillRefs = useRef([]);
  const titleRef = useRef(null);
  const specsRef = useRef(null);
  const descRef = useRef(null);
  const counterRef = useRef(null);

  const committedIndexRef = useRef(0);
  const tlRef = useRef(null);
  const activeSplitsRef = useRef([]);

  useGSAP(() => {
    imageRefs.current.forEach((img, i) => {
      gsap.set(img, {
        clipPath: i === 0 ? VISIBLE_CLIP : HIDDEN_CLIP,
        objectPosition: `center ${PARALLAX_START}%`,
        zIndex: i === 0 ? 2 : 1,
      });
    });

    progFillRefs.current.forEach((fill, i) => {
      gsap.set(fill, { scaleX: i === 0 ? 1 : 0, transformOrigin: "left" });
    });

    progTrackRefs.current.forEach((track, i) => {
      gsap.set(track, { flexGrow: i === 0 ? 2 : 1 });
    });
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: mainContainer.current,
      start: "top top",
      end: `+=${window.innerHeight}px`,
      onUpdate(self) {
        const pos = gsap.utils.interpolate(
          PARALLAX_START,
          PARALLAX_END,
          self.progress,
        );
        imageRefs.current.forEach((img) => {
          gsap.set(img, { objectPosition: `center ${pos}%` });
        });
      },
    });
  }, []);

  const navigateTo = (newIndex) => {
    const committed = committedIndexRef.current;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    gsap.killTweensOf([
      ...imageRefs.current,
      ...progFillRefs.current,
      ...progTrackRefs.current,
      titleRef.current,
      specsRef.current,
      descRef.current,
      counterRef.current,
    ]);

    activeSplitsRef.current.forEach((s) => s.revert());
    activeSplitsRef.current = [];

    imageRefs.current.forEach((img, i) => {
      gsap.set(img, {
        clipPath: i === committed ? VISIBLE_CLIP : HIDDEN_CLIP,
        zIndex: i === committed ? 2 : 1,
      });
    });

    progFillRefs.current.forEach((fill, i) => {
      gsap.set(fill, {
        scaleX: i === committed ? 1 : 0,
        transformOrigin: "left",
      });
    });

    progTrackRefs.current.forEach((track, i) => {
      gsap.set(track, { flexGrow: i === committed ? 2 : 1 });
    });

    const p = POSTERS[committed];
    titleRef.current.textContent = p.title;
    specsRef.current.textContent = p.specs;
    descRef.current.textContent = p.desc;
    counterRef.current.textContent = `${String(committed + 1).padStart(2, "0")} / ${String(POSTERS.length).padStart(2, "0")}`;
    gsap.set(
      [titleRef.current, specsRef.current, descRef.current, counterRef.current],
      { yPercent: 0, opacity: 1 },
    );

    nextButtonRef.current.disabled = true;
    previousButtonRef.current.disabled = true;

    const tl = gsap.timeline({
      onComplete: () => {
        committedIndexRef.current = newIndex;
        tlRef.current = null;
        nextButtonRef.current.disabled = false;
        previousButtonRef.current.disabled = false;
      },
    });

    tlRef.current = tl;

    tl.to(progFillRefs.current[committed], {
      scaleX: 0,
      transformOrigin: "right",
      ...ANIM_CONFIG.progress.fillOut,
    });

    tl.to(
      progTrackRefs.current[committed],
      { flexGrow: 1, ...ANIM_CONFIG.progress.trackResize },
      "<",
    );
    tl.to(
      progTrackRefs.current[newIndex],
      { flexGrow: 2, ...ANIM_CONFIG.progress.trackResize },
      "<",
    );

    tl.fromTo(
      progFillRefs.current[newIndex],
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, ...ANIM_CONFIG.progress.fillIn },
      ANIM_CONFIG.progress.fillInOffset,
    );

    gsap.set(imageRefs.current[newIndex], {
      clipPath: VISIBLE_CLIP,
      zIndex: 1,
    });
    gsap.set(imageRefs.current[committed], { zIndex: 2 });

    tl.to(
      imageRefs.current[committed],
      { clipPath: HIDDEN_CLIP, ...ANIM_CONFIG.wipe },
      0,
    );

    tl.call(
      () => {
        gsap.set(imageRefs.current[newIndex], { zIndex: 2 });
        gsap.set(imageRefs.current[committed], { zIndex: 1 });
      },
      [],
      ANIM_CONFIG.wipe.duration,
    );

    // Lock heights BEFORE splitting to prevent reflow on mobile
    gsap.set(titleRef.current, { height: titleRef.current.offsetHeight });
    gsap.set(specsRef.current, { height: specsRef.current.offsetHeight });
    gsap.set(descRef.current, { height: descRef.current.offsetHeight });

    const outTitle = new SplitText(titleRef.current, {
      type: "chars",
      mask: "chars",
    });
    const outSpecs = new SplitText(specsRef.current, {
      type: "words",
      mask: "words",
    });
    const outDesc = new SplitText(descRef.current, {
      type: "lines",
      mask: "lines",
    });
    activeSplitsRef.current = [outTitle, outSpecs, outDesc];

    tl.to(outTitle.chars, { yPercent: 100, ...ANIM_CONFIG.text.out.title }, 0);
    tl.to(outSpecs.words, { yPercent: 100, ...ANIM_CONFIG.text.out.specs }, 0);
    tl.to(outDesc.lines, { yPercent: 100, ...ANIM_CONFIG.text.out.desc }, 0);
    tl.to(
      counterRef.current,
      { yPercent: 100, opacity: 0, ...ANIM_CONFIG.text.out.counter },
      0,
    );

    tl.call(
      () => {
        outTitle.revert();
        outSpecs.revert();
        outDesc.revert();
        activeSplitsRef.current = [];

        const next = POSTERS[newIndex];
        titleRef.current.textContent = next.title;
        specsRef.current.textContent = next.specs;
        descRef.current.textContent = next.desc;
        counterRef.current.textContent = `${String(newIndex + 1).padStart(2, "0")} / ${String(POSTERS.length).padStart(2, "0")}`;

        // Lock heights BEFORE splitting incoming text too
        gsap.set(titleRef.current, { height: titleRef.current.offsetHeight });
        gsap.set(specsRef.current, { height: specsRef.current.offsetHeight });
        gsap.set(descRef.current, { height: descRef.current.offsetHeight });

        const inTitle = new SplitText(titleRef.current, {
          type: "chars",
          mask: "chars",
        });
        const inSpecs = new SplitText(specsRef.current, {
          type: "words",
          mask: "words",
        });
        const inDesc = new SplitText(descRef.current, {
          type: "lines",
          mask: "lines",
        });
        activeSplitsRef.current = [inTitle, inSpecs, inDesc];

        gsap.set(inTitle.chars, { yPercent: -100 });
        gsap.set(inSpecs.words, { yPercent: -100 });
        gsap.set(inDesc.lines, { yPercent: -100 });
        gsap.set(counterRef.current, { yPercent: -100, opacity: 0 });

        gsap.to(inTitle.chars, {
          yPercent: 0,
          ...ANIM_CONFIG.text.in.title,
          onComplete: () => {
            inTitle.revert();
            gsap.set(titleRef.current, { height: "auto" });
            activeSplitsRef.current = activeSplitsRef.current.filter(
              (s) => s !== inTitle,
            );
          },
        });
        gsap.to(inSpecs.words, {
          yPercent: 0,
          ...ANIM_CONFIG.text.in.specs,
          onComplete: () => {
            inSpecs.revert();
            gsap.set(specsRef.current, { height: "auto" });
            activeSplitsRef.current = activeSplitsRef.current.filter(
              (s) => s !== inSpecs,
            );
          },
        });
        gsap.to(inDesc.lines, {
          yPercent: 0,
          ...ANIM_CONFIG.text.in.desc,
          onComplete: () => {
            inDesc.revert();
            gsap.set(descRef.current, { height: "auto" });
            activeSplitsRef.current = activeSplitsRef.current.filter(
              (s) => s !== inDesc,
            );
          },
        });
        gsap.to(counterRef.current, {
          yPercent: 0,
          opacity: 1,
          ...ANIM_CONFIG.text.in.counter,
        });
      },
      [],
      ANIM_CONFIG.text.swapAt,
    );
  };

  const handleNext = () => {
    navigateTo((committedIndexRef.current + 1) % POSTERS.length);
  };

  const handlePrevious = () => {
    navigateTo(
      (committedIndexRef.current - 1 + POSTERS.length) % POSTERS.length,
    );
  };

  return (
    <section className="po-hero rounded-lg" ref={mainContainer}>
      <div className="po-hero-center relative">
        {POSTERS.map((poster, i) => (
          <img
            key={i}
            ref={(e) => (imageRefs.current[i] = e)}
            src={poster.image}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>

      <div className="po-hero-right">
        <div className="po-hero-intro" style={{ padding: "40px 28px 28px" }}>
          <p style={{ marginBottom: "14px" }}>Original Prints, 2026</p>
          <h1 style={{ marginBottom: "20px" }}>
            Poster
            <br />
            Work
          </h1>
          <p style={{ marginBottom: "22px" }}>
            Limited Drops · Hand-Crafted · Print Ready
          </p>
          <div className="po-hero-btns">
            <button style={{ padding: "9px 20px" }}>Browse All</button>
            <button style={{ padding: "9px 20px" }}>Order Info</button>
          </div>
        </div>

        <div className="po-active-info" style={{ padding: "24px 28px 32px" }}>
          <h2 ref={titleRef} style={{ marginBottom: "6px" }}>
            Burning Season
          </h2>
          <p ref={specsRef} style={{ marginBottom: "8px" }}>
            Screen print · 18×24 in · Limited to 50
          </p>
          <p ref={descRef} style={{ marginBottom: "14px" }}>
            Hand-drawn typography with layered grain textures and silk-screen
            colour blocking. Each print signed and numbered.
          </p>

          <div className="po-poster-nav" style={{ marginBottom: "10px" }}>
            <button ref={previousButtonRef} onClick={handlePrevious}>
              <img
                src="/svg/arrow-left.svg"
                className="w-[10px] h-auto object-cover"
                alt=""
              />
            </button>
            <button ref={nextButtonRef} onClick={handleNext}>
              <img
                src="/svg/arrow-right.svg"
                className="w-[10px] h-auto object-cover"
                alt=""
              />
            </button>
            <span ref={counterRef} style={{ marginLeft: "10px" }}>
              01 / 04
            </span>
          </div>

          <div className="po-poster-prog">
            {POSTERS.map((_, i) => (
              <span
                key={i}
                ref={(e) => (progTrackRefs.current[i] = e)}
                className="relative overflow-hidden flex-1 h-[1px]"
                style={{
                  backgroundColor: "var(--text-dim, rgba(255,255,255,0.25))",
                }}
              >
                <span
                  ref={(e) => (progFillRefs.current[i] = e)}
                  className="absolute inset-0 opacity-70 origin-left transform scale-x-0"
                  style={{
                    backgroundColor: "var(--accent-red, #e63030)",
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PosterHero;
