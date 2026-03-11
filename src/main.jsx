import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import gsap from "gsap";

// Import all plugins
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { Draggable, Flip } from "gsap/all";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import CustomEase from "gsap/CustomEase";
import InertiaPlugin from "gsap/InertiaPlugin";
import ScrollToPlugin from "gsap/ScrollToPlugin.js";

// import all css files
import './styles/esports.css'
import './styles/footer-top-layer.css'
import './styles/footer.css'
import './styles/list-gallery-layout.css'
import './styles/poster-slider.css'
import './styles/posters.css'
import './styles/projects.css'
import './styles/client-work.css'

// Register ALL plugins once
gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  Draggable,
  DrawSVGPlugin,
  Flip,
  MorphSVGPlugin,
  CustomEase,
  InertiaPlugin,
  ScrollToPlugin
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
