import { useRef, useEffect, useState } from "react";
import LeftMenuContainer from "./LeftMenuContainer";
import MenuBackground from "./MenuBackground";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import closeMenu from "../utils/closeMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MenuSection = () => {
  const menuSection = useRef(null);
  const headersSplitRef = useRef(null);
  const fromBottomSplitRef = useRef(null);
  const [leftMenuKey, setLeftMenuKey] = useState(0);

  const location = useLocation()
  const navigate = useNavigate()

  
  function handleSelectLink(e, sectionId) {
    e.preventDefault();
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 2000);

    } else {
      document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'})
    }
  }

  useGSAP(() => {
    const fromBottom = menuSection.current.querySelectorAll(".from-bottom");
    const headers = menuSection.current.querySelectorAll(
      ".menu-animated-headers",
    );

    headersSplitRef.current = new SplitText(headers, {
      type: "chars",
    });

    fromBottomSplitRef.current = new SplitText(fromBottom, {
      type: "chars",
      mask: "chars",
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      headers.forEach((header) => {
        const handleMouseEnter = () => {
          gsap.killTweensOf(header);
          gsap.to(header, {
            scale: 1.2,
            duration: 1,
            opacity: 1,
            ease: "power3.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.killTweensOf(header);
          gsap.to(header, {
            scale: 1,
            duration: 1,
            opacity: 0.5,
            ease: "power3.out",
          });
        };

        header.addEventListener("mouseenter", handleMouseEnter);
        header.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    // Set initial states
    gsap.set(menuSection.current, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      filter: "blur(10px)",
      yPercent: 100,
    });

    gsap.set(headersSplitRef.current.chars, {
      xPercent: -100,
      scaleX: 0,
    });

    gsap.set(fromBottomSplitRef.current.chars, {
      yPercent: 100,
      rotateY: -180,
    });
  }, []);

  useEffect(() => {
    const handleMenuToggle = (e) => {
      const isActive = e.detail.isActive;

      if (isActive) {
        setLeftMenuKey((prev) => prev + 1);

        const tl = gsap.timeline();

        tl.to(menuSection.current, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          filter: "blur(0px)",
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
        })
          .to(
            headersSplitRef.current.chars,
            {
              xPercent: 0,
              scaleX: 1,
              duration: 0.6,
              stagger: 0.02,
              delay: 0.4,
              ease: "power3.out",
            },
            "<",
          )
          .to(
            fromBottomSplitRef.current.chars,
            {
              yPercent: 0,
              duration: 0.5,
              rotateY: 0,
              stagger: 0.01,
              ease: "power3.out",
            },
            "<",
          );
      } else {
        const tl = gsap.timeline();

        tl.to(headersSplitRef.current.chars, {
          xPercent: -100,
          scaleX: 0,
          duration: 0.4,
          stagger: 0.01,
          ease: "power3.in",
        })
          .to(
            fromBottomSplitRef.current.chars,
            {
              yPercent: 100,
              duration: 0.4,
              stagger: 0.01,
              ease: "power3.in",
            },
            "<",
          )
          .to(
            menuSection.current,
            {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              filter: "blur(10px)",
              yPercent: 100,
              duration: 0.5,
              delay: 0.4,
              ease: "power3.in",
            },
            "<",
          );
      }
    };

    window.addEventListener("menuToggle", handleMenuToggle);
    return () => window.removeEventListener("menuToggle", handleMenuToggle);
  }, []);

  return (
    <section
      ref={menuSection}
      style={{ padding: "20px clamp(3px, 1vw, 12.4px)" }}
      className="menu-section"
    >
      <MenuBackground />
      <div className="left-menu top-menu">
        <LeftMenuContainer key={leftMenuKey} />
      </div>
      <div style={{ padding: "0px 30px" }} className="right-menu bottom-menu">
        <a
          href="#story"
          onClick={(e) => handleSelectLink(e, "story")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="about-container right-container">
            <div>
              <p>01</p>
              <h3 className="menu-animated-headers">ABOUT</h3>
            </div>
            <img src="/svg/plus.svg" className="w-3 h-auto" alt="" />
          </div>
        </a>
        <hr style={{ margin: "20px 0px" }} />

        <div className="projects-container right-container">
          <div>
            <p>02</p>
            <Link onClick={() => closeMenu()} to={"/projects"}>
              <h3 className="menu-animated-headers">PROJECTS</h3>
            </Link>
          </div>
          <img src="/svg/plus.svg" className="w-3 h-auto" alt="" />
        </div>

        <hr style={{ margin: "20px 0px" }} />
        <a
          href="#clients"
          onClick={(e) => handleSelectLink(e, "clients")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="clients-container right-container">
            <div>
              <p>03</p>
              <h3 className="menu-animated-headers">CLIENTS</h3>
            </div>
            <img src="/svg/plus.svg" className="w-3 h-auto" alt="" />
          </div>
        </a>
        <hr style={{ margin: "20px 0px" }} />
        <a
          href="#contact"
          onClick={(e) => handleSelectLink(e, "contact")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="contacts-container right-container">
            <div>
              <p>04</p>
              <h3 className="menu-animated-headers">CONTACT</h3>
            </div>
            <img src="/svg/plus.svg" className="w-3 h-auto" alt="" />
          </div>
        </a>
        <hr style={{ margin: "20px 0px" }} />
        <div className="menu-contacts">
          <div className="socials">
            <img style={{ marginTop: "5px" }} src="/svg/plus.svg" alt="" />
            <div className="seperate-container">
              <h4 className="from-bottom">FOLLOW</h4>
              <div>
                <p className="from-bottom">linkedln</p>
                <p className="from-bottom">instagram</p>
                <p className="from-bottom">behancd</p>
              </div>
            </div>
          </div>
          <div className="contacts-email">
            <img style={{ marginTop: "5px" }} src="/svg/plus.svg" alt="" />
            <div>
              <h4 className="from-bottom">CONTACT</h4>
              <p className="from-bottom">info@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
