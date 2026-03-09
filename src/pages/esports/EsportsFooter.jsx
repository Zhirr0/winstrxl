import { useMediaQuery } from "react-responsive";
import GlitchWordmark from "../../components/GlitchWordmark";
import "../../styles/footer.css";
import { Link } from "react-router-dom";
import EsportsFooterLayer from "./EsportsTopLayer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
const NAV_LINKS = [
  { label: "Client Designs", href: "/client-designs" },
  { label: "Posters", href: "/posters" },
  { label: "Esports", href: "/esports", active: true },
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
    icon: `<svg viewBox="0 0 136 170" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M44.5268 59.2569C44.6439 58.1883 44.653 56.8048 43.9659 56.1039C36.2754 48.259 28.4446 40.5518 20.7395 32.7209C19.3735 31.3326 17.9378 29.7006 17.3592 27.914C16.1131 24.0664 17.1005 20.6032 20.7767 18.4245C24.9241 15.9666 28.8155 16.7442 32.1375 20.0193C39.7266 27.5013 47.2279 35.0725 54.7478 42.6244C55.9933 43.8752 57.1524 45.2119 59.2953 47.5299C59.2953 34.172 59.285 22.2675 59.3083 10.363C59.3112 8.87522 59.2302 7.31151 59.6384 5.91461C60.8111 1.90243 64.7455 -0.466586 68.9315 0.0772059C73.2693 0.640692 76.1338 3.91071 76.1712 8.75448C76.2547 19.5846 76.2 30.4159 76.2016 41.2466C76.2018 42.8406 76.2016 44.4345 76.2016 47.6029C85.4216 38.2234 93.6025 29.8224 101.895 21.5328C103.511 19.9172 105.372 18.1359 107.45 17.483C111.16 16.3173 114.814 17.0994 117.119 20.6738C119.625 24.56 119.081 28.3601 115.899 31.5925C107.844 39.7741 99.6841 47.8523 91.572 55.9777C90.7733 56.7776 90.0145 57.6173 88.4602 59.2593C92.5233 59.2593 95.7429 59.2593 98.9625 59.2593C107.794 59.2594 116.625 59.2216 125.456 59.2721C131.849 59.3086 135.464 62.4514 135.494 67.8407C135.523 73.192 131.972 76.3307 125.439 76.3784C113.517 76.4654 101.595 76.4031 89.6733 76.4031C89.3761 76.83 89.0789 77.2568 88.7817 77.6837C95.7953 84.4149 102.815 91.1402 109.819 97.8813C111.738 99.7287 113.669 101.57 115.495 103.507C119.25 107.49 119.593 112.69 116.404 116.036C112.883 119.731 107.447 119.576 103.105 115.302C94.803 107.131 86.6656 98.7937 78.4448 90.5402C74.9381 87.0195 71.3934 83.5365 67.87 80.0402C56.2822 91.5462 44.8769 102.946 33.3578 114.229C31.6318 115.919 29.5505 117.678 27.3202 118.325C23.7262 119.368 20.4097 118.189 18.3023 114.742C15.8478 110.727 16.6218 107.073 19.7728 103.878C27.6029 95.9385 35.5084 88.0737 43.3764 80.1717C44.3101 79.234 45.1987 78.2512 46.6187 76.7494C44.8572 76.6022 43.67 76.4192 42.4824 76.4167C31.6516 76.3942 20.8202 76.4718 9.99024 76.3767C3.56734 76.3203 0.0277538 73.1243 0.000154757 67.7121C-0.0271132 62.3655 3.54984 59.3055 10.1032 59.2743C21.4337 59.2205 32.7647 59.2592 44.5268 59.2569Z" fill="#FBFBFB"/>
<path d="M59.5008 163.374C59.3486 148.476 59.2861 133.988 59.3209 119.501C59.3345 113.861 62.5888 110.328 67.5495 110.262C72.7974 110.192 76.1568 113.739 76.1803 119.616C76.2336 132.939 76.1233 146.262 76.2439 159.584C76.2864 164.282 74.7205 167.892 70.0857 169.184C65.201 170.546 61.721 168.29 59.5008 163.374Z" fill="#FAFAFA"/>
</svg>
`,
    label: "Linktree",
    href: "https://linktr.ee/winstrol",
  },
  {
    icon: `<svg  viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.49 22L13.695 9.178L13.71 9.19L21.64 0H18.99L12.53 7.48L7.4 0H0.45L8.661 11.971L8.66 11.97L0 22H2.65L9.832 13.678L15.54 22H22.49ZM6.35 2L18.69 20H16.59L4.24 2H6.35Z" fill="white"/>
</svg>
`,
    label: "Twitter",
    href: "https://x.com/Winstrxl",
  },
  {
    icon: `<svg  viewBox="0 0 363 362" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M158.215 361.755C140.553 361.69 123.388 361.81 106.231 361.491C95.5895 361.294 84.9569 360.471 74.5098 358.15C35.6241 349.51 12.4448 325.34 3.86597 286.726C0.923316 273.481 0.348273 259.964 0.252906 246.518C-0.0519952 203.533 -0.130853 160.541 0.296882 117.558C0.460334 101.134 1.11411 84.6152 5.66584 68.5789C16.3282 31.0145 41.2786 9.59818 79.445 3.0407C92.4466 0.806858 105.601 0.231808 118.739 0.177166C160.393 0.00392452 202.051 -0.132534 243.702 0.220676C263.497 0.388531 283.427 0.946362 302.321 8.00603C334.229 19.928 351.808 43.7604 358.526 76.4734C361.761 92.2247 362.139 108.237 362.288 124.173C362.662 164.325 362.667 204.485 362.264 244.637C362.083 262.749 361.498 280.99 355.543 298.426C343.933 332.419 320.169 352.263 284.961 358.711C272.959 360.908 260.857 361.636 248.688 361.65C218.697 361.685 188.706 361.72 158.215 361.755ZM34.5161 224.833C34.9933 242.464 34.4269 260.179 37.5812 277.626C41.7017 300.417 53.42 316.746 76.8086 323.253C91.9574 327.467 107.472 327.644 122.897 327.822C160.719 328.26 198.55 328.094 236.376 327.929C248.354 327.876 260.373 327.646 272.272 326.034C301.04 322.136 317.861 308.875 324.197 280.697C327.441 266.269 327.477 251.571 327.671 236.978C328.136 201.823 328.147 166.655 327.715 131.5C327.529 116.385 327.004 101.24 325.007 86.1633C321.327 58.3748 302.63 39.9206 275.076 36.4115C256.815 34.0858 238.5 34.3376 220.218 33.8996C194.071 33.2732 167.886 33.2699 141.739 33.8838C123.458 34.3129 105.132 33.9554 86.8889 36.4607C61.055 40.0083 43.9083 55.2647 38.43 80.6344C34.8172 97.365 34.885 114.405 34.6574 131.351C34.2434 162.174 34.5233 193.006 34.5161 224.833Z" fill="white"/>
<path d="M99.4548 221.977C72.8735 168.012 103.404 104.504 161.832 91.522C212.86 80.1842 263.301 114.976 271.696 166.527C279.921 217.037 244.323 264.242 194.003 271.4C155.238 276.915 119.323 257.983 99.4548 221.977ZM132.497 210.515C143.662 227.588 159.393 237.3 179.79 237.885C215.175 238.9 239.208 208.708 238.249 179.594C237.049 143.17 203.484 116.775 168.008 125.263C129.84 134.395 112.95 177.402 132.497 210.515Z" fill="white"/>
<path d="M280.712 63.1573C294.993 65.8367 304.474 82.9258 294.149 97.3525C288.552 105.173 277.689 108.111 268.643 104.283C259.062 100.229 253.953 90.3366 255.965 79.7344C257.729 70.4399 266.218 63.2516 275.789 62.9863C277.284 62.9448 278.784 63.0591 280.712 63.1573Z" fill="white"/>
</svg>
`,
    label: "Instagram",
    href: "https://www.instagram.com/winstrxl?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];

const TICKER_TEXT =
  "BRAND IDENTITY · SOCIAL KITS · PRINT DESIGN · MERCH · APPAREL · ESPORTS · POSTER PRINTS · MOTION GRAPHICS · BRAND IDENTITY · SOCIAL KITS · PRINT DESIGN · MERCH · APPAREL · ESPORTS · POSTER PRINTS · MOTION GRAPHICS · ";

export default function Footer() {
  const bottomLayerRef = useRef(null);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".esports-footer",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.4,
      onUpdate(e) {
        const yPercent = gsap.utils.interpolate(0, -250, e.progress);
        gsap.set(".footer-top-layer", { yPercent });
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
    <section className="esports-footer relative">
      <EsportsFooterLayer />

      <div ref={bottomLayerRef} className="ftv" style={{ height: "100svh" }}>
        <div className="ftv-grid-bg" />
        <div className="ftv-scan" />
        <div className="ftv-vign" />

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
              </a>
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
                    <div
                      className="ftv-social-icon"
                      dangerouslySetInnerHTML={{ __html: icon }}
                    />{" "}
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
