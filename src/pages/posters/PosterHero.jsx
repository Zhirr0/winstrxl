import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const PARALLAX_START = 0;
const PARALLAX_END = 20;

const PosterHero = () => {
  const nextButtonRef = useRef(null);
  const previousButtonRef = useRef(null);
  const imageRef = useRef(null);
  const mainContainer = useRef(null);

  // setting the initial states
  useGSAP(() => {
    gsap.set(imageRef.current, {
      objectPosition: `center ${PARALLAX_START}%`,
    });
  }, []);

  // parallax effect
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: mainContainer.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const progress = self.progress
        const pos = gsap.utils.interpolate(
          PARALLAX_START,
          PARALLAX_END,
          progress,
        );
        gsap.set(imageRef.current, { objectPosition: `center ${pos}%` });
      },
    });
  }, []);


  useGSAP(() => {
    
  }, [])
  
  return (
    <section className="po-hero rounded-lg" ref={mainContainer}>
      <div className="po-hero-center relative">
        <img
          ref={imageRef}
          src="/images/img1.webp"
          className="absolute inset-0 w-full h-full object-cover"
        />
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
          <h2 style={{ marginBottom: "6px" }}>Burning Season</h2>
          <p style={{ marginBottom: "8px" }}>
            Screen print · 18×24 in · Limited to 50
          </p>
          <p style={{ marginBottom: "14px" }}>
            Hand-drawn typography with layered grain textures and silk-screen
            colour blocking. Each print signed and numbered.
          </p>
          <div className="po-poster-nav" style={{ marginBottom: "10px" }}>
            <button ref={previousButtonRef}>←</button>
            <button ref={nextButtonRef}>→</button>

            <span style={{ marginLeft: "10px" }}>01 / 04</span>
          </div>
          <div className="po-poster-prog">
            <span />
            <span />
            <span className="active" />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PosterHero;
