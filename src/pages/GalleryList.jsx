import { useEffect, useRef } from "react";
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
