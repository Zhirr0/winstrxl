import { useMediaQuery } from "react-responsive";

const NavSvgPath = () => {
  const isMiniIpad = useMediaQuery({ maxWidth: 600 });

  return isMiniIpad ? (
    /* SMALL (UNCHANGED) */
    <svg width="0" height="0" viewBox="0 0 1269 200" aria-hidden="true">
      <defs>
        <clipPath id="wave-container" clipPathUnits="objectBoundingBox">
          <path
            d="
              M0 0
              V1
              C0.00435 1 0.00788 0.977615 0.00788 0.95
              V0.3575
              C0.00788 0.274657 0.01846 0.2075 0.03156 0.2075
              H0.3597
              C0.3765 0.2075 0.39143 0.274946 0.39693 0.37554
              L0.4220 0.83196
              C0.42750 0.93255 0.44243 1 0.45923 1
              H0.56465
              C0.58230 1 0.59780 0.92545 0.60257 0.81758
              L0.62148 0.38992
              C0.62625 0.28205 0.64175 0.2075 0.65940 0.2075
              H0.96742
              C0.98204 0.2075 0.99249 0.274657 0.99249 0.3575
              V0.95
              C0.99249 0.977615 0.99691 1 1 1
              V0
              H0
              Z
            "
          />
        </clipPath>
      </defs>
    </svg>
  ) : (
    /* LARGE (NEW PATH) */
    <svg width="0" height="0" viewBox="0 0 1269 200" aria-hidden="true">
      <defs>
        <clipPath id="wave-container" clipPathUnits="objectBoundingBox">
          <path
            d="
              M0 0
              V1
              C0.00435 1 0.00788 0.977615 0.00788 0.95
              V0.3075
              C0.00788 0.25227 0.01493 0.2075 0.02364 0.2075
              H0.40422
              C0.41111 0.2075 0.41719 0.23580 0.41926 0.27742
              L0.45171 0.93009
              C0.45378 0.97170 0.45986 1 0.46675 1
              H0.52244
              C0.52933 1 0.53541 0.97170 0.53748 0.93009
              L0.56993 0.27742
              C0.57200 0.23580 0.57808 0.2075 0.58497 0.2075
              H0.9740
              C0.98271 0.2075 0.98976 0.25227 0.98976 0.3075
              V0.95
              C0.98976 0.977615 0.99328 1 1 1
              V0
              H0
              Z
            "
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NavSvgPath;
