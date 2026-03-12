import "../../styles/esports.css";
import EsportsHero from "./EsportsHero";
import Transition from "../../components/Transition";
import EsportFeaturedProject from "./EsportFeaturedProject";
import EsportGames from "./EsportGames";
import EsportsSlider from "./EsportsSlider";
import Footer from "./EsportsFooter";
import useFadeOnScroll from "../../hooks/useFadeOnScroll";
import EsportsGallery from "./EsportsGallery";

const Esports = () => {
  
  useFadeOnScroll(".es-featured-project", ".es-hero");
  useFadeOnScroll(".es-games-section", ".es-featured-project");
  useFadeOnScroll(".es-slider", ".es-games-section");
  useFadeOnScroll(".es-gallery", ".es-slider");

  return (
    <main>
      <EsportsHero />
      <div className="min-h-[20svh]" />
      <EsportFeaturedProject />
      <div className="min-h-[20svh]" />
      <EsportGames />
      <div className="min-h-[20svh]" />
      <EsportsSlider />
      <EsportsGallery />
      <div className="min-h-[20svh]"></div>
      <Footer />
    </main>
  );
};

export default Transition(Esports);
