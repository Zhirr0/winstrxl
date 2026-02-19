import { useEffect, useRef } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import gsap from "gsap";
import "../styles/list-gallery-layout.css";

const images = Array.from(
  { length: 35 },
  (_, i) => `/images35/img${i + 1}.jpg`,
);

const GalleryList = () => {
  const galleryRef = useRef(null);
  const previewsRef = useRef(null);
  const minimapRef = useRef(null);
  const indicatorRef = useRef(null);

  // ── Framer Motion scroll progress ─────────────────────────────────
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fade the indicator in/out just like the TextAnimation version does
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const el = indicatorRef.current;
    if (!el) return;
    if (latest > 0.01 && latest < 0.99) {
      gsap.to(el, {
        opacity: 1,
        duration: 0.6,
        ease: "power2",
        overwrite: "auto",
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        duration: 0.6,
        ease: "power2",
        overwrite: "auto",
      });
    }
  });

  // ── Thumbnail strip + minimap scroll handler ───────────────────────
  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* Progress bar — fixed to right center, no indices */}
      <div
        ref={indicatorRef}
        style={{ opacity: 0 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50"
      >
        {/* Track — faint white background */}
        <div className="relative w-[2px] h-40 bg-white/20 overflow-hidden rounded-full">
          {/* Fill — solid white */}
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
    </>
  );
};

export default GalleryList;
