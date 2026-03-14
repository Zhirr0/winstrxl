import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ClientProcess1 from "../../components/ClientProcess1";
import ClientProcess2 from "../../components/ClientProcess2";
import ClientProcess3 from "../../components/ClientProcess3";

gsap.registerPlugin(ScrollTrigger);

export default function ClientProcess() {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".cl-process",
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
      invalidateOnRefresh: true,
      pin: true,
      onUpdate(self) {
        const progress = self.progress;

        if (progress <= 0.5) {
          const card2Progress = progress / 0.5;
          gsap.set(".cl-process-card-2", { yPercent: -81 * card2Progress });
        } else {
          gsap.set(".cl-process-card-2", { yPercent: -81 });
        }

        if (progress > 0.5) {
          const card3Progress = (progress - 0.5) / 0.5;
          gsap.set(".cl-process-card-3", { yPercent: -61 * card3Progress });
        } else {
          gsap.set(".cl-process-card-3", { yPercent: 0 });
        }
      },
    });

    const targets = [".cl-process-card", ".cl-page"];

    const animateTo = (values) => {
      gsap.killTweensOf(targets);
      gsap.to(targets, {
        ...values,
        duration: 0.8,
        ease: "sine.inOut",
      });
    };

    const light = {
      backgroundColor: "oklch(94.7% 0.024 47.1)",
      color: "oklch(14% 0.006 173.6)",
    };

    const dark = {
      backgroundColor: "oklch(14% 0.006 173.6)",
      color: "oklch(100% 0.0011 271.152)",
    };

    ScrollTrigger.create({
      trigger: ".cl-process",
      start: "top center",
      end: `+=${window.innerHeight * 5}`,
      onEnter: () => animateTo(light),
      onEnterBack: () => animateTo(light),
      onLeave: () => animateTo(dark),
      onLeaveBack: () => animateTo(dark),
    });
  }, []);

  return (
    <section className="cl-process">
      <div className="cl-process-wrapper">
        <ClientProcess1 />
      </div>
      <div className="cl-process-wrapper relative z-3">
        <ClientProcess2 />
        <ClientProcess3 />
      </div>
    </section>
  );
}
