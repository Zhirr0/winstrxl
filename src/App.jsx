import "./index.css";

/* React */
import { useEffect, useRef } from "react";

// routes
import { Route, Routes, useLocation } from "react-router-dom";

/* Animation / motion */
import gsap from "gsap";
import { AnimatePresence } from "motion/react";
import { ReactLenis } from "lenis/react";

/* Utilities */
import { useMediaQuery } from "react-responsive";

/* Core components */
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import HeroSvgPath from "./components/HeroSvgPath";
import MenuButton from "./components/MenuButton";
import MenuSection from "./components/MenuSection";
import { useGSAP } from "@gsap/react";
import Projects from "./pages/Projects";

const App = () => {
  const location = useLocation();
  const lenisRef = useRef();
  const isTouchScreenSize = useMediaQuery({ maxWidth: 1024 });
  useGSAP(() => {
    gsap.from(".hero, .hamburger-btn, nav", {
      yPercent: -10,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  // reading from docs you can refresh the page with using window.location.reload()
  useEffect(() => {
    let wasDesktop = window.innerWidth >= 1024;

    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 1024;
      if (wasDesktop !== isNowDesktop) {
        window.location.reload();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const update = (time) => lenisRef.current?.lenis?.raf(time * 700);
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        smoothWheel: true,
        duration: 1,
        lerp: 0.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      }}
      ref={lenisRef}
    >
      <Nav />
      <HeroSvgPath />
      <MenuButton />
      <MenuSection />
      <div style={{ display: isTouchScreenSize ? "none" : "block" }}>
        <Cursor />
      </div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </AnimatePresence>
    </ReactLenis>
  );
};

export default App;
