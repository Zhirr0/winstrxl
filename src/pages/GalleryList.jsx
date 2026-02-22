import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import gsap from "gsap";
import "../styles/list-gallery-layout.css";
import Transition from "../components/Transition";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const images = Array.from(
  { length: 40 },
  (_, i) => `/imagesHigh/img${i + 1}.jpg`,
);

const GALLERY_CONFIG = {
  // Gallery scroll speed relative to page scroll.
  // Raise speedMax if the last images are unreachable.
  // Lower speedMax if the gallery flies past too fast.
  speedMin: 0.8,
  speedMax: 2,
  speedFallback: 1.1, // used when calculation falls outside min/max

  // Loader
  loaderExitDelay: 500,       // ms to show 100% before the loader exits
  loaderExitDuration: 1.5,    // seconds for the clip-path exit animation

  // Scroll indicator (the thin bar on the right)
  indicatorFadeIn: 0.6,       // seconds
  indicatorShowAfter: 0.01,   // scrollYProgress threshold to show it
  indicatorHideBefore: 0.99,  // scrollYProgress threshold to hide it

  // Minimap
  minimapScrollDuration: 0.1, // seconds — how smoothly minimap follows scroll

  // Counter
  counterHideBreakpoint: 600, // hides counter on screens narrower than this (px)

  // Gallery panel
  galleryScrollDuration: 0.1, // seconds — how smoothly gallery panel follows scroll
};

