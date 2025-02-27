import { useGSAP } from "@gsap/react";
import gsap, { Expo } from "gsap";
import React, { useRef } from "react";
function MagneticEffect({ children }) {
  const magneticRef = useRef(null);
  useGSAP(() => {
    /* const xPos = gsap.quickTo(magneticRef.current, "x", {
      duration: 2.2,
      ease: Expo.easeOut,
    });
    const yPos = gsap.quickTo(magneticRef.current, "y", {
      duration: 2.2,
      ease: Expo.easeOut,
    }); */
    const heightUpdate = gsap.quickTo(magneticRef.current, "height", {
      duration: 0.2,
      ease: Expo.easeOut,
    });
    const widthUpdate = gsap.quickTo(magneticRef.current, "width", {
      duration: 0.2,
      ease: Expo.easeOut,
    });
    const { height: originalHeight, width: originalWidth } =
      magneticRef.current.getBoundingClientRect();
    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } =
        magneticRef.current.getBoundingClientRect();
      /* const x = clientX - (left + width / 1.5);
      const y = clientY - (top + height); */
      /* xPos(x);
      yPos(y); */
      const middleY = top + height / 2;
      const middleX = left + width / 2;
      const newHeight = Math.max(
        2 * Math.abs(clientY - middleY) + 100,
        originalHeight
      );
      const newWidth = Math.max(
        2 * Math.abs(clientX - middleX) + 30,
        originalWidth
      );
      // heightUpdate(newHeight);
      // widthUpdate(newWidth);
      if (newHeight < width + 100) heightUpdate(newHeight);
      //else heightUpdate(width + 40);
    };
    const mouseLeave = (e) => {
      /* xPos(0);
      yPos(0); */
      heightUpdate(originalHeight);
    };
    magneticRef.current.addEventListener("mousemove", mouseMove);
    magneticRef.current.addEventListener("mouseleave", mouseLeave);
    return () => {
      magneticRef.current.removeEventListener("mousemove", mouseMove);
      magneticRef.current.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);
  return React.cloneElement(children, { ref: magneticRef });
}
export default MagneticEffect;
