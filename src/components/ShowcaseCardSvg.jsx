import { forwardRef } from "react";

const ShowcaseCardSvg = forwardRef(function ShowcaseCardSvg({ fill }, ref) {
  return (
    <svg
      className={`w-auto
        max-[900px]:scale-120 max-[900px]:translate-x-5
        max-[768px]:scale-60 max-[768px]:-translate-y-2 max-[768px]:-translate-x-41
        max-[740px]:-translate-x-40 max-[700px]:-translate-x-37
        max-[650px]:-translate-x-35 max-[650px]:-translate-y-3
        max-[590px]:-translate-x-26 max-[590px]:scale-65 max-[590px]:-translate-y-4
        max-[520px]:-translate-x-22 max-[520px]:-translate-y-4 max-[520px]:scale-70
        max-[460px]:scale-75 max-[460px]:-translate-x-18
        max-[400px]:scale-90 max-[400px]:-translate-x-10
      `}
      viewBox="0 0 4817 1584"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={ref}
        d="M375.08 1208L557.622 381.702C558.051 379.757 560.75 379.567 561.448 381.433L869.652 1205.62C869.97 1206.47 871.166 1206.49 871.513 1205.65L1211.29 381.856C1212.07 379.975 1214.83 380.319 1215.12 382.333L1333.7 1205.12C1333.84 1206.06 1335.09 1206.3 1335.56 1205.48L1807.07 380.361C1808.03 378.687 1810.57 379.202 1810.8 381.116L1908.9 1204.68C1909.02 1205.67 1910.35 1205.9 1910.79 1205.01L2321.86 380.559C2322.72 378.83 2325.29 379.207 2325.62 381.111L2467.95 1204.61C2468.12 1205.6 2469.47 1205.75 2469.86 1204.83L2812.65 382.132C2813.44 380.233 2816.24 380.622 2816.48 382.664L2914.58 1204.98C2914.69 1205.94 2915.97 1206.2 2916.44 1205.36L3385.93 379.759C3386.85 378.15 3389.27 378.541 3389.63 380.356L3554.5 1204.92C3554.69 1205.88 3556 1206.02 3556.4 1205.13L3924.39 380.007C3925.15 378.315 3927.6 378.47 3928.13 380.243L4177.19 1204.9C4177.47 1205.84 4178.8 1205.85 4179.1 1204.91L4441.08 375.101"
        stroke={fill}
        strokeWidth="750"
        strokeLinecap="round"
      />
    </svg>
  );
});

export default ShowcaseCardSvg;