const GalleryList = () => {
  const galleryRef = useRef(null);
  const previewsRef = useRef(null);
  const minimapRef = useRef(null);
  const indicatorRef = useRef(null);
  const loaderRef = useRef(null);
  const counterRef = useRef(null);

  const breakpoint = useMediaQuery({ maxWidth: 850 });
  const secondBreakpoint = useMediaQuery({ maxWidth: GALLERY_CONFIG.counterHideBreakpoint });
  const thirdBreakpoint = useMediaQuery({ maxWidth: 768 });

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaderDone, setIsLoaderDone] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const element = indicatorRef.current;
    if (!element) return;
    const visible =
      latest > GALLERY_CONFIG.indicatorShowAfter &&
      latest < GALLERY_CONFIG.indicatorHideBefore;
    gsap.to(element, {
      opacity: visible ? 1 : 0,
      duration: GALLERY_CONFIG.indicatorFadeIn,
      ease: "power2",
      overwrite: "auto",
    });
  });

  // Preloader — track real image loading
  useEffect(() => {
    let loaded = 0;
    const total = images.length;

    const onImageLoad = () => {
      loaded += 1;
      const progress = Math.round((loaded / total) * 100);
      setLoadProgress(progress);

      if (loaded === total) {
        setTimeout(() => {
          const loader = loaderRef.current;
          if (!loader) return;

          gsap.to(loader, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: GALLERY_CONFIG.loaderExitDuration,
            ease: "power3.out",
            onComplete: () => setIsLoaderDone(true),
          });
        }, GALLERY_CONFIG.loaderExitDelay);
      }
    };

    images.forEach((src) => {
      const img = new Image();
      img.onload = onImageLoad;
      img.onerror = onImageLoad;
      img.src = src;
    });
  }, []);

  // Scroll logic — only starts after loader is gone
  useEffect(() => {
    if (!isLoaderDone) return;

    const gallery = galleryRef.current;
    const imgPreviews = previewsRef.current;
    const minimap = minimapRef.current;

    if (!gallery || !imgPreviews) return;

    function handleScroll() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const imgPreviewsHeight = imgPreviews.scrollHeight;
      const galleryHeight = gallery.scrollHeight;

      const galleryTopPx = parseFloat(getComputedStyle(gallery).top);
      const topFraction = galleryTopPx / windowHeight;

      const scrollRange = imgPreviewsHeight - windowHeight;
      const scrollFraction = scrollRange > 0 ? scrollY / scrollRange : 0;

      const visibleWindow = windowHeight * (1 - topFraction);
      const effectiveTravel = galleryHeight - visibleWindow;
      const rawDenominator = galleryHeight - windowHeight;

      const galleryMult =
        rawDenominator > 0
          ? Math.max(
              GALLERY_CONFIG.speedMin,
              Math.min(GALLERY_CONFIG.speedMax, effectiveTravel / rawDenominator),
            )
          : GALLERY_CONFIG.speedFallback;

      const galleryTranslateY = -scrollFraction * rawDenominator * galleryMult;
      gsap.to(gallery, {
        y: galleryTranslateY,
        ease: "none",
        duration: GALLERY_CONFIG.galleryScrollDuration,
      });

      if (minimap && getComputedStyle(minimap).display !== "none") {
        const minimapTravel = visibleWindow - minimap.offsetHeight;
        const minimapTranslateY = scrollFraction * minimapTravel;

        gsap.to(minimap, {
          y: minimapTranslateY,
          ease: "none",
          duration: GALLERY_CONFIG.minimapScrollDuration,
        });

        if (counterRef.current) {
          gsap.to(counterRef.current, {
            y: minimapTranslateY,
            ease: "none",
            duration: GALLERY_CONFIG.minimapScrollDuration,
          });
        }
      }

      if (counterRef.current) {
        const previewImages = previewsRef.current?.querySelectorAll("img");
        let currentIndex = 1;

        if (previewImages) {
          previewImages.forEach((img, i) => {
            if (img.offsetTop <= scrollY + 1) {
              currentIndex = i + 1;
            }
          });
        }

        // snap to last image when fully scrolled to the bottom
        const atBottom =
          window.innerHeight + scrollY >=
          document.documentElement.scrollHeight - 2;
        if (atBottom) currentIndex = images.length;

        counterRef.current.querySelector(".counter-current").textContent =
          String(currentIndex).padStart(2, "0");
      }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isLoaderDone]);

  return (
    <section className="overflow-x-hidden">
      {/* Preloader */}
      {!isLoaderDone && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-200 flex items-center justify-center bg-light-primary"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <div className="text-center text-dark-red-primary font-mono">
            <div className="text-[clamp(3rem,10vw,7rem)] font-semibold leading-none tracking-tight overflow-hidden">
              {String(loadProgress).padStart(3, "0")}
              <span>%</span>
            </div>
            <div className="mt-4 text-xs opacity-40 tracking-[0.2em]">
              LOADING...
              <br />
              THE IMAGES ARE HIGH QUALITY
              <br />
              WAIT A LITTLE
            </div>
          </div>
        </div>
      )}

      <Link to="/projects">
        <button
          style={{ padding: "5px" }}
          className="fixed top-10 z-200 left-10 flex gap-[0.2em] justify-center items-center text-center text-white bg-black/25 border border-white/25 backdrop-blur-xl rounded-lg"
        >
          Toggle Layout
        </button>
      </Link>

      <div
        ref={indicatorRef}
        style={{ opacity: 0 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-1"
      >
        <div className="relative w-[2px] h-40 bg-white/20 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-white origin-top rounded-full"
            style={{ scaleY: smoothProgress }}
          />
        </div>
      </div>

      <div className="gallery-wrapper">
        <div className="gallery-for-images" ref={galleryRef}>
          {images.map((src, i) => (
            <div className="images-wrapper" key={i}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="img-previews-list" ref={previewsRef}>
        {images.map((src, i) => (
          <img src={src} alt="" key={i} />
        ))}
      </div>

      <div className="minimap" ref={minimapRef} />
      <div
        ref={counterRef}
        className="fixed z-1 font-mono text-white/60 text-xs tracking-widest leading-none"
        style={{
          left: breakpoint
            ? "clamp(calc(4rem + 8px + 12px),15vw,calc(16.5rem + 8px + 12px))"
            : "clamp(calc(4rem + 8px + 12px),20vw,calc(16.5rem + 8px + 12px))",
          top: thirdBreakpoint ? "21%" : breakpoint ? "27%" : "35%",
          transform: "translateY(-50%)",
          display: secondBreakpoint ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3px",
        }}
      >
        <span className="counter-current">01</span>
        <span style={{ opacity: 0.8 }}>
          <hr className="h-px w-[15px] opacity-50" />
        </span>
        <span style={{ opacity: 0.4 }}>
          {String(images.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
};

export default Transition(GalleryList);