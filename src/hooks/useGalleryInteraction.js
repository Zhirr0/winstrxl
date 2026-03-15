import gsap from "gsap";
import { useEffect } from "react";
import { lerp, getZoomOffsets } from "../utils/projectsGallery.helper";
import { LERP_FACTOR } from "../config/projects.config";

/* Wires up the zoom in, zoom out, and drag interactions for the gallery.
   Drag position is smoothed each frame via a lerp animation loop.
   All event listeners and the animation frame are cleaned up on unmount */
export function useGalleryInteraction(
  galleryRef,
  dragLayerRef,
  zoomOutRef,
  zoomInRef,
  imagesRef,
  isZoomedRef,
  isDraggingRef,
  startXRef,
  startYRef,
  initialXRef,
  initialYRef,
  targetXRef,
  targetYRef,
  currentXRef,
  currentYRef,
) {
  useEffect(() => {
    const gallery = galleryRef.current;
    const dragLayer = dragLayerRef.current;
    const zoomOutButton = zoomOutRef.current;
    const zoomInButton = zoomInRef.current;
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;
    let animationFrameId;

    /* Runs every frame and applies the lerped position to the gallery
       so movement feels smooth rather than snapping to the target */
    function animate() {
      if (
        isDraggingRef.current ||
        Math.abs(targetXRef.current - currentXRef.current) > 0.01 ||
        Math.abs(targetYRef.current - currentYRef.current) > 0.01
      ) {
        currentXRef.current = lerp(
          currentXRef.current,
          targetXRef.current,
          LERP_FACTOR,
        );
        currentYRef.current = lerp(
          currentYRef.current,
          targetYRef.current,
          LERP_FACTOR,
        );

        gallery.style.transform = isTouchDevice
          ? `translate(${Math.round(currentXRef.current)}px, ${Math.round(currentYRef.current)}px)`
          : `translate3d(${currentXRef.current}px, ${currentYRef.current}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animationFrameId = requestAnimationFrame(animate);

    /* Collapses the zoomed images back to their original scale and
       resets all position refs and button states */
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

    /* Fans each image outward from the viewport center at scale 5
       and enables the drag layer so the user can pan around */
    function handleZoomIn() {
      if (isZoomedRef.current) return;
      isZoomedRef.current = true;
      dragLayer.style.display = "block";

      imagesRef.current.forEach((img) => {
        const { x, y } = getZoomOffsets(img, isTouchDevice);
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

    /* Records the pointer start position and the gallery transform at
       the moment the drag begins, then attaches the move and end listeners */
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
        document.addEventListener("mousemove", handleDragMove, {
          passive: false,
        });
        document.addEventListener("mouseup", handleDragEnd);
      } else {
        document.addEventListener("touchmove", handleDragMove, {
          passive: false,
        });
        document.addEventListener("touchend", handleDragEnd);
      }
    }

    /* Updates the target position each frame based on how far the pointer
       has moved from where the drag started */
    function handleDragMove(e) {
      if (!isDraggingRef.current) return;
      e.preventDefault();

      const currentPositionX =
        e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
      const currentPositionY =
        e.type === "mousemove" ? e.pageY : e.touches[0].pageY;

      targetXRef.current =
        initialXRef.current + (currentPositionX - startXRef.current);
      targetYRef.current =
        initialYRef.current + (currentPositionY - startYRef.current);
    }

    /* Marks the drag as finished and removes all move and end listeners */
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
  }, []);
}
