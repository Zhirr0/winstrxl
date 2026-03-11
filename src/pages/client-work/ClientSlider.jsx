import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import useImageParallax from "../../hooks/useImageParallax";

const slides = [
  { id: 1, src: "/images/img1.webp" },
  { id: 2, src: "/images/img2.webp" },
  { id: 3, src: "/images/img3.webp" },
  { id: 4, src: "/images/img4.webp" },
  { id: 5, src: "/images/img5.webp" },
];

export default function ClientSlider() {
  const stickySectionRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const slideRefs = useRef([]);

  // custom hook
  useImageParallax(slideRefs, ".cl-img img", "(max-width: 1023.999px)");

  // text animation on screens less than 1024px
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 1023.999px)", () => {
      document.fonts.ready.then(() => {
        slideRefs.current.filter(Boolean).forEach((slide) => {
          const title = slide.querySelector(".cl-title h1");
          if (!title) return;

          SplitText.create(title, {
            type: "chars",
            mask: "chars",
            onSplit(self) {
              gsap.from(self.chars, {
                duration: 1,
                ease: "power3.out",
                yPercent: 100,
                rotateY: 90,
                stagger: 0.025,
                scrollTrigger: {
                  trigger: slide,
                  start: "top center",
                  markers: true,
                  toggleActions: "play none none reverse"
                },
              });
            },
          });
        });
      });
    });
  }, []);

  // pin section + desktop horizontal parallax on screens more than 1024px
  useGSAP(() => {
    const stickySection = stickySectionRef.current;
    const slidesContainer = slidesContainerRef.current;
    const slider = sliderRef.current;
    const slideElements = slideRefs.current;

    const stickyHeight = window.innerHeight * 16;
    const totalMove = slidesContainer.offsetWidth - slider.offsetWidth;
    const slideWidth = slider.offsetWidth;

    const splitMap = new Map();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      slideElements.forEach((s) => {
        const title = s.querySelector(".cl-title h1");
        const split = SplitText.create(title, { type: "chars", mask: "chars" });
        splitMap.set(s, split);
        gsap.set(split.chars, { yPercent: 100, rotateY: 90 });
      });

      let currentVisibleIndex = null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const currentIndex = slideElements.indexOf(e.target);

            if (e.intersectionRatio >= 0.25) {
              currentVisibleIndex = currentIndex;
              slideElements.forEach((s, i) => {
                const split = splitMap.get(s);
                gsap.to(split.chars, {
                  yPercent: i === currentIndex ? 0 : 100,
                  rotateY: i === currentIndex ? 0 : 90,
                  duration: 1,
                  ease: "power3.out",
                  stagger: 0.025,
                  overwrite: true,
                });
              });
            } else if (
              e.intersectionRatio < 0.25 &&
              currentVisibleIndex === currentIndex
            ) {
              const prevIndex = currentIndex - 1;
              currentVisibleIndex = prevIndex >= 0 ? prevIndex : null;

              slideElements.forEach((s, i) => {
                const split = splitMap.get(s);
                gsap.to(split.chars, {
                  yPercent: i === prevIndex ? 0 : 100,
                  rotateY: i === prevIndex ? 0 : 90,
                  duration: 1,
                  ease: "power3.out",
                  stagger: 0.05,
                  overwrite: true,
                });
              });
            }
          });
        },
        {
          root: slider,
          threshold: [0, 0.25],
        },
      );

      slideElements.forEach((s) => observer.observe(s));

      ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: `+=${stickyHeight}px`,
        pin: true,
        pinSpacing: true,
        onUpdate(self) {
          const progress = self.progress;
          const mainMove = progress * totalMove;

          gsap.set(slidesContainer, { x: -mainMove });

          const currentSlide = Math.floor(mainMove / slideWidth);
          const sliderProgress = (mainMove % slideWidth) / slideWidth;

          slideElements.forEach((slide, index) => {
            const image = slide.querySelector("img");
            if (image) {
              if (index === currentSlide || index === currentSlide + 1) {
                const relativeProgress =
                  index === currentSlide ? sliderProgress : sliderProgress - 1;
                const parallaxAmount = relativeProgress * slideWidth * 0.25;
                gsap.set(image, { x: parallaxAmount, scale: 1 });
              } else {
                gsap.set(image, { x: 0, scale: 1 });
              }
            }
          });
        },
      });

      return () => observer.disconnect();
    });
  }, []);

  return (
    <section className="cl-sticky" ref={stickySectionRef}>
      <div className="cl-slider" ref={sliderRef}>
        <div className="cl-slides" ref={slidesContainerRef}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="cl-slide"
              ref={(el) => (slideRefs.current[index] = el)}
            >
              <div className="cl-img">
                <img src={slide.src} alt="" />
              </div>
              <div className="cl-title" style={{ margin: "1.5em" }}>
                <h1>
                  Title Line 1 <br />
                  Title Line 2
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
