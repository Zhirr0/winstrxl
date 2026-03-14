import Transition from "../../components/Transition";
import ClientHero from "./ClientHero";
import ClientNames from "./ClientNames";
import ClientShowcase from "./ClientShowcase";
import ClientSlider from "./ClientSlider";
import ClientProcess from './ClientProcess'

const ClientWork = () => {
  return (
    <main className="cl-page">
      <ClientHero />
      <div className="h-[20svh]" />
      <ClientSlider />
      <div className="h-[20svh]" />
      <ClientShowcase />
      <div className="h-[20svh]" />
      <ClientProcess />
      <ClientNames />
      <div className="h-[20svh]" />
    </main>
  );
};

export default Transition(ClientWork);
