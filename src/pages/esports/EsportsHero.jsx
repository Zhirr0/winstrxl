import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
export default function EsportsHero() {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      SplitText.create(".es-bg-letter", {
        type: "chars",
        mask: "chars",
        charsClass: "es-bg-chars",
        onSplit(self) {
          gsap.from(self.chars, {
            yPercent: 100,
            rotateY: 90,
            duration: 4,
            ease: "expo.out",
          });
        },
      });
    });


    SplitText.create('.es-h1', {
      type: 'chars',
      mask: "chars"
      ,
      onSplit(self) {
        gsap.from(self.chars, {
          rotateY: 90,
          yPercent: 100,
          duration: 4,
          ease: 'expo.out'

        })
      }
    })
  }, []);
  return (
    <section className="es-hero">
      <div className="es-scan" />

      <div
        style={{ marginTop: "25px", marginLeft: "5px" , }}
        className="es-bg-letter"
      >
        ES
      </div>

      <div style={{ marginBottom: "5px" }} className="es-body">
        <h1
          className="es-h1"
        >
          <span>Esports &amp;</span>
          <span>Gaming</span>
        </h1>
      </div>
    </section>
  );
}
