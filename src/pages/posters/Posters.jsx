import Transition from "../../components/Transition";
import AppliedClippingSection from "./AppliedClipingSection";
import PosterHero from "./PosterHero";
import PosterSlider from "./PosterSlider";
import PosterWaveText from "./PosterWaveText";
import PosterFooter from './PosterFooter'

const Posters = () => {
  return (
    <main className="poster-page overflow-x-hidden">
      <PosterHero />
      <div className="h-[20svh]" />
      <PosterSlider />
      <div className="h-[20svh]" />
      <PosterWaveText />
      <div className="h-[20svh]" />
      <AppliedClippingSection />
      <div className="h-[100svh]" />
      <PosterFooter />
    </main>
  );
};

export default Transition(Posters);
