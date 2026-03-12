import "./index.css";

/* React */
import { useEffect, useRef } from "react";

// routes
import { Route, Routes, useLocation } from "react-router-dom";

/* Animation / motion */
import gsap from "gsap";
import { AnimatePresence } from "motion/react";
import { ReactLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/* Utilities */
import { useMediaQuery } from "react-responsive";

/* Core components */
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import MenuButton from "./components/MenuButton";
import MenuSection from "./components/MenuSection";

/* projects */
import Projects from "./pages/projects/Projects";
import GalleryList from "./pages/gallery-list/GalleryList";

/* the other three router
  esports
  clientDesign
  posters
*/
import Esports from "./pages/esports/Esports";
import ClientWork from "./pages/client-work/ClientWork";
import Posters from "./pages/posters/Posters";
import AllPosters from "./pages/posters/allPosters/AllPosters";
import PosterViewer from "./pages/posters/specific-poster/PosterViewer";

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
    const navType = performance.getEntriesByType("navigation")[0]?.type;
    const isReload = navType === "reload";

    // Skip scroll-to-top if reloading on any page OTHER than home
    if (isReload && location.pathname !== "/") return;

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.scrollTo(0, { immediate: true });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/projects/list") {
      if (!sessionStorage.getItem("list-reloaded")) {
        const timer = setTimeout(() => {
          sessionStorage.setItem("list-reloaded", "true");
          window.location.reload();
        }, 1600);
        return () => clearTimeout(timer);
      }
    } else {
      sessionStorage.removeItem("list-reloaded");
    }
  }, [location.pathname]);

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

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      const handleScroll = () => {
        ScrollTrigger.update();
      };
      lenis.on("scroll", handleScroll);
      return () => {
        lenis.off("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        smoothWheel: true,
        duration: 1,
        lerp: 0.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
      ref={lenisRef}
    >
      <Nav />
      <MenuButton />
      <MenuSection />
      <div style={{ display: isTouchScreenSize ? "none" : "block" }}>
        <Cursor />
      </div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/list" element={<GalleryList />} />

          <Route path="/esports" element={<Esports />} />
          <Route path="/client-work" element={<ClientWork />} />
          <Route path="/posters" element={<Posters />} />
          <Route path="/posters/all" element={<AllPosters />} />
          <Route path="/posters/viewer" element={<PosterViewer />} />
        </Routes>
      </AnimatePresence>
    </ReactLenis>
  );
};

export default App;
