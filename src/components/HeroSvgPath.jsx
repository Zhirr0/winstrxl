import { useMediaQuery } from "react-responsive";

const HeroSvgPath = () => {
  const isMiniIpad = useMediaQuery({ maxWidth: 650 });
  const pathData = isMiniIpad
    ? `
M0.000416 0.000732
V0.999268
H0.36240
C0.36801 0.999268 0.37293 0.99269 0.37443 0.98319
L0.38600 0.91022
C0.38750 0.90072 0.39242 0.89414 0.39803 0.89414
H0.60397
C0.60958 0.89414 0.61450 0.90072 0.61600 0.91022
L0.62756 0.98319
C0.62907 0.99269 0.63399 0.999268 0.63960 0.999268
H0.999584
V0.000732
H0.000416
Z

  `
    : `
M0 0
V1
H0.405417
C0.413433 1 0.414969 0.990348 0.417882 0.977489
L0.429167 0.905625
C0.432079 0.892746 0.437188 0.892506 0.445204 0.892506
H0.556667
C0.564683 0.892506 0.568193 0.892746 0.571106 0.905625
L0.582118 0.977489
C0.585031 0.990348 0.58615 1 0.594167 1
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
