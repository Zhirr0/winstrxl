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

    const bgDuration = 0.3;
    const colorDelay = bgDuration + 0.05;
    const colorDuration = 0.3;

    const animateBg = (color, delay = 0) => {
      gsap.killTweensOf(targets, "backgroundColor");
      gsap.to(targets, {
        backgroundColor: color,
        duration: bgDuration,
        delay: delay,
        ease: "power1.in",
      });
    };

    const animateColor = (color, delay = 0) => {
      gsap.killTweensOf(targets, "color");
      gsap.to(targets, {
        color: color,
        duration: colorDuration,
        delay: delay,
        ease: "power1.in",
      });
    };

    ScrollTrigger.create({
      trigger: ".cl-process",
      start: "top center",
      end: `+=${window.innerHeight * 4.5}`,
      onEnter() {
        animateBg("oklch(94.7% 0.024 47.1)"); // bg first
        animateColor("oklch(14% 0.006 173.6)", colorDelay); // color after
      },
      onEnterBack() {
        animateBg("oklch(94.7% 0.024 47.1)"); // bg first
        animateColor("oklch(14% 0.006 173.6)", colorDelay); // color after
      },
      onLeave() {
        animateColor("oklch(100% 0.00011 271.152)"); // color first
        animateBg("oklch(14% 0.006 173.6)", colorDelay); // bg after
      },
      onLeaveBack() {
        animateColor("oklch(100% 0.00011 271.152)"); // color first
        animateBg("oklch(14% 0.006 173.6)", colorDelay); // bg after
      },
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
