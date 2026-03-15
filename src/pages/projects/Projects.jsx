import { useRef } from "react";
import { Link } from "react-router-dom";
import Transition from "../../components/Transition";
import GalleryBackground from "../../components/GalleryBackground";
import { useGalleryImages } from "../../hooks/useGalleryImages";
import { useGalleryInteraction } from "../../hooks/useGalleryInteraction";

const Projects = () => {
  const galleryRef = useRef(null);
  const zoomOutRef = useRef(null);
  const zoomInRef = useRef(null);
  const dragLayerRef = useRef(null);
  const gridSectionRef = useRef(null);
  const imagesRef = useRef([]);

  const isZoomedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const initialXRef = useRef(0);
  const initialYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);

  useGalleryImages(galleryRef, imagesRef);

  useGalleryInteraction(
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
  );

  return (
    <main className="overflow-x-hidden">
      <GalleryBackground />
      <Link to="/projects/list">
        <button
          style={{ padding: "5px" }}
          className="fixed top-6 z-10 left-4 flex gap-[0.2em] justify-center items-center text-center text-white bg-black/25 border border-white/25 backdrop-blur-xl rounded-lg"
        >
          Toggle Layout
        </button>
      </Link>

      <section ref={gridSectionRef} className="projects-gallery fixed">
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
