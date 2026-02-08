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
import NavSvgPath from "./components/NavSvgPath";
import HeroSvgPath from "./components/HeroSvgPath";
import MenuButton from "./components/MenuButton";
import { useGSAP } from "@gsap/react";
const App = () => {

  const location = useLocation();
  const lenisRef = useRef();
  const isTouchScreenSize = useMediaQuery({ maxWidth: 1024 });
useGSAP(() => {
    gsap.from('.hero, .hamburger-btn, nav', {
      yPercent: -15,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out'
    })

}, [])
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  useEffect(() => {
    const update = (time) => lenisRef.current?.lenis?.raf(time * 900);
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
      <div style={{ display: isTouchScreenSize ? "none" : "block" }}>
        <Cursor />
      </div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
        </Routes>
      </AnimatePresence>

      <div className="h-screen"></div>
    </ReactLenis>
  );
};

export default App;
