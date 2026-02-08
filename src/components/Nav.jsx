import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import NavSvgPath from "./NavSvgPath";

gsap.registerPlugin(SplitText);

const Nav = () => {
  const [isCompressed, setIsCompressed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const pathRef = useRef(null);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const splitTextRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  // Expanded path (initial state, scroll up)
  const expandedPath = `
M0 0
V1
C0.00435 1 0.00788 1 0.00788 0.91071
C0.00788 0.79093 0.00788 0.77199 0.00788 0.54984
C0.00788 0.32768 0.01042 0.32768 0.064 0.32768
H0.41750
C0.45917 0.32768 0.43417 1 0.45917 1
H0.53583
C0.55958 1 0.53583 0.32768 0.5775 0.32768
H0.93070
C0.98976 0.32768 0.99178 0.32768 0.99178 0.55096
C0.99178 0.70987 0.99212 0.74363 0.99212 0.91071
C0.99212 0.95893 0.99035 1 1 1
V0
H0
Z
  `.trim();

  // Compressed path (scroll down)
  const compressedPath = `
M0 0
V1
C0.00435 1 0.00788 1 0.00788 0.9107
C0.00788 0.7909 0.00788 0.772 0.00788 0.5498
C0.00788 0.3277 0.04125 0.3277 0.064 0.3277
H0.4383
C0.48 0.3277 0.455 1 0.48 1
H0.5083
C0.5321 1 0.5083 0.3277 0.55 0.3277
H0.9307
C0.9571 0.3277 0.9918 0.3277 0.9918 0.5510
C0.9918 0.7099 0.9921 0.7436 0.9921 0.9107
C0.9921 0.9589 0.9904 1 1 1
V0
H0.5
H0
Z
  `.trim();

  // Handle resize - force reset when crossing 1024px breakpoint
  useEffect(() => {
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      
      resizeTimeout = setTimeout(() => {
        const wasDesktop = isDesktop;
        const nowDesktop = window.innerWidth >= 1024;
        
        // Only update if breakpoint changed
        if (wasDesktop !== nowDesktop) {
          setIsDesktop(nowDesktop);
          
          // Force expanded state when transitioning to desktop
          if (nowDesktop) {
            setIsCompressed(false);
          }
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isDesktop]);

  // Initialize/reinitialize SplitText based on desktop state
  useEffect(() => {
    // Clean up previous SplitText instance
    if (splitTextRef.current) {
      splitTextRef.current.revert();
      splitTextRef.current = null;
    }

    if (isDesktop && headerRef.current) {
      // Initialize SplitText for desktop
      splitTextRef.current = new SplitText(headerRef.current, {
        type: "chars",
      });

      // Set initial desktop state (expanded)
      gsap.set(logoRef.current, {
        yPercent: 100,
        opacity: 0,
      });

      // Ensure header chars are visible
      if (splitTextRef.current.chars) {
        gsap.set(splitTextRef.current.chars, {
          yPercent: 0,
          opacity: 1,
        });
      }

      // Reset path to expanded
      const path = document.querySelector("#wave-container path");
      if (path) {
        gsap.set(path, {
          attr: { d: expandedPath },
        });
      }
    } else if (!isDesktop && logoRef.current) {
      // Set mobile state - only logo visible
      gsap.set(logoRef.current, {
        yPercent: 0,
        opacity: 1,
      });
    }

    return () => {
      if (splitTextRef.current) {
        splitTextRef.current.revert();
        splitTextRef.current = null;
      }
    };
  }, [isDesktop, expandedPath]);

  // Detect scroll direction and update state
  useEffect(() => {
    // Skip scroll detection on mobile
    if (!isDesktop) return;

    const scrollThreshold = 100;

    const rafId = requestAnimationFrame(() => {
      // Scrolling down
      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > scrollThreshold
      ) {
        if (!isCompressed) {
          setIsCompressed(true);
        }
      }
      // Scrolling up
      else if (currentScrollY < lastScrollY.current) {
        if (isCompressed) {
          setIsCompressed(false);
        }
      }

      lastScrollY.current = currentScrollY;
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [currentScrollY, isCompressed, isDesktop]);

  // Animate clip-path and text on scroll
  useGSAP(() => {
    if (!isDesktop) return;

    if (!pathRef.current) {
      pathRef.current = document.querySelector("#wave-container path");
    }

    // Check if all required elements exist
    if (!pathRef.current || !splitTextRef.current || !logoRef.current) {
      return;
    }

    const chars = splitTextRef.current.chars;

    // Ensure chars array exists and has elements
    if (!chars || chars.length === 0) {
      return;
    }

    if (isCompressed) {
      // SCROLL DOWN - Compress navbar
      gsap.to(pathRef.current, {
        attr: { d: compressedPath },
        duration: 0.5,
        ease: "power1.inOut",
      });

      // Header: stagger from edges, move up and fade out
      gsap.to(chars, {
        yPercent: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: {
          each: 0.02,
          from: "edges",
        },
      });

      // Logo: fade in and move up from bottom
      gsap.to(logoRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      });
    } else {
      // SCROLL UP - Expand navbar
      gsap.to(pathRef.current, {
        attr: { d: expandedPath },
        duration: 0.5,
        ease: "power1.inOut",
      });

      // Logo: fade out and move down
      gsap.to(logoRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });

      // Header: stagger from edges, fade in from top
      gsap.fromTo(
        chars,
        {
          yPercent: -100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
          stagger: {
            each: 0.02,
            from: "center",
          },
        }
      );
    }
  }, [isCompressed, isDesktop, compressedPath, expandedPath]);

  return (
    <>
      <NavSvgPath />
      <nav ref={navRef}>
        <div className="nav-content">
          <h3 ref={headerRef} className="nav-header">
            Winstrxl
          </h3>
          <h3 ref={logoRef} className="nav-logo">
            logo
          </h3>
        </div>
      </nav>
    </>
  );
};

export default Nav;