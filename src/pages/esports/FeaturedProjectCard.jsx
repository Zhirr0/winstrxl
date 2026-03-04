import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const PARALLAX_START = 50;
const PARALLAX_END = 0;

export default function FeaturedProjectCards() {
  const breakpoint = useMediaQuery({ maxWidth: 768 });
  const mainImgRef = useRef(null);
  const mainCardRef = useRef(null);
  const asideCardsRef = useRef([]);

  // setting the initial states
  useGSAP(() => {
    gsap.set(mainImgRef.current, {
      objectPosition: `center ${PARALLAX_START}%`,
    });

    asideCardsRef.current.forEach((card) => {
      if (card)
        gsap.set(card, { backgroundPosition: `center ${PARALLAX_START}%` });
    });
  }, []);

  // parallax effect
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: mainCardRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const pos = gsap.utils.interpolate(
            PARALLAX_START,
            PARALLAX_END,
            self.progress,
          );
          gsap.set(mainImgRef.current, { objectPosition: `center ${pos}%` });
        },
      });

      asideCardsRef.current.forEach((card) => {
        if (!card) return;

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
            gsap.set(card, { backgroundPosition: `center ${pos}%` });
          },
        });
      });
    });
  }, []);

  // text appearing on hover
  useGSAP(() => {
    document.fonts.ready.then(() => {
      // main card split
      const titleSplit = SplitText.create(
        mainCardRef.current.querySelector(".es-feat-title"),
        { type: "chars", mask: "chars" },
      );
      const subSplit = SplitText.create(
        mainCardRef.current.querySelector(".es-feat-sub"),
        { type: "words", mask: "words" },
      );

      gsap.set(titleSplit.chars, { yPercent: 100, rotateY: 180 });
      gsap.set(subSplit.words, { yPercent: 100, rotateY: 180 });

      mainCardRef.current.addEventListener("mouseenter", () => {
        gsap.killTweensOf([
          titleSplit.chars,
          subSplit.words,
          mainImgRef.current,
        ]);

        gsap.to(mainImgRef.current, {
          scale: 1.06,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(titleSplit.chars, {
          yPercent: 0,
          rotateY: 0,
          duration: 2,
          stagger: 0.01,
          ease: "power3.out",
        });

        gsap.to(subSplit.words, {
          yPercent: 0,
          rotateY: 0,
          duration: 2,
          stagger: 0.025,
          ease: "power3.out",
        });
      });

      mainCardRef.current.addEventListener("mouseleave", () => {
        gsap.killTweensOf([
          titleSplit.chars,
          subSplit.words,
          mainImgRef.current,
        ]);

        gsap.to(mainImgRef.current, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(titleSplit.chars, {
          yPercent: 100,
          rotateY: 180,
          duration: 2,
          stagger: 0.01,
          ease: "power3.out",
        });

        gsap.to(subSplit.words, {
          yPercent: 100,
          rotateY: 180,
          duration: 2,
          stagger: 0.025,
          ease: "power3.out",
        });
      });

      // aside card split
      asideCardsRef.current.forEach((card) => {
        if (!card) return;

        const nameSplit = SplitText.create(card.querySelector(".es-ai-name"), {
          type: "words",
          mask: "words",
        });

        const chipsSplit = SplitText.create(card.querySelectorAll(".es-chip"), {
          type: "chars",
          mask: "chars",
        });

        gsap.set(nameSplit.words, { yPercent: 100, rotateY: 180 });
        gsap.set(chipsSplit.chars, { yPercent: 100, rotateY: 180 });

        const chipElements = card.querySelectorAll(".es-chip");
        gsap.set(chipElements, { borderColor: "transparent" });
        gsap.set(card, { backgroundSize: "100%" });

        card.addEventListener("mouseenter", () => {
          gsap.killTweensOf([
            nameSplit.words,
            chipsSplit.chars,
            chipElements,
            card,
          ]);

          gsap.to(card, {
            backgroundSize: "108%",
            duration: 0.8,
            ease: "power2.out",
          });

          gsap.to(nameSplit.words, {
            yPercent: 0,
            rotateY: 0,
            duration: 2,
            stagger: 0.025,
            ease: "power3.out",
          });

          gsap.to(chipsSplit.chars, {
            yPercent: 0,
            rotateY: 0,
            duration: 2,
            stagger: 0.01,
            ease: "power3.out",
          });

          gsap.to(chipElements, {
            borderColor: "#282828",
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.killTweensOf([
            nameSplit.words,
            chipsSplit.chars,
            chipElements,
            card,
          ]);

          gsap.to(card, {
            backgroundSize: "100%",
            duration: 0.8,
            ease: "power2.out",
          });

          gsap.to(nameSplit.words, {
            yPercent: 100,
            rotateY: 180,
            duration: 2,
            stagger: 0.025,
            ease: "power3.out",
          });

          gsap.to(chipsSplit.chars, {
            yPercent: 100,
            rotateY: 180,
            duration: 2,
            stagger: 0.01,
            ease: "power3.out",
          });

          gsap.to(chipElements, {
            borderColor: "transparent",
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.in",
          });
        });
      });
    });
  }, []);

  return (
    <div className="es-feat">
      <div
        ref={mainCardRef}
        style={{ padding: breakpoint ? "8px 12px" : "" }}
        className="es-feat-img rounded-lg overflow-hidden"
      >
        <img
          ref={mainImgRef}
          src="/images/img1.webp"
          className="w-full h-full object-cover"
          alt=""
        />
        <div style={{ padding: "28px 24px" }} className="es-feat-over">
          <div className="es-feat-title">FaZe Clan Rebrand Kit</div>
          <div className="es-feat-sub">
            Full visual identity · Jersey system · Social templates · Stream
            overlays
          </div>
        </div>
      </div>

      <div className="es-feat-aside">
        {/* Item 1 */}
        <div
          ref={(node) => (asideCardsRef.current[0] = node)}
          style={{
            margin: "0px 12px 8px 12px",
            backgroundImage: "url('/images/img2.webp')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="es-aside-item relative rounded-lg overflow-hidden"
        >
          <div className="es-cards-text absolute bottom-3 left-3">
            <div className="es-ai-name">Jersey + Merch Design System</div>
            <div className="es-ai-chips">
              <span style={{ padding: "3px 9px" }} className="es-chip">
                Jerseys
              </span>
              <span style={{ padding: "3px 9px" }} className="es-chip">
                Merch
              </span>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div
          ref={(node) => (asideCardsRef.current[1] = node)}
          style={{
            margin: "8px 12px",
            backgroundImage: "url('/images/img5.webp')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="es-aside-item relative rounded-lg overflow-hidden"
        >
          <div className="es-cards-text absolute bottom-3 left-3">
            <div className="es-ai-name">Valorant Tournament Kit</div>
            <div className="es-ai-chips">
              <span style={{ padding: "3px 9px" }} className="es-chip">
                Overlays
              </span>
              <span style={{ padding: "3px 9px" }} className="es-chip">
                Branding
              </span>
            </div>
          </div>
        </div>

        {/* Item 3 */}
        <div
          ref={(node) => (asideCardsRef.current[2] = node)}
          style={{
            margin: "8px 12px 0px 12px",
            backgroundImage: "url('/images/img3.webp')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="es-aside-item relative rounded-lg overflow-hidden"
        >
          <div className="es-cards-text absolute bottom-3 left-3">
            <div className="es-ai-name">Social Content Kit Vol.2</div>
            <div className="es-ai-chips">
              <span style={{ padding: "3px 9px" }} className="es-chip">
                Social
              </span>
              <span style={{ padding: "3px 9px" }} className="es-chip">
                Templates
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
