// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useRef } from "react";

let hasLoadedOnce = false;

const ColumnBounce = (OgComponent) => {
  return function TransitionWrapper(props) {
    const isFirstLoad = useRef(!hasLoadedOnce);
    if (isFirstLoad.current) hasLoadedOnce = true;

    const cols = 10;
    const center = (cols - 1) / 2;

    return (
      // ✅ No overflow-hidden here — it breaks position:fixed children
      <div className="relative">
        <OgComponent {...props} />

        {/* Slide Out */}
        <div className="slide-out">
          {Array.from({ length: cols }).map((_, i) => {
            const distFromCenter = Math.abs(i - center);
            const delay = (distFromCenter / center) * 0.3;

            return (
              <motion.div
                key={`out-${i}`}
                className="absolute top-0 bottom-0 bg-transition-gray"
                style={{
                  left: `${i * (100 / cols)}%`,
                  width: `${102 / cols}%`,
                  zIndex: 1000000000000000,
                }}
                initial={{ y: isFirstLoad.current ? "-110%" : "0%" }}
                animate={{ y: "-110%" }}
                exit={{ y: "-110%" }}
                transition={{
                  duration: 0.7,
                  delay,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />
            );
          })}
        </div>

        {/* Slide In */}
        <div className="slide-in">
          {Array.from({ length: cols }).map((_, i) => {
            const distFromCenter = Math.abs(i - center);
            const delay = (distFromCenter / center) * 0.3;

            return (
              <motion.div
                key={`in-${i}`}
                className="absolute top-0 bottom-0 bg-transition-gray"
                style={{
                  left: `${i * (100 / cols)}%`,
                  width: `${102 / cols}%`,
                  zIndex: 1000000000000000,
                }}
                initial={{ y: "-110%" }}
                animate={{ y: "-110%" }}
                exit={{ y: "0%" }}
                transition={{
                  duration: 0.7,
                  delay,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };
};

export default ColumnBounce;