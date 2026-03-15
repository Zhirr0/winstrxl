import ProcessCard from "../../components/ClientProcessCard";
import { CARDS } from "../../config/ClientProcess.config";
import { useClientProcess } from "../../hooks/useClientProcess";

export default function ClientProcess() {
  useClientProcess();

  const [card1, card2, card3] = CARDS;

  return (
    <section className="cl-process">
      <div className="cl-process-wrapper">
        <ProcessCard {...card1} />
      </div>
      <div className="cl-process-wrapper relative z-3">
        <ProcessCard {...card2} />
        <ProcessCard {...card3} />
      </div>
    </section>
  );
}
