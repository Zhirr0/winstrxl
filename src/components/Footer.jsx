import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardBackground from "./CardBackground";
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

    cards.forEach((c, i) => {
      if (i < cards.length - 1) {
        const cardInner = c.querySelector(".footer-card");

        gsap.fromTo(
          cardInner,
          { scale: 1, y: "0%", opacity: 1 },
          {
            scale: 0.6,
            y: "-40%",
            opacity: 0,
            filter: "blur(10px)",
            ease: "power1.out",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 100%",
              end: "top -70%",
              scrub: true,
              pin: c,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    });
  }, [firstBreakPoint]);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top 50%",
      end: "top top",

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
  return (
    // Main footer container
    <footer className="min-h-screen">
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
            <h1 className="">my story</h1>
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
              <p>
                Fueled by curiosity, I blend fashion, product design, and 3D
                technology to craft concepts that push beyond conventional
                boundaries. For me, design is a journey of exploration — a
                process of ideas, experimentation, and storytelling that turns
                imagination into reality.
              </p>
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
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo
                in voluptate, magnam id, vero necessitatibus officiis enim
                accusamus, illum molestiae amet quam fuga laudantium praesentium
                omnis mollitia cupiditate ut vel! Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Officiis minus magni molestias
                labore similique repellat, exercitationem vitae itaque
                excepturi, consequuntur sed ipsam cum voluptate, unde voluptatem
                quaerat doloribus dicta atque?
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
                voluptates beatae eveniet repellat animi sit harum voluptatem
                distinctio saepe. Ratione.
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
            <h1>CLIENTS</h1>
            <HrSpecialDesign className={`w-full slidein-clients-right`} />
          </div>
          <div className="clients-center">
            <h1>logo1</h1>
            <h1>logo2</h1>
            <h1>logo3</h1>
            <h1>logo4</h1>
            <h1>logo5</h1>
            <h1>logo6</h1>
          </div>
          <div className="clients-bottom">
            <p>
              it has been a privilage Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum placeat molestias accusantium
              necessitatibus explicabo, sunt ipsam doloribus quidem asperiores
              quasi facilis repellat facere exercitationem impedit voluptatibus
              eos eum delectus qui quos? Corporis totam, eum quod fuga pariatur
              perspiciatis cupiditate fugit quisquam atque repellendus sunt
              excepturi enim doloremque animi dolorum placeat neque minus
              repudiandae dolores unde. Culpa ad in sed? Ex?
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
            <h1>Let's connect</h1>
            <HrSpecialDesign className={"w-full slidein-contact-right"} />
          </div>
          <div className="contact-center">
            <p>
              every collaboration begins with an idea. if you're looking for a
              creative partner to help bring your to life, feel free to get in
              touch with me
            </p>
            <div className="contact-email">
              <img src="/svg/right-arrow.svg" alt="" />
              <a href="">info@gmail.com</a>
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
