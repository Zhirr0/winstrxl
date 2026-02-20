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

const images = Array.from(
  { length: 40 },
  (_, i) => `/imagesHigh/img${i + 1}.jpg`,
);

const GalleryList = () => {
  const galleryRef = useRef(null);
  const previewsRef = useRef(null);
  const minimapRef = useRef(null);
  const indicatorRef = useRef(null);
  const loaderRef = useRef(null);

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
    if (latest > 0.01 && latest < 0.99) {
      gsap.to(element, {
        opacity: 1,
        duration: 0.6,
        ease: "power2",
        overwrite: "auto",
      });
    } else {
      gsap.to(element, {
        opacity: 0,
        duration: 0.6,
        ease: "power2",
        overwrite: "auto",
      });
    }
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
        // Small delay so the user sees 100% before exit
        setTimeout(() => {
          const loader = loaderRef.current;
          if (!loader) return;

          gsap.to(loader, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power3.out",
            onComplete: () => setIsLoaderDone(true),
          });
        }, 500);
      }
    };

    // Create hidden Image objects to track load state
    images.forEach((src) => {
      const img = new Image();
      img.onload = onImageLoad;
      img.onerror = onImageLoad; // count errors too so we never get stuck
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
          ? Math.max(0.8, Math.min(2.0, effectiveTravel / rawDenominator))
          : 1.1;

      const galleryTranslateY = -scrollFraction * rawDenominator * galleryMult;
      gsap.to(gallery, { y: galleryTranslateY, ease: "none", duration: 0.1 });

      if (minimap && getComputedStyle(minimap).display !== "none") {
        const minimapTravel = visibleWindow - minimap.offsetHeight;
        const minimapTranslateY = scrollFraction * minimapTravel;
        gsap.to(minimap, { y: minimapTranslateY, ease: "none", duration: 0.1 });
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
          className="fixed inset-0 z-10 flex items-center justify-center bg-[#faeeda]"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <div className="text-center text-[#202020] font-mono">
            <div className="text-[clamp(3rem,10vw,7rem)] font-semibold leading-none tracking-tight overflow-hidden">
              {String(loadProgress).padStart(3, "0")}
            </div>
            <div className="mt-4 text-xs opacity-40 tracking-[0.2em]">
              LOADING
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
    </section>
  );
};

export default Transition(GalleryList);
