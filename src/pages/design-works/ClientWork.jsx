import Transition from "../../components/Transition";
import DesignHero from "./DesignHero";
import DesignNames from "./DesignNames";
import DesignShowcase from "./DesignShowcase";
import DesignSlider from "./DesignSlider";
import DesignProcess from "./DesignProcess";
import DesignFooter from "./DesignFooter";

const DesignWork = () => {
  return (
    <main className="cl-page">
      <DesignHero />
      <div className="h-[20svh]" />
      <DesignSlider />
      <div className="h-[20svh]" />
      <DesignShowcase />
      <div className="h-[20svh]" />
      <DesignProcess />
      <DesignNames />
      <div className="h-[20svh]" />
      <DesignFooter />
    </main>
  );
};

export default Transition(DesignWork);
