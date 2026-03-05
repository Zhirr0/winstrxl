import "../../styles/esports.css";
import EsportsHero from "./EsportsHero";
import Transition from "../../components/Transition";
import EsportFeaturedProject from "./EsportFeaturedProject";
import EsportGames from "./EsportGames";
import EsportsSlider from "./EsportsSlider";
const Esports = () => {
  return (
    <main>
      <EsportsHero />
      <div className="min-h-[20svh]" />
      <EsportFeaturedProject />
      <div className="min-h-[20svh]" />
      <EsportGames />
      <div className="min-h-[20svh]" />
      <EsportsSlider />
      <div className="min-h-[20svh]" />
    </main>
  );
};

export default Transition(Esports);
