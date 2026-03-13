import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealChars, revealWords } from "../../utils/animationHelpers";
import { ShowcaseCard } from "../../components/ShowcaseCard";
import { clients } from "../../config/clients";

export default function ClientShowcase() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    revealChars(eyebrowRef.current, section);
    revealWords(headlineRef.current, section);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-transparent overflow-hidden"
        style={{ padding: "5rem 1.5rem" }}
      >
        {/* Header */}
        <div
          className="flex flex-col gap-3 sm:gap-4"
          style={{ marginBottom: "3.5rem" }}
        >
          <div className="overflow-hidden">
            <p
              ref={eyebrowRef}
              className="font-mono text-[10px] tracking-[5px] text-light-primary uppercase"
              style={{ margin: 0 }}
            >
              Selected client work
            </p>
          </div>

          <div className="overflow-hidden" style={{ perspective: "800px" }}>
            <h1
              ref={headlineRef}
              className="font-display text-[clamp(52px,11vw,160px)] text-light-primary leading-[0.88] tracking-[0px]"
              style={{ margin: 0 }}
            >
              Work that
              <br />
              speaks
            </h1>
          </div>

        </div>

        {/* Cards */}
        <div>
          {clients.map((client, i) => (
            <ShowcaseCard key={client.name} client={client} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
