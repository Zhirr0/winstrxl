import { useMediaQuery } from "react-responsive";

const HeroSvgPath = () => {
  const isMiniIpad = useMediaQuery({ maxWidth: 1024 });
  const pathData = isMiniIpad
    ? `
M0 0
V1
H0.38125
C0.39417 1 0.38708 0.94001 0.40520 0.94001
H0.5975
C0.61542 0.94001 0.60792 1 0.62083 1
H1
V0
H0
Z

  `
    : `
M0 0
V1
H0.42208
C0.435 1 0.42792 0.94480 0.44604 0.94480
H0.55583
C0.57375 0.94480 0.56625 1 0.57917 1
H1
V0
H0
Z



`;
  return (
    <svg width="0" height="0" viewBox="0 0 1201 683" aria-hidden="true">
      <defs>
        <clipPath id="hero-container" clipPathUnits="objectBoundingBox">
          <path d={pathData.trim()} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HeroSvgPath;
