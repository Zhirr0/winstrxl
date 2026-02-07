import { useMediaQuery } from "react-responsive";

const HeroSvgPath = () => {
  const isMiniIpad = useMediaQuery({ maxWidth: 650 });
  const pathData = isMiniIpad
    ? `
  M0.000416 0.000732
V0.999268
H0.35903
C0.36659 0.999268 0.37345 0.98952 0.37574 0.97739
L0.38497 0.91475
C0.38726 0.90262 0.39412 0.892874 0.40168 0.892874
H0.59832
C0.60588 0.892874 0.61274 0.90262 0.61503 0.91475
L0.62426 0.97739
C0.62655 0.98952 0.63341 0.999268 0.64097 0.999268
H0.999584
V0.000732
H0.000416
Z

  `
    : `
M0.000416 0.000732
V0.999268
H0.39975
C0.40776 0.999268 0.41504 0.98963 0.41795 0.97679
L0.42705 0.91443
C0.42996 0.90157 0.43724 0.891932 0.44525 0.891932
H0.55475
C0.56276 0.891932 0.57004 0.90157 0.57295 0.91443
L0.58205 0.97679
C0.58496 0.98963 0.59224 0.999268 0.60025 0.999268
H0.999584
V0.000732
H0.000416
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
