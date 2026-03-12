import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
const sliderData = [
  {
    title: "Echoes of Silence",
    img: "/images/img1.webp",
    url: "/posters/viewer",
  },
  { title: "Floral Circuit", img: "/images/img2.webp", url: "/posters/viewer" },
  {
    title: "Synthetic Horizon",
    img: "/images/img3.webp",
    url: "/posters/viewer",
  },
  {
    title: "Portal Sequence",
    img: "/images/img4.webp",
    url: "/posters/viewer",
  },
  { title: "Neon Fragments", img: "/images/img5.webp", url: "/posters/viewer" },
  { title: "Digital Mirage", img: "/images/img6.webp", url: "/posters/viewer" },
  { title: "Quantum Bloom", img: "/images/img7.webp", url: "/posters/viewer" },
  { title: "Crimson Pulse", img: "/images/img8.webp", url: "/posters/viewer" },
  { title: "Lunar Static", img: "/images/img9.webp", url: "/posters/viewer" },
  { title: "Velvet Noise", img: "/images/img10.webp", url: "/posters/viewer" },
  { title: "Cyber Garden", img: "/images/img11.webp", url: "/posters/viewer" },
  {
    title: "Infinite Drift",
    img: "/images/img12.webp",
    url: "/posters/viewer",
  },
  {
    title: "Phantom Layers",
    img: "/images/img13.webp",
    url: "/posters/viewer",
  },
  {
    title: "Crystal Motion",
    img: "/images/img14.webp",
    url: "/posters/viewer",
  },
  { title: "Aurora Signal", img: "/images/img15.webp", url: "/posters/viewer" },
  { title: "Digital Bloom", img: "/images/img16.webp", url: "/posters/viewer" },
  {
    title: "Midnight Frame",
    img: "/images/img17.webp",
    url: "/posters/viewer",
  },
  { title: "Neural Waves", img: "/images/img18.webp", url: "/posters/viewer" },
  { title: "Silent Matrix", img: "/images/img19.webp", url: "/posters/viewer" },
  {
    title: "Retro Spectrum",
    img: "/images/img20.webp",
    url: "/posters/viewer",
  },
  {
    title: "Glitch Horizon",
    img: "/images/img21.webp",
    url: "/posters/viewer",
  },
  {
    title: "Electric Mirage",
    img: "/images/img22.webp",
    url: "/posters/viewer",
  },
];

const CONFIG = {
  SCROLL_SPEED: 1.75,
  LERP_FACTOR: 0.05,
  MAX_VELOCITY: 150,
};

