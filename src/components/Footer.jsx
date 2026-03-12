import MediaQuery, { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardBackground from "./CardBackground";
import useTextHighlight from "../hooks/useTextHighlight";
const HrSpecialDesign = ({ className, top, bottom }) => {
  return (
    <div
      style={{ marginTop: `${top}px`, marginBottom: `${bottom}px` }}
      className={`flex justify-center items-center ${className}`}
    >
      <div className="hr-block" />
      <hr className="w-full opacity-30" />
      <div className="hr-block" />
    </div>
  );
};

export default function Footer() {
  const firstBreakPoint = useMediaQuery({ maxWidth: 1024 });
  const secondBreakPoint = useMediaQuery({ minWidth: 1024 });
  const thirdBreakPoint = useMediaQuery({ maxWidth: 700 });
  const isMobile = useMediaQuery({ maxWidth: 650 });
  useGSAP(() => {
    gsap.set(".slidein-contact-left", {
      xPercent: -100,
    });
    gsap.set(".slidein-contact-right", {
      xPercent: 100,
    });
    gsap.set(".slidein-clients-left", {
      xPercent: -100,
    });
    gsap.set(".slidein-clients-right", {
      xPercent: 100,
    });
    gsap.set(".contact-center", {
      yPercent: 100,
    });
    gsap.set(".contact-header", {
      yPercent: 20,
    });
    gsap.set(".clients-center", {
      yPercent: 100,
    });
    gsap.set(".clients-bottom", {
      yPercent: 100,
    });
    gsap.set(".clients-header", {
      yPercent: 20,
    });
    gsap.set(".story-header", {
      yPercent: 0,
    });
  }, []);
  useGSAP(() => {
    if (firstBreakPoint) return;
    const cards = gsap.utils.toArray(".footer-card-outer");

    // Maps raw scroll progress to animation progress with pause zones:
    // 0–10%: no movement, 10–60%: first half, 60–70%: pause, 70–100%: second half
    const remapProgress = (p) => {
      if (p < 0.3) return 0; // 0–30%: pause
      if (p < 0.6) return ((p - 0.3) / 0.3) * 0.75; // 30–60%: first active window
      if (p < 0.9) return 0.75; // 60–90%: pause
      return 0.75 + ((p - 0.9) / 0.1) * 0.25; // 90–100%: second active window
    };
    cards.forEach((c, i) => {
      if (i < cards.length - 1) {
        const cardInner = c.querySelector(".footer-card");

        const tween = gsap.fromTo(
          cardInner,
          { scale: 1, y: "0%", opacity: 1 },
          {
            y: "-40%",
            opacity: 0,
            filter: "blur(10px)",
            ease: "power1.out",
            paused: true, // ← driven manually by onUpdate
          },
        );

        ScrollTrigger.create({
          trigger: cards[i + 1],
          start: "top 100%",
          end: "top -70%",
          pin: c,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            tween.progress(remapProgress(self.progress));
          },
        });
      }
    });
  }, [firstBreakPoint]);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top 50%",
      end: "top top",
      invalidateOnRefresh: true,
      onUpdate(self) {
        const progress = self.progress;
        const xPercentLeft = gsap.utils.interpolate(-100, 0, progress);
        const xPercentRight = gsap.utils.interpolate(100, 0, progress);
        const yPercentCenter = gsap.utils.interpolate(100, 0, progress);
        const yPercentHeader = gsap.utils.interpolate(20, 0, progress);

        gsap.to(".slidein-contact-left", {
          xPercent: xPercentLeft,
          ease: "power3.out",
        });
        gsap.to(".slidein-contact-right", {
          xPercent: xPercentRight,
          ease: "power3.out",
        });
        gsap.to(".contact-center", {
          yPercent: yPercentCenter,
          ease: "power3.out",
        });
        gsap.to(".contact-header", {
          yPercent: yPercentHeader,
          ease: "power3.out",
        });
      },
    });
  }, []);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#clients",
      start: "top 75%",
      end: "top top",
      invalidateOnRefresh: true,
      onUpdate(self) {
        const progress = self.progress;
        const xPercentLeft = gsap.utils.interpolate(-100, 0, progress);
        const xPercentRight = gsap.utils.interpolate(100, 0, progress);
        const yPercentCenter = gsap.utils.interpolate(100, 0, progress);
        const yPercentHeader = gsap.utils.interpolate(20, 0, progress);

        gsap.to(".slidein-clients-left", {
          xPercent: xPercentLeft,
          ease: "power3.out",
        });
        gsap.to(".slidein-clients-right", {
          xPercent: xPercentRight,
          ease: "power3.out",
        });
        gsap.to(".clients-center", {
          yPercent: yPercentCenter,
          ease: "power3.out",
        });
        gsap.to(".clients-bottom", {
          yPercent: yPercentCenter,
          ease: "power3.out",
        });
        gsap.to(".clients-header", {
          yPercent: yPercentHeader,
          ease: "power3.out",
        });
      },
    });
  }, []);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px)", () => {
      ScrollTrigger.create({
        trigger: "#story",
        start: "top 50%",
        end: "top top",
        onUpdate(self) {
          const progress = self.progress;
          const yPercent = gsap.utils.interpolate(0, 50, progress);
          gsap.to(".story-header", {
            yPercent,
            ease: "power3.out",
          });
        },
      });
    });
  }, []);

  useTextHighlight(".client-text-span", ".clients-bottom", 0.01);
  useTextHighlight(
    ".text-highlight-contact",
    ".text-highlight-contact-wrapper",
    0.01,
  );
  useTextHighlight(".text-highlight-story", ".text-highlight-story-wrapper", 0.001);
  useTextHighlight('.text-highlight-story-2', ".right-side", 0.001)
  useTextHighlight(".story-card-header-main", ".story-header", 0.05)
  useTextHighlight(".clients-header-main-header", ".clients-header", 0.05)
  useTextHighlight(".contact-header-main-header", ".contact-header", 0.01)

  return (
    // Main footer container
    <footer className="min-h-screen font-serif">
      {/* Story section */}

      <div className="footer-card-outer">
        <section
          style={{ padding: "50px 30px" }}
          className="footer-card"
          id="story"
        >
          <CardBackground />
          <img
            style={{ marginBottom: "5px" }}
            src="/svg/bottom-right-arrow.svg"
            className="bottom-right-svg"
            alt=""
          />

          {/* Story header - contains "my story" title */}
          <div
            style={{ marginBottom: firstBreakPoint ? "0px" : "100px" }}
            className="story-header"
          >
            <h1 className="story-card-header-main">my story</h1>
            <img
              style={{ marginLeft: "auto" }}
              className=""
              src="/svg/bottom-left-arrow.svg"
              alt=""
            />
          </div>

          {/* Story subheader - contains name, role, and location */}
          <div className="story-subheader">
            <p>winstrxl</p>
            <p>Designer / 3d artist / creative consultant</p>
            <p className="">riga.lativia</p>
          </div>

          <HrSpecialDesign top={20} bottom={20} className={`hr-story`} />

          {/* Story bottom section - contains main content */}
          <div style={{}} className="story-bottom">
            <img
              src="/svg/triangle.svg"
              className="right-triangle-story"
              alt=""
            />

            {/* Story content container - two column layout */}
            {/* Left side content - about text and services button */}
            <div style={{ marginTop: "3%" }} className="left-side top-side">
              <div className="text-highlight-story-wrapper">
                <p className="text-highlight-story">
                  I began designing at 14, inspired by watching my uncle work in
                  the creative industry. What started with simple Minecraft
                  headers quickly evolved into a focused pursuit of visual
                  excellence.
                </p>
              </div>
              <button style={{ padding: "8px" }} className="story-button">
                <span className="">
                  <img className="w-4" src="/svg/rotating-icon.svg" alt="" />
                  <p>learn about my services</p>
                </span>
              </button>
            </div>

            {/* Right side content - additional description paragraphs */}
            <div
              style={{ marginTop: firstBreakPoint ? "0%" : "3%" }}
              className="right-side bottom-side"
            >
              <p className="text-highlight-story-2">
                Being deeply involved in competitive gaming, transitioning into
                esports design was a natural progression. That insight allows me
                to design with purpose, creating visuals that don’t just look
                strong, but represent ambition, performance, and identity.
                <br /> My approach is built on discipline, communication, and
                detail. I value clarity in collaboration and ensure that every
                project meets a professional standard both creatively and
                strategically.
              </p>
              <p className="text-highlight-story-2">
                Long term, my goal is to work alongside Tier 1 organisations on
                structured partnerships and become a recognised creative within
                the esports industry. I am committed to constant refinement,
                stronger systems, and higher standards with every project I take
                on.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="footer-card-outer">
        <section
          style={{ padding: "50px 30px" }}
          className="footer-card"
          id="clients"
        >
          <CardBackground />
          <div className="clients-header">
            <HrSpecialDesign className={`w-full slidein-clients-left`} />
            <h1 className="clients-header-main-header">CLIENTS</h1>
            <HrSpecialDesign className={`w-full slidein-clients-right`} />
          </div>
          <div className="clients-center">
            <img src="/svg/client-logos/Adept Club.svg" />
            <img src="/svg/client-logos/Coffein Esports.svg" />
            <img src="/svg/client-logos/Xravel Esports.svg" />
            <img src="/svg/client-logos/Kodex Esports.svg" />
            <img src="/svg/client-logos/Lumina Gaming.svg" />
            <img src="/svg/client-logos/Nexus77 Esports.svg" />
            <img src="/svg/client-logos/Souls Heart Esports.svg" />
            <img src="/svg/client-logos/Syndicate Gaming.svg" />
            <img
              style={{
                marginLeft: isMobile ? "5px" : "20px",
              }}
              src="/svg/client-logos/dukki.svg"
            />
          </div>
          <div className="clients-bottom">
            <p>
              My experience includes partnerships with organisations such as [
              <span className="client-text-span font-barlow tracking-[1px]">
                Adept Club
              </span>
              ] , [
              <span className="client-text-span font-barlow tracking-[1px]">
                Coffein Esports
              </span>
              ], [
              <span className="client-text-span font-barlow tracking-[1px]">
                Kodex Esports
              </span>
              ], [
              <span className="client-text-span font-barlow tracking-[1px]">
                Souls Heart Esports
              </span>
              ], <br />[
              <span className="client-text-span font-barlow tracking-[1px]">
                Xravel
              </span>
              ], [
              <span className="client-text-span font-barlow tracking-[1px]">
                Lumina Gaming
              </span>
              ], [
              <span className="client-text-span font-barlow tracking-[1px]">
                Nexus77 Esports
              </span>
              ], and [
              <span className="client-text-span font-barlow tracking-[1px]">
                Syndicate Esports
              </span>
              ]. Working remotely with teams across different regions has
              strengthened my workflow, communication structure, and ability to
              execute efficiently under deadlines all essential within
              competitive esports environments.
            </p>
          </div>
        </section>
      </div>

      <div className="footer-card-outer">
        <section
          style={{ padding: "50px 30px" }}
          className="footer-card"
          id="contact"
        >
          <CardBackground />
          <div
            style={{
              marginTop: thirdBreakPoint
                ? "10%"
                : secondBreakPoint
                  ? "3%"
                  : firstBreakPoint
                    ? "1%"
                    : "0%",
            }}
            className="contact-header"
          >
            <HrSpecialDesign className={`w-full slidein-contact-left`} />
            <h1 className="contact-header-main-header">Let's connect</h1>
            <HrSpecialDesign className={"w-full slidein-contact-right"} />
          </div>
          <div className="contact-center">
            <div className="text-highlight-contact-wrapper">
              <p className="text-highlight-contact [word-spacing:5px]">
                I’m currently available for freelance projects and long-term
                partnerships with organisations looking to elevate their visual
                presence.
              </p>
            </div>
            <div className="contact-email">
              <img src="/svg/right-arrow.svg" alt="" />
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Winstrol821@gmail.com&su=create%20me%20a%20design"
                target="_blank"
                rel="noopener noreferrer"
              >
                Winstrol821@gmail.com
              </a>
            </div>
          </div>
          <HrSpecialDesign className={"w-full translate-y-0"} />
          <div className="contact-bottom">
            <p>
              copyright <br />
              @wintrxl.com 2026
            </p>
            <p>all rights reserved</p>
          </div>
        </section>
      </div>
    </footer>
  );
}
