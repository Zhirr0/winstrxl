import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import NavSvgPath from "./NavSvgPath";
import { Link } from "react-router-dom";

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
M0 0V1C0.00435 1 0.0078799917 1 0.0078799917 0.9107142857C0.0078799917 0.7909321429 0.0078833333 0.7720982143 0.0078833333 0.5498348214C0.0078833333 0.3276991071 0.04125 0.3276991071 0.064 0.3276991071H0.4258333333C0.4675 0.3276991071 0.4425 1 0.4675 1H0.5208333333C0.5445833333 1 0.5208333333 0.3276991071 0.5625 0.3276991071H0.930700000 C0.9579166667 0.3276991071 0.9917833333 0.3276991071 0.9917833333 0.5511142857C0.9917833333 0.7099154464 0.9921166667 0.7436250000 0.9921166667 0.9107142857C0.9921166667 0.9589285714 0.9903500000 1 1 1V0H0.5H0Z
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
        },
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
          <div className="logo-container absolute -translate-x-[56%] max-[1024px]:w-26 max-[1024px]:-translate-y-[55%] max-[1024px]:-translate-x-[50%] max-[700px]:w-25 max-[600px]:w-20 max-[500px]:w-18 max-[430px]:w-16 max-[430px]:-translate-y-[30%] max-[370px]:w-15 -translate-y-1/2 top-9 left-[50%] max-[1115px]:w-17 max-[1115px]:-translate-y-[30%] max-[1300px]:-translate-y-[40%] max-[1300px]:w-20 w-25 h-auto">
            <Link to="/">
              <img
                alt="logo"
                src="/svg/Logowin.svg"
                ref={logoRef}
                className="nav-logo w-full h-auto object-contain"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
