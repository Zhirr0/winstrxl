import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/all";

const PARALLAX_START = 70;
const PARALLAX_END = 0;

const cases = [
  {
    org: "NRG Esports",
    name: ["Jersey + Merch", "Design System"],
    chips: ["Jerseys", "Merch"],
    img: 1,
  },
  {
    org: "Cloud9",
    name: ["Valorant", "Tournament Kit"],
    chips: ["Overlays", "Branding"],
    img: 2,
  },
  {
    org: "100 Thieves",
    name: ["Social Media", "Content Kit"],
    chips: ["Social", "Templates"],
    img: 3,
  },
  {
    org: "Sentinels",
    name: ["Brand Identity", "Refresh"],
    chips: ["Identity", "Logos"],
    img: 4,
  },
  {
    org: "Team Liquid",
    name: ["Intro Screen", "+ Motion Pack"],
    chips: ["Motion", "Broadcast"],
    img: 5,
  },
  {
    org: "XSET",
    name: ["Thumbnail", "System Vol. 2"],
    chips: ["Thumbnails", "Social"],
    img: 6,
  },
  {
    org: "G2 Esports",
    name: ["Event Broadcast", "Identity Kit"],
    chips: ["Broadcast", "Branding"],
    img: 7,
  },
  {
    org: "Fnatic",
    name: ["Season Merch", "Drop Vol. 1"],
    chips: ["Merch", "Apparel"],
    img: 8,
  },
];

const MARKERS = 8;

export default function SliderCards() {
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const thumbRef = useRef(null);
  const draggableRef = useRef(null);
  const isUserScrolling = useRef(false);

  const syncThumbRef = useRef(null);

  useGSAP(() => {
    imgRefs.current.forEach((img) => {
      if (img) gsap.set(img, { objectPosition: `center ${PARALLAX_START}%` });
    });
  }, []);

  useGSAP(() => {
    cardRefs.current.forEach((card, i) => {
      const img = imgRefs.current[i];
      if (!card || !img) return;
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const pos = gsap.utils.interpolate(
            PARALLAX_START,
            PARALLAX_END,
            self.progress,
          );
          gsap.set(img, { objectPosition: `center ${pos}%` });
        },
      });
    });
  }, []);

  useGSAP(() => {
    const track = trackRef.current;
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (!track || !rail || !thumb) return;

    const getMaxX = () => rail.clientWidth - thumb.offsetWidth;

    const syncThumbToScroll = () => {
      if (!draggableRef.current) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;
      const progress = track.scrollLeft / maxScroll;
      gsap.set(thumb, { x: progress * getMaxX() });
      draggableRef.current.update();
    };

    syncThumbRef.current = syncThumbToScroll;

    const snapToNearest = () => {
      const trackRect = track.getBoundingClientRect();
      const maxScroll = track.scrollWidth - track.clientWidth;

      const snapPoints = cardRefs.current.map((card) => {
        if (!card) return 0;
        const cardRect = card.getBoundingClientRect();
        const target = track.scrollLeft + (cardRect.left - trackRect.left);
        return Math.max(0, Math.min(maxScroll, target));
      });

      const currentScroll = track.scrollLeft;
      let nearestIdx = 0;
      let minDist = Infinity;
      snapPoints.forEach((point, i) => {
        const dist = Math.abs(point - currentScroll);
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = i;
        }
      });

      const snapX = snapPoints[nearestIdx];

      if (Math.abs(snapX - currentScroll) < 1) {
        isUserScrolling.current = false;
        return;
      }

      isUserScrolling.current = true;

      gsap.to(track, {
        scrollLeft: snapX,
        duration: 1,
        ease: "expo.inOut",
        overwrite: true,
        onUpdate() {
          syncThumbRef.current?.();
        },
        onComplete() {
          isUserScrolling.current = false;
        },
      });
    };

    draggableRef.current = Draggable.create(thumb, {
      type: "x",
      bounds: rail,
      inertia: true,

      onDragStart() {
        isUserScrolling.current = true;
        gsap.killTweensOf(track, "scrollLeft");
      },

      onDrag() {
        const maxX = getMaxX();
        const progress = maxX > 0 ? Math.max(0, Math.min(1, this.x / maxX)) : 0;
        track.scrollLeft = progress * (track.scrollWidth - track.clientWidth);
      },

      onThrowUpdate() {
        const maxX = getMaxX();
        const progress = maxX > 0 ? Math.max(0, Math.min(1, this.x / maxX)) : 0;
        track.scrollLeft = progress * (track.scrollWidth - track.clientWidth);
      },

      onThrowComplete() {
        isUserScrolling.current = false;
        snapToNearest();
      },

      onDragEnd() {
        if (!this.isThrowing) {
          isUserScrolling.current = false;
          snapToNearest();
        }
      },
    })[0];

    let scrollSnapTimer = null;

    const onTrackScroll = () => {
      if (!isUserScrolling.current) syncThumbToScroll();

      if (!isUserScrolling.current) {
        clearTimeout(scrollSnapTimer);
        scrollSnapTimer = setTimeout(() => {
          snapToNearest();
        }, 120);
      }
    };
    track.addEventListener("scroll", onTrackScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => syncThumbToScroll());
    resizeObserver.observe(track);

    return () => {
      draggableRef.current?.kill();
      gsap.killTweensOf(track);
      track.removeEventListener("scroll", onTrackScroll);
      clearTimeout(scrollSnapTimer);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <div
        ref={trackRef}
        className="sc-track"
        style={{ padding: "10px", borderRadius: "10px 10px 0 0" }}
      >
        {cases.map((c, i) => (
          <div
            key={i}
            ref={(node) => (cardRefs.current[i] = node)}
            className="sc-card"
            style={{ width: "50svw" }}
          >
            <div className="sc-card-img">
              <img
                ref={(node) => (imgRefs.current[i] = node)}
                src={`/images/img${c.img}.webp`}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="sc-card-body" style={{ padding: "14px 18px" }}>
              <div className="sc-card-org">{c.org}</div>
              <div className="sc-card-name">
                {c.name[0]}
                <br />
                {c.name[1]}
              </div>
              <div className="sc-card-chips" style={{ marginTop: "3px" }}>
                {c.chips.map((chip, j) => (
                  <span
                    key={j}
                    className="sc-card-chip"
                    style={{ padding: "2px 7px" }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={railRef}
        className="relative w-full h-12 bg-dark-primary border-t border-[#1c1c1c] rounded-b-[10px] px-[1em] py-0 flex items-center justify-between overflow-hidden"
      >
        {Array.from({ length: MARKERS }).map((_, i) => (
          <div key={i} className="w-px h-full bg-[#1e1e1e] shrink-0" />
        ))}

        <div
          ref={thumbRef}
          className="absolute h-12 top-1/2 left-0 -translate-y-1/2 inline-flex items-center bg-dark-primary cursor-grab select-none will-change-transform whitespace-nowrap leading-[1.2]"
        >
          <span className="font-mono text-[10px] tracking-[2px] uppercase text-white/45 px-5 py-[9px]">
            [
            <span className="text-dark-red-primary tracking-[3px]">
              Drag
            </span>
            ]
          </span>
        </div>
      </div>
    </div>
  );
}