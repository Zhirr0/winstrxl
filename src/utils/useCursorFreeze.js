import { useEffect } from "react";

const useCursorFreeze = (selector) => {
  useEffect(() => {
    const e = selector ? document.querySelectorAll(selector) : [];

    const freeze = () => window.dispatchEvent(new CustomEvent("cursorFreeze"));
    const unfreeze = () => window.dispatchEvent(new CustomEvent("cursorUnfreeze"));

    e.forEach(e => {
      e.addEventListener("pointerenter", freeze, { passive: true });
      e.addEventListener("pointerleave", unfreeze, { passive: true });
    });

    return () => {
      e.forEach(e => {
        e.removeEventListener("pointerenter", freeze);
        e.removeEventListener("pointerleave", unfreeze);
      });
      unfreeze();
    };
  }, [selector]);
};

export default useCursorFreeze;