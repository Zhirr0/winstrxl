import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import useImageParallax from "../../hooks/useImageParallax";
import { useMediaQuery } from "react-responsive";

const slides = [
  { id: 44, src: "/images/img44.webp" , position: "center center" },
  { id: 45, src: "/images/img45.webp" , position: "center center" },
  { id: 46, src: "/images/img46.webp" , position: "center center" },
  { id: 47, src: "/images/img47.webp" , position: "center center" },
  { id: 48, src: "/images/img48.webp" , position: "center center" },
  { id: 49, src: "/images/img49.webp" , position: "center center" },
  { id: 50, src: "/images/img50.webp" , position: "center center" },
  { id: 51, src: "/images/img51.webp" , position: "center center" },
];

export default function ClientSlider() {
  const stickySectionRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const slideRefs = useRef([]);

  const breakpoint = useMediaQuery({ maxWidth: 1024 });

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
                  toggleActions: "play none none reverse",
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

    const stickyHeight = window.innerHeight * slides.length * 3.2;
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
        start: "top -0.5%",
        markers: true,
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

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 1023.999px)", () => {
      const slideElements = slideRefs.current.filter(Boolean);

      slideElements.forEach((slide) => {
        const imgWrapper = slide.querySelector(".cl-img");
        if (!imgWrapper) return;

        gsap.set(imgWrapper, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        });

        gsap.to(imgWrapper, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: slide,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
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
                <img src={slide.src} style={{objectPosition: slide.position}} alt="" />
              </div>
              <div
                className="cl-title"
                style={{ margin: breakpoint ? ".5em" : "1.5em" }}
              >
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
