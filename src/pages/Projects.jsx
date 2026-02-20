import "../styles/projects.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import Transition from "../components/Transition";
import { Link } from "react-router-dom";

const Projects = () => {
  const galleryRef = useRef(null);
  const zoomOutRef = useRef(null);
  const zoomInRef = useRef(null);
  const dragLayerRef = useRef(null);

  const gridSectionRef = useRef(null);
  const isZoomedRef = useRef(false);
  const imagesRef = useRef([]);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const initialXRef = useRef(0);
  const initialYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const preloadedImagesRef = useRef({});

  const totalRows = 20;
  const imagesPerRow = 60;
  const totalImages = totalRows * imagesPerRow;
  const totalUniqueImages = 40;

  function getRandomHeight(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  // Preload all images before mounting the gallery
  useEffect(() => {
    let loadedCount = 0;

    const imagePromises = Array.from({ length: totalUniqueImages }, (_, i) => {
      return new Promise((resolve) => {
        const img = new Image();
        const src = `/images/img${i + 1}.jpg`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalUniqueImages) * 100));
          preloadedImagesRef.current[src] = true;
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalUniqueImages) * 100));
          resolve(); 
        };
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      setTimeout(() => setIsLoaded(true), 400);
    });
  }, []);

  useGSAP(() => {
    if (!isLoaded) return;

    const gallery = galleryRef.current;
    const images = [];

    for (let i = 0; i < totalImages; i++) {
      const img = document.createElement("div");
      img.className = "img";
      img.style.height = `${getRandomHeight(30, 40)}px`;

      const imgElement = document.createElement("img");
      imgElement.src = `/images/img${Math.floor(Math.random() * totalUniqueImages) + 1}.jpg`;
      img.appendChild(imgElement);
      gallery.appendChild(img);
      images.push(img);
    }

    imagesRef.current = images;

    gsap.to(images, {
      scale: 1,
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
      stagger: {
        amount: 1.5,
        grid: [totalRows, imagesPerRow],
        from: "random",
      },
      ease: "power3.inOut",
    });

    return () => {
      images.forEach((img) => img.remove());
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const gallery = galleryRef.current;
    const dragLayer = dragLayerRef.current;
    const zoomOutButton = zoomOutRef.current;
    const zoomInButton = zoomInRef.current;
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;
    let animationFrameId;

    function getZoomOffsets(img) {
      const rect = img.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const distX = (rect.left + rect.width / 2 - centerX) / 100;
      const distY = (rect.top + rect.height / 2 - centerY) / 100;
      const x = distX * 1200;
      const y = distY * 600;

      return {
        x: isTouchDevice ? Math.round(x) : x,
        y: isTouchDevice ? Math.round(y) : y,
      };
    }

    function animate() {
      if (
        isDraggingRef.current ||
        Math.abs(targetXRef.current - currentXRef.current) > 0.01 ||
        Math.abs(targetYRef.current - currentYRef.current) > 0.01
      ) {
        currentXRef.current = lerp(currentXRef.current, targetXRef.current, 0.08);
        currentYRef.current = lerp(currentYRef.current, targetYRef.current, 0.08);

        gallery.style.transform = isTouchDevice
          ? `translate(${Math.round(currentXRef.current)}px, ${Math.round(currentYRef.current)}px)`
          : `translate3d(${currentXRef.current}px, ${currentYRef.current}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animationFrameId = requestAnimationFrame(animate);

    function handleZoomOut() {
      if (!isZoomedRef.current) return;
      isZoomedRef.current = false;
      dragLayer.style.display = "none";

      const currentTransform = window.getComputedStyle(gallery).transform;
      gsap.set(gallery, { clearProps: "transform" });

      const tl = gsap.timeline({
        defaults: { duration: 2.5, ease: "power4.inOut" },
      });
      tl.fromTo(gallery, { transform: currentTransform }, { x: 0, y: 0 }).to(
        imagesRef.current,
        { scale: 1, x: 0, y: 0, force3D: !isTouchDevice },
        0,
      );

      currentXRef.current = 0;
      currentYRef.current = 0;
      targetXRef.current = 0;
      targetYRef.current = 0;
      isDraggingRef.current = false;

      zoomOutButton.classList.add("active");
      zoomInButton.classList.remove("active");
    }

    function handleZoomIn() {
      if (isZoomedRef.current) return;
      isZoomedRef.current = true;
      dragLayer.style.display = "block";

      imagesRef.current.forEach((img) => {
        const { x, y } = getZoomOffsets(img);

        gsap.to(img, {
          x,
          y,
          scale: 5,
          duration: 2.5,
          ease: "power4.inOut",
          force3D: !isTouchDevice,
          autoRound: isTouchDevice,
        });
      });

      zoomOutButton.classList.remove("active");
      zoomInButton.classList.add("active");
    }

    function handleDragStart(e) {
      if (!isZoomedRef.current) return;
      isDraggingRef.current = true;
      dragLayer.classList.add("active");

      startXRef.current = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
      startYRef.current = e.type === "mousedown" ? e.pageY : e.touches[0].pageY;

      const matrix = new DOMMatrix(window.getComputedStyle(gallery).transform);
      initialXRef.current = matrix.m41;
      initialYRef.current = matrix.m42;
      currentXRef.current = initialXRef.current;
      currentYRef.current = initialYRef.current;
      targetXRef.current = initialXRef.current;
      targetYRef.current = initialYRef.current;

      if (e.type === "mousedown") {
        document.addEventListener("mousemove", handleDragMove, { passive: false });
        document.addEventListener("mouseup", handleDragEnd);
      } else {
        document.addEventListener("touchmove", handleDragMove, { passive: false });
        document.addEventListener("touchend", handleDragEnd);
      }
    }

    function handleDragMove(e) {
      if (!isDraggingRef.current) return;
      e.preventDefault();

      const currentPositionX = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
      const currentPositionY = e.type === "mousemove" ? e.pageY : e.touches[0].pageY;

      targetXRef.current = initialXRef.current + (currentPositionX - startXRef.current);
      targetYRef.current = initialYRef.current + (currentPositionY - startYRef.current);
    }

    function handleDragEnd() {
      isDraggingRef.current = false;
      dragLayer.classList.remove("active");
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    }

    zoomOutButton.addEventListener("click", handleZoomOut);
    zoomInButton.addEventListener("click", handleZoomIn);
    dragLayer.addEventListener("mousedown", handleDragStart);
    dragLayer.addEventListener("touchstart", handleDragStart);

    return () => {
      cancelAnimationFrame(animationFrameId);
      zoomOutButton.removeEventListener("click", handleZoomOut);
      zoomInButton.removeEventListener("click", handleZoomIn);
      dragLayer.removeEventListener("mousedown", handleDragStart);
      dragLayer.removeEventListener("touchstart", handleDragStart);
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isLoaded]);

  return (
    <main className="overflow-x-hidden">

      {!isLoaded && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <p
            style={{
              color: "#fff",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.5,
            }}
          >
            Loading
          </p>

          <div
            style={{
              width: "200px",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${loadingProgress}%`,
                backgroundColor: "#fff",
                transition: "width 0.2s ease",
              }}
            />
          </div>

          <p
            style={{
              color: "#fff",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              opacity: 0.4,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {loadingProgress}%
          </p>
        </div>
      )}

      <Link to="/projects/list">
        <button
          style={{ padding: "5px" }}
          className="fixed top-10 z-200 left-10 flex gap-[0.2em] justify-center items-center text-center text-white bg-black/25 border border-white/25 backdrop-blur-xl rounded-lg"
        >
          Toggle Layout
        </button>
      </Link>

      <section ref={gridSectionRef} className={`projects-gallery fixed`}>
        <div className="pads">
          <button ref={zoomOutRef} id="zoom-out" className="active">
            <img src="/svg/zoom-out.svg" alt="" />
          </button>
          <button ref={zoomInRef} id="zoom-in">
            <img src="/svg/zoom-in.svg" alt="" />
          </button>
        </div>
        <div ref={dragLayerRef} id="drag-layer" />
        <div className="gallery-container" />
        <div ref={galleryRef} className="gallery" />
      </section>
    </main>
  );
};

export default Transition(Projects);