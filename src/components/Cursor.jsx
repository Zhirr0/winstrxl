import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { SplitText } from "gsap/SplitText";
import { useMediaQuery } from "react-responsive";
gsap.registerPlugin(Observer, SplitText);

const size = 40;

const Cursor = () => {
  const cursorRef = useRef(null);
  const velocityDataRef = useRef({ rotation: 0, scaleX: 1, scaleY: 1 });
  const lastMoveTimeRef = useRef(null);
  const resetTimeoutRef = useRef(null);
  const inactivityIntervalRef = useRef(null);
  const isFrozenRef = useRef(false);
  const viewProjectHeaderRef = useRef(null);
  const cursorArrowRef = useRef(null);
  const isNotAllowed = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    if (isNotAllowed) return;
    lastMoveTimeRef.current = Date.now();
    const cursor = cursorRef.current;
    const links = document.querySelectorAll(
      ".bottom-wave-svg, .text-animation-header, .nav-left-header, .zhir-svg",
    );

    let lastX = null;
    let lastY = null;
    let rafId = null;
    let pendingCheck = false;
    let isDragging = false;
    let splitChars = null;

    const setupSplit = () => {
      if (!viewProjectHeaderRef.current) return;

      gsap.set(viewProjectHeaderRef.current, { visibility: "visible" });

      const split = SplitText.create(viewProjectHeaderRef.current, {
        type: "chars",
        mask: "chars",
      });

      splitChars = split.chars;

      // Hide all chars below their mask initially
      gsap.set(splitChars, { yPercent: 110, skewX: 90, display: "none" });

      // Hide the arrow too
      gsap.set(cursorArrowRef.current, {
        opacity: 0,
        x: -100,
        display: "none",
      });
    };

    document.fonts.ready.then(setupSplit);

    const resetScalesToNormal = () => {
      gsap.to(cursor, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.5,
        overwrite: "auto",
        ease: "power2.out",
      });
    };

    const checkInactivity = () => {
      const now = Date.now();
      const timeSinceLastMove = now - lastMoveTimeRef.current;
      if (timeSinceLastMove > 150) {
        resetScalesToNormal();
      }
    };

    inactivityIntervalRef.current = setInterval(checkInactivity, 50);

    // Freeze / Unfreeze
    const onCursorFreeze = () => {
      gsap.killTweensOf(cursor);
      gsap.killTweensOf(splitChars);
      isFrozenRef.current = true;

      // Expand the cursor into a pill
      gsap.to(cursor, {
        scaleX: 1,
        scaleY: 1,
        width: "200px",
        height: "50px",
        rotation: 0,
        duration: 1,
        ease: "power3.out",
        overwrite: "auto",
      });

      // Animate chars up into view
      if (splitChars) {
        gsap.to(splitChars, {
          yPercent: 0,
          duration: 0.5,
          display: "block",
          ease: "power3.out",
          stagger: 0.025,
          skewX: 0,
          overwrite: "auto",
        });
      }

      // Slide arrow in
      gsap.to(cursorArrowRef.current, {
        opacity: 1,
        x: 0,
        display: "block",
        duration: 0.4,
        delay: 0.15,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onCursorUnfreeze = () => {
      gsap.killTweensOf(cursor);
      gsap.killTweensOf(splitChars);
      isFrozenRef.current = false;

      // Shrink back to circle
      gsap.to(cursor, {
        width: size,
        height: size,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });

      // Animate chars back down out of mask
      if (splitChars) {
        gsap.set(splitChars, {
          yPercent: 110,
          overwrite: "auto",
          display: "none",
        });
      }

      // Hide arrow
      gsap.set(cursorArrowRef.current, {
        opacity: 0,
        x: -100,
        display: "none",
        overwrite: "auto",
      });
    };

    window.addEventListener("cursorFreeze", onCursorFreeze);
    window.addEventListener("cursorUnfreeze", onCursorUnfreeze);

    // --- Observer for velocity-based animation ---
    const observer = Observer.create({
      type: "pointer",
      tolerance: 1,
      onMove: (self) => {
        if (isFrozenRef.current) return;

        lastMoveTimeRef.current = Date.now();

        if (resetTimeoutRef.current) {
          clearTimeout(resetTimeoutRef.current);
        }

        const deltaX = self.deltaX;
        const deltaY = self.deltaY;
        const velocityX = self.velocityX;
        const velocityY = self.velocityY;

        const velocity = Math.sqrt(
          velocityX * velocityX + velocityY * velocityY,
        );

        const normalizedVelocity = Math.min(Math.pow(velocity / 5000, 0.85), 1);

        let rotation = 0;
        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
          rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        }

        const velocityFactor = normalizedVelocity;
        const scaleX = 1 + 0.55 * velocityFactor;
        const scaleY = 1 - 0.55 * velocityFactor;

        const finalScaleX = Math.max(1, scaleX);
        const finalScaleY = Math.min(1, Math.max(0.45, scaleY));

        velocityDataRef.current = {
          rotation,
          scaleX: finalScaleX,
          scaleY: finalScaleY,
        };

        if (normalizedVelocity > 0.05) {
          gsap.to(cursor, {
            rotation,
            duration: 0.001,
            ease: "none",
            overwrite: "auto",
          });

          gsap.to(cursor, {
            scaleX: finalScaleX,
            scaleY: finalScaleY,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });

          resetTimeoutRef.current = setTimeout(checkInactivity, 150);
        } else {
          resetScalesToNormal();
        }
      },
    });

    const onMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTimeRef.current = Date.now();

      gsap.to(cursor, {
        x: e.clientX - size / 2,
        y: e.clientY - size / 2,
        duration: 0.7,
        ease: "back",
      });

      if (!isDragging) scheduleCheck();
    };

    const onCursorUpdate = (e) => {
      if (e.detail?.x !== undefined && e.detail?.y !== undefined) {
        lastX = e.detail.x;
        lastY = e.detail.y;
        lastMoveTimeRef.current = Date.now();

        gsap.to(cursor, {
          x: e.detail.x - size / 2,
          y: e.detail.y - size / 2,
          duration: 0.1,
          ease: "power2.out",
        });

        if (!isDragging) scheduleCheck();
      }
    };

    const getElementUnderPointer = (x, y) => {
      const elements = document.elementsFromPoint(x, y);
      for (const element of elements) {
        if (element === cursor || element.id === "cursor") continue;
        return element;
      }
      return null;
    };

    const checkElementUnderPointer = () => {
      pendingCheck = false;
      if (lastX === null || lastY === null) return;
      getElementUnderPointer(lastX, lastY);
    };

    const scheduleCheck = () => {
      if (pendingCheck) return;
      pendingCheck = true;
      rafId = requestAnimationFrame(checkElementUnderPointer);
    };

    const onMouseOut = () => resetScalesToNormal();
    const onMouseLeave = () => resetScalesToNormal();
    const onScroll = () => {
      if (!isDragging) scheduleCheck();
    };
    const onWheel = () => {
      if (!isDragging) scheduleCheck();
    };
    const onTouchMove = () => {
      if (!isDragging) scheduleCheck();
    };
    const onDragStart = () => {
      isDragging = true;
    };
    const onDragEnd = () => {
      isDragging = false;
      scheduleCheck();
    };

    document.addEventListener("mousedown", (e) => {
      if (e.target.closest(".dragger-wrapper")) onDragStart();
    });
    document.addEventListener("mouseup", () => {
      if (isDragging) onDragEnd();
    });
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("cursorUpdate", onCursorUpdate);
    links.forEach((link) => link.addEventListener("mouseleave", onMouseOut));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("cursorUpdate", onCursorUpdate);
      window.removeEventListener("cursorFreeze", onCursorFreeze);
      window.removeEventListener("cursorUnfreeze", onCursorUnfreeze);
      links.forEach((link) =>
        link.removeEventListener("mouseleave", onMouseOut),
      );
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      if (inactivityIntervalRef.current) clearInterval(inactivityIntervalRef.current);
      observer.kill();
    };
  }, [isNotAllowed]);

  return (
    <div
      style={{
        width: size,
        height: size,
        zIndex: 99999999,
        transformOrigin: "center center",
      }}
      id="cursor"
      className="custom-cursor overflow-hidden"
      ref={cursorRef}
    >
      <div className="cursor-content flex justify-center items-center text-center flex-row whitespace-nowrap w-full h-full">
        <div className="projects-card-header flex gap-7 justify-center items-center text-center">
          {/* visibility: hidden so layout is preserved but text is invisible until SplitText is ready */}
          <h4 ref={viewProjectHeaderRef} style={{ visibility: "hidden" }}>
            View Project
          </h4>
          <img
            ref={cursorArrowRef}
            src="/svg/cursor-arrow.svg"
            className="w-10 h-10"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Cursor;
