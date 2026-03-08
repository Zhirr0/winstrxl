import Transition from "../../components/Transition";
import AppliedClippingSection from "./AppliedClipingSection";
import PosterHero from "./PosterHero";
import PosterSlider from "./PosterSlider";
import PosterWaveText from "./PosterWaveText";

const Posters = () => {
  return (
    <main className="poster-page">
      <PosterHero />
      <div className="h-[20svh]" />
      <PosterSlider />
      <div className="h-[20svh]" />
      <PosterWaveText />
      <div className="h-[20svh]" />
      <AppliedClippingSection />
    </main>
  );
};

export default Transition(Posters);
