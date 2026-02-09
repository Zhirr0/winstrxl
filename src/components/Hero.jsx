import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = () => {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Split the text
      const split = new SplitText(".hero-header", {
        type: "lines",
        mask: "lines",
      });
      const paraSplit = SplitText.create(".hero-paragraph", {
        type: "lines",
        mask: "lines",
      });
      const scrollSplit = SplitText.create(".hero-scroll-text", {
        type: "chars",
        mask: "chars",
      });

      gsap.from(paraSplit.lines, {
        xPercent: -100,
        duration: 1,
        ease: "power2",
      });

      // Animate the chars
      gsap.from(split.lines, {
        yPercent: 100,
        ease: "power2",
        duration: 1,
        delay: 0.3,
        stagger: 0.05, // Stagger each character
      });

      gsap.from(scrollSplit.chars, {
        yPercent: 100,
        ease: "power3.out",
        duration: 1,
        delay: 0.3,
        stagger: 0.05,
      });
    });
  }, []);

  const isSmall = useMediaQuery({ maxWidth: 768 });

  return (
    <section className="hero">
      <div className="bg-image"></div>
      <div className="hero-text-block">
        <div className="hero-paragraph">
          <p>exploration of paragraph</p>
        </div>

        <div className="hero-header">
          <h1>
            this is
            <br />
            the
            <br />
            header
          </h1>
        </div>
      </div>
      <h3 className="hero-scroll-text">{isSmall ? "SCROLL" : "SCROLL DOWN"}</h3>
    </section>
  );
};

export default Hero;
