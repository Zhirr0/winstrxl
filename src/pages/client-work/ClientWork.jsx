import Transition from "../../components/Transition";
import ClientHero from "./ClientHero";
import ClientNames from "./ClientNames";
import ClientSlider from "./ClientSlider";

const ClientWork = () => {
  return (
    <main className="cl-page">
      <ClientHero />
      <div className="h-[20svh]" />
      <ClientSlider />
      <div className="h-[20svh]" />
      
      <ClientNames />
      <div className="h-[20svh]" />
    </main>
  );
};

export default Transition(ClientWork);
