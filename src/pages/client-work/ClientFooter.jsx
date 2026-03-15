import { useMediaQuery } from "react-responsive";
import GlitchWordmark from "../../components/GlitchWordmark";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import ClientFooterLayer from "../../components/ClientFooterLayer";

const NAV_LINKS = [
  { label: "Client Designs", href: "/client-designs" },
  { label: "Posters", href: "/posters", active: true },
  { label: "Esports", href: "/esports" },
  { label: "Home", href: "/" },
];

const SERVICES = [
  "Brand Identity",
  "Social Media Kits",
  "Print Design",
  "Merch & Apparel",
];

const SOCIALS = [
  {
    icon: `/svg/linktree.svg`,
    label: "Linktree",
    href: "https://linktr.ee/winstrol",
  },
  {
    icon: `/svg/x.svg`,
    label: "Twitter",
    href: "https://x.com/Winstrxl",
  },
  {
    icon: `/svg/instagram.svg`,
    label: "Instagram",
    href: "https://www.instagram.com/winstrxl?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];

const TICKER_TEXT =
  "BRAND IDENTITY · SOCIAL KITS · PRINT DESIGN · MERCH · APPAREL · ESPORTS · POSTER PRINTS · MOTION GRAPHICS · BRAND IDENTITY · SOCIAL KITS · PRINT DESIGN · MERCH · APPAREL · ESPORTS · POSTER PRINTS · MOTION GRAPHICS · ";

export default function ClientFooter() {
  const bottomLayerRef = useRef(null);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".posters-footer",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.4,
      onUpdate(e) {
        const yPercent = gsap.utils.interpolate(0, -200, e.progress);
        gsap.set(".po-footer-layer", { yPercent });
      },
    });
  }, []);

  useGSAP(() => {
    gsap.set(bottomLayerRef.current, { opacity: 0 });

    ScrollTrigger.create({
      trigger: bottomLayerRef.current,
      start: "top bottom",
      end: "top top",
      scrub: 0.4,
      onUpdate(e) {
        const opacity = gsap.utils.interpolate(0, 1, e.progress);
        gsap.set(bottomLayerRef.current, { opacity });
      },
    });
  }, []);
  const breakpoint = useMediaQuery({ maxWidth: 887 });
  return (
    <section className="posters-footer relative bg-dark-primary">
      <ClientFooterLayer />

      <div ref={bottomLayerRef} className="ftv" style={{ height: "100svh" }}>
        <div className="ftv-inner">
          <div
            className="ftv-brand-wrap"
            style={{ padding: breakpoint ? "30px 0 0 0" : "32px 36px 0" }}
          >
            <GlitchWordmark />
          </div>

          <div
            className="ftv-rule whitespace-nowrap"
            style={{ padding: breakpoint ? "12px 10px" : "14px 36px 26px" }}
          >
            <div className="ftv-rule-line" />
            <div className="ftv-rule-dot" />
            <div className="ftv-rule-center">
              <div className="ftv-avail-dot" />
              <span>Available for freelance</span>
              <span className="ftv-rule-sep">·</span>
              <span>© 2026</span>
            </div>
            <div className="ftv-rule-dot" />
            <div className="ftv-rule-line" />
          </div>

          <div className="ftv-cols">
            <div
              className="ftv-col"
              style={{ padding: breakpoint ? "12px" : "28px 36px" }}
            >
              <div className="ftv-col-lbl">Studio</div>
              <div className="ftv-tagline">
                Graphic designer &amp; visual artist. Obsessed with craft,
                contrast, and culture — building visuals for brands that refuse
                to blend in.
              </div>
              <a
                className="ftv-email"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Winstrol821@gmail.com&su=create%20me%20a%20design"
                target="_blank"
                rel="noopener noreferrer"
              >
                Winstrol821@gmail.com
              </a>{" "}
            </div>

            <div
              className="ftv-col"
              style={{ padding: breakpoint ? "12px" : "28px 36px" }}
            >
              <div className="ftv-col-lbl">Navigate</div>
              <div className="ftv-links">
                {NAV_LINKS.map(({ label, href, active }) => (
                  <Link
                    key={label}
                    to={href}
                    className={`ftv-link${active ? " ftv-link--active" : ""}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className="ftv-col"
              style={{ padding: breakpoint ? "12px" : "28px 36px" }}
            >
              <div className="ftv-col-lbl">Services</div>
              <div className="ftv-links">
                {SERVICES.map((s) => (
                  <span key={s} className="ftv-link ftv-link--sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="ftv-col ftv-col--last"
              style={{ padding: breakpoint ? "12px" : "28px 36px" }}
            >
              <div className="ftv-col-lbl">Socials</div>
              <div className="ftv-links">
                {SOCIALS.map(({ icon, label, href }) => (
                  <Link key={icon} to={href} className="ftv-social-row">
                    <img className="ftv-social-icon" src={icon} />
                    <span>{label}</span>
                    <span className="ftv-social-arr overflow-visible">
                      <svg
                        className="w-[10px] h-auto"
                        viewBox="0 0 450 450"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25 425L108.333 341.667M425 25H125M425 25V325M425 25L208.333 241.667"
                          stroke="white"
                          strokeOpacity="0.2"
                          strokeWidth="50"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className="ftv-bottom"
            style={{ padding: breakpoint ? "5px" : "10px 36px" }}
          >
            <div className="ftv-copy">winstrxl — all rights reserved 2026</div>
            <div className="ftv-ticker-wrap">
              <div className="ftv-ticker">{TICKER_TEXT}</div>
            </div>
            <div className="ftv-copy">© 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
