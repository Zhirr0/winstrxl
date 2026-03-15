import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

const SPLIT_CONFIG = (staggerAmount) => ({
  type: "chars",
  mask: "chars",
  onSplit({ chars }) {
    gsap.from(chars, {
      yPercent: 100,
      rotateY: 90,
      duration: 2,
      ease: "power3.out",
      stagger: { from: "start", amount: staggerAmount },
    });
  },
});

export default function ClientHero() {
  const bgLetterRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      SplitText.create(bgLetterRef.current, SPLIT_CONFIG(0.2));
      SplitText.create(headerRef.current, SPLIT_CONFIG(0.5));
    });
  }, []);

  return (
    <section className="cl-hero">
      <h1 ref={bgLetterRef}>
        DW
      </h1>
      <h3 ref={headerRef}>
        DESIGN
        <br />
        WORKS
      </h3>
    </section>
  );
}
