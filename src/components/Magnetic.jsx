import { useRef, useEffect } from "react";
import gsap from "gsap";

const MagnetoSVG = ({ children, containerClassName = "" }) => {
  const magnetoRef = useRef(null);
  const magnetoContentRef = useRef(null);
  const isTouchingRef = useRef(false);

  useEffect(() => {
    const magneto = magnetoRef.current;
    const magnetoContent = magnetoContentRef.current;

    if (!magneto || !magnetoContent) return;

    const config = {
      magnetoContentStrength: 20,
      touchGrabContentStrength: 20,
    };

    const calculatePosition = (clientX, clientY) => {
      const boundBox = magneto.getBoundingClientRect();
      const newX = (clientX - boundBox.left) / magneto.offsetWidth - 0.5;
      const newY = (clientY - boundBox.top) / magneto.offsetHeight - 0.5;
      return { x: newX, y: newY };
    };

    const activeMagneto = (event) => {
      if (isTouchingRef.current) return;

      const { x: newX, y: newY } = calculatePosition(
        event.clientX,
        event.clientY
      );

      gsap.to(magnetoContent, {
        duration: 1,
        x: newX * config.magnetoContentStrength,
        y: newY * config.magnetoContentStrength,
        ease: "power4.out",
      });
    };

    const deactivateMagneto = () => {
      if (isTouchingRef.current) return;

      gsap.to(magnetoContent, {
        duration: 1,
        x: 0,
        y: 0,
        ease: "elastic.out",
      });
    }; 

    magneto.addEventListener("mousemove", activeMagneto);
    magneto.addEventListener("mouseleave", deactivateMagneto);
    return () => {
      magneto.removeEventListener("mousemove", activeMagneto);
      magneto.removeEventListener("mouseleave", deactivateMagneto);
    };
  }, []);

  return (
    <div className={`magnetoWrapper`}>
      <div className={`magneto`} ref={magnetoRef}>
        <div
          className={`svg-content ${containerClassName}`}
          ref={magnetoContentRef}
          style={{ willChange: "transform" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MagnetoSVG;