const SLIDE_WIDTH_DESKTOP = 350;
const SLIDE_WIDTH_MOBILE = 200;
const SLIDE_MARGIN = 5;

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const PosterSlider = () => {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const slidesRef = useRef([]);

  const s = useRef({
    currentX: 0,
    targetX: 0,
    lastCurrentX: 0,
    velocity: 0,
    slideWidth: SLIDE_WIDTH_DESKTOP,
    isDragging: false,
    isTouching: false, // blocks synthesized mouse events after touch
    touchId: null,
    startX: 0,
    lastX: 0,
    lastMouseX: 0,
    lastScrollTime: Date.now(),
    isMoving: false,
    dragDistance: 0,
    hasActuallyDragged: false,
    rafId: null,
  });

  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    const state = s.current;

    const getSlideWidth = () =>
      window.innerWidth < 1000 ? SLIDE_WIDTH_MOBILE : SLIDE_WIDTH_DESKTOP;

    const getMinX = () => {
      const totalWidth =
        sliderData.length * (state.slideWidth + SLIDE_MARGIN * 2);
      return -(totalWidth - slider.clientWidth);
    };

    const animate = () => {
      state.currentX += (state.targetX - state.currentX) * CONFIG.LERP_FACTOR;

      state.velocity = Math.abs(state.currentX - state.lastCurrentX);
      state.lastCurrentX = state.currentX;
      const isSlowEnough = state.velocity < 0.1;
      const hasBeenStillLongEnough = Date.now() - state.lastScrollTime > 200;
      state.isMoving =
        state.hasActuallyDragged || !isSlowEnough || !hasBeenStillLongEnough;

      slider.style.setProperty(
        "--po-slider-moving",
        state.isMoving ? "1" : "0",
      );
      track.style.transform = `translate3d(${state.currentX}px, 0, 0)`;

      const viewportCenter = window.innerWidth / 2;
      slidesRef.current.forEach((slide) => {
        if (!slide) return;
        const img = slide.querySelector("img");
        if (!img) return;
        const rect = slide.getBoundingClientRect();
        if (rect.right < -300 || rect.left > window.innerWidth + 300) return;
        const offset = (rect.left + rect.width / 2 - viewportCenter) * -0.2;
        img.style.transform = `translateX(${offset}px) scale(1.75)`;
      });

      state.rafId = requestAnimationFrame(animate);
    };

    state.slideWidth = getSlideWidth();
    state.rafId = requestAnimationFrame(animate);

    const handleWheel = (e) => {
      e.preventDefault();
      state.lastScrollTime = Date.now();
      // Prefer horizontal scroll (trackpad swipe), fall back to vertical
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      state.targetX = clamp(
        state.targetX -
          clamp(
            delta * CONFIG.SCROLL_SPEED,
            -CONFIG.MAX_VELOCITY,
            CONFIG.MAX_VELOCITY,
          ),
        getMinX(),
        0,
      );
    };

    const handleTouchStart = (e) => {
      if (state.isDragging) return;
      e.preventDefault(); // stops browser synthesizing mouse events after touch
      state.isTouching = true;
      state.isDragging = true;
      state.touchId = e.touches[0].identifier;
      state.startX = e.touches[0].clientX;
      state.lastX = state.currentX;
      state.targetX = state.currentX;
      state.dragDistance = 0;
      state.hasActuallyDragged = false;
      state.lastScrollTime = Date.now();
    };

    const handleTouchMove = (e) => {
      if (!state.isDragging) return;
      const touch = Array.from(e.touches).find(
        (t) => t.identifier === state.touchId,
      );
      if (!touch) return; // wrong finger, ignore
      const deltaX = (touch.clientX - state.startX) * 3.5;
      state.targetX = clamp(state.lastX + deltaX, getMinX(), 0);
      state.dragDistance = Math.abs(deltaX);
      if (state.dragDistance > 5) state.hasActuallyDragged = true;
      state.lastScrollTime = Date.now();
    };

    const handleTouchEnd = (e) => {
      const touch = Array.from(e.changedTouches).find(
        (t) => t.identifier === state.touchId,
      );
      if (!touch) return; // not our finger lifting
      state.isDragging = false;
      state.touchId = null;
      setTimeout(() => {
        state.isTouching = false; // small delay so synthesized mouse events get blocked
        state.hasActuallyDragged = false;
      }, 300);
    };

    const handleMouseDown = (e) => {
      if (state.isTouching) return; // ignore synthesized mouse events after touch
      e.preventDefault();
      state.isDragging = true;
      state.startX = e.clientX;
      state.lastMouseX = e.clientX;
      state.lastX = state.targetX;
      state.dragDistance = 0;
      state.hasActuallyDragged = false;
      state.lastScrollTime = Date.now();
    };

    const handleMouseMove = (e) => {
      if (state.isTouching || !state.isDragging) return;
      const deltaX = (e.clientX - state.lastMouseX) * 2;
      state.targetX = clamp(state.targetX + deltaX, getMinX(), 0);
      state.lastMouseX = e.clientX;
      state.dragDistance += Math.abs(deltaX);
      if (state.dragDistance > 5) state.hasActuallyDragged = true;
      state.lastScrollTime = Date.now();
    };

    const handleMouseUp = () => {
      state.isDragging = false;
      setTimeout(() => {
        state.hasActuallyDragged = false;
      }, 100);
    };

    const handleResize = () => {
      state.slideWidth = getSlideWidth();
      state.targetX = clamp(state.targetX, getMinX(), 0);
      state.currentX = state.targetX;
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    slider.addEventListener("touchstart", handleTouchStart, { passive: false });
    slider.addEventListener("touchmove", handleTouchMove, { passive: false });
    slider.addEventListener("touchend", handleTouchEnd);
    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseUp);
    slider.addEventListener("dragstart", (e) => e.preventDefault());

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(state.rafId);
      slider.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      SplitText.create(".header-paragraph-right", {
        type: "chars",
        onSplit(self) {
          gsap.from(self.chars, {
            yPercent: 100,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.2,
            ease: "power3.out",
            stagger: {
              amount: 0.5,
              from: "center",
            },
            scrollTrigger: {
              trigger: ".po-slider-section",
              start: "bottom bottom",
            },
          });
        },
      });
      SplitText.create(".header-paragraph-left", {
        type: "chars",
        onSplit(self) {
          gsap.from(self.chars, {
            yPercent: 100,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.2,
            ease: "power3.out",
            stagger: {
              amount: 0.1,
              from: "center",
            },
            scrollTrigger: {
              trigger: ".po-slider-section",
              start: "bottom bottom",
            },
          });
        },
      });
    });
  }, []);

  // Suppress navigation if the user was dragging
  const handleLinkClick = (e) => {
    const state = s.current;
    if (state.dragDistance >= 10 || state.hasActuallyDragged) {
      e.preventDefault();
    }
  };

  return (
    <section className="po-slider-section">
      <div
        style={{ padding: "12px 0px" }}
        className="po-slider-header font-mono text-light-primary uppercase flex flex-row justify-between items-center text-center"
      >
        <p className="header-paragraph-left">some of the posters</p>
        <p className="header-paragraph-right">n posters</p>
      </div>
      <section
        className="po-slider relativee"
        ref={sliderRef}
      >
        <div className="po-slide-track" ref={trackRef}>
          {sliderData.map((item, i) => (
            <div
              key={i}
              className="po-slide"
              ref={(el) => (slidesRef.current[i] = el)}
            >
              <Link
                to={item.url}
                state={{ img: item.img, title: item.title }}
                className="po-slide-link"
                onClick={handleLinkClick}
                draggable={false}
              >
                <div
                  className="po-slide-image overflow-hidden rounded-lg"
                  style={{ borderRadius: "10px" }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="origin-[center_20%]"
                    draggable={false}
                  />
                </div>
                <div className="po-slide-overlay">
                  <p className="po-project-title">{item.title}</p>
                  <div className="po-project-arrow">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default PosterSlider;
