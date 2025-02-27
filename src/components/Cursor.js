import { Expo, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { THEME_DESKTOP, ThemeContext } from "../ThemeContext";
import "../style/cursor.css";
import { getCenterOfElement } from "../utils";
gsap.registerPlugin(ScrollTrigger);
export default function () {
  const theme = useContext(ThemeContext);
  // State

  //CT: Cursor Type
  const CT_FOLLOW_MOUSE = 1;
  const CT_HOVER_LABEL = 2; //hoverLabel is required
  const CT_ROAD_MAP = 3; //cursorPosition{x,y} is required

  let touchCursorTween = null;
  const [cursorInfo, setCursorInfo] = useState({
    type: CT_FOLLOW_MOUSE,
  });
  const [mousePosition, setMousePosition] = useState({
    clientX: -1000,
    clientY: -1000,
  });

  function hideCuror() {
    if (touchCursorTween) touchCursorTween.kill();
    touchCursorTween = gsap.to("#cursor", {
      scale: 0,
      duration: 0.3,
      ease: "circ.out",
    });
  }
  // Effect
  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#section-7 .mid-line",
      start: "top 80%",
      end: `bottom 20%`,
      markers: false,
      onEnter: () => {
        setCursorInfo((lastCursorInfo) => ({
          lastType: lastCursorInfo.type,
          type: CT_ROAD_MAP,
          cursorPosition: getCenterOfElement("#section-7 .point-0"),
        }));
        gsap.to("#section-7 .mid-line", {
          clipPath: `inset(0% -20px calc(100% - 200px) -20px)`,
          duration: 1,
        });
      },
      onEnterBack: () => {
        setCursorInfo((lastCursorInfo) => ({
          lastType: lastCursorInfo.type,
          type: CT_ROAD_MAP,
          cursorPosition: getCenterOfElement("#section-7 .point-4"),
        }));
      },
      onLeave: () => {
        setCursorInfo((lastCursorInfo) => ({
          lastType: lastCursorInfo.type,
          type: CT_FOLLOW_MOUSE,
        }));
        if (theme !== THEME_DESKTOP) hideCuror();
      },
      onLeaveBack: () => {
        setCursorInfo((lastCursorInfo) => ({
          lastType: lastCursorInfo.type,
          type: CT_FOLLOW_MOUSE,
        }));

        if (theme !== THEME_DESKTOP) hideCuror();
      },
    });
    ScrollTrigger.create({
      trigger: "#section-7 .mid-line",
      start: "top 70%",
      end: `bottom 50%`,
      markers: false,
      onUpdate: (self) => {
        let delta = self.progress;
        const height = $("#section-7 .mid-line").height();
        setCursorInfo((lastCursorInfo) => ({
          lastType: lastCursorInfo.type,
          type: CT_ROAD_MAP,
          cursorPosition: {
            x: getCenterOfElement($("#section-7 .point-0")).x,
            y: getCenterOfElement($("#section-7 .point-0")).y + delta * height,
          },
        }));
        gsap.to("#section-7 .mid-line", {
          clipPath: `inset(0% -20px calc(${100 - self.progress * 100
            }% - 200px) -20px)`,
          duration: 1,
        });
      },
    });
  }, []);
  const [tween, setTween] = useState(null);
  useEffect(() => {
    const leftPos = gsap.quickTo("#cursor", "left", {
      duration: 1,
      ease: Expo.easeOut,
    });
    const topPos = gsap.quickTo("#cursor", "top", {
      duration: 1,
      ease: Expo.easeOut,
    });
    const getEstimatedDuration = (width, height) => {
      const oldWidth = $("#cursor").width();
      const oldHeight = $("#cursor").height();
      return (
        Math.min(Math.abs(height - oldHeight), Math.abs(width - oldWidth)) *
        0.01
      );
    };
    const updateCursorTween = (params) => {
      setTween((oldTween) => {
        if (oldTween) oldTween.kill();
        return gsap.to("#cursor", params);
      });
    };
    if (cursorInfo.type == CT_FOLLOW_MOUSE) {
      const newW = 658,
        newH = 658;
      updateCursorTween({
        width: newW,
        height: newH,
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(118, 93, 51, 0.5) 0%, rgba(118, 93, 51, 0) 100%)",
        filter: "blur(8px)",

        duration:
          cursorInfo.lastType === undefined
            ? 1
            : getEstimatedDuration(newW, newH),
      });
      leftPos(mousePosition.clientX);
      topPos(mousePosition.clientY);
    } else if (cursorInfo.type == CT_HOVER_LABEL) {
      const rect = cursorInfo.hoverLabel.getBoundingClientRect();
      const newW = rect.width + 48,
        newH = rect.height + 48;
      updateCursorTween({
        width: newW,
        height: newH,
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 127, 0.5) 0%, rgba(255, 255, 127, 0) 100%)",
        filter: "blur(40px)",

        duration: 1, //getEstimatedDuration(newW, newH),
      });
      leftPos(rect.left + rect.width / 2);
      topPos(rect.top + rect.height / 2);
    } else if (cursorInfo.type == CT_ROAD_MAP) {
      updateCursorTween({
        background:
          "radial-gradient(70.42% 185.1% at 50% -44.71%, rgba(255, 255, 255, 0.5) 0%, #FFFFFF 100%)",
        width: 152,
        height: 132,
        filter: "blur(83px)",
        scale: 1,
        duration: 1,
      });
      leftPos(
        cursorInfo.cursorPosition.x - document.documentElement.scrollLeft
      );
      topPos(cursorInfo.cursorPosition.y - document.documentElement.scrollTop);
    }
  }, [cursorInfo, mousePosition]);

  // Hover in sectional-button
  useEffect(() => {
    document
      .querySelectorAll(".sectional-button>.label")
      .forEach((buttonLabel, index) => {
        const handleMouseEnter = (event) => {
          setCursorInfo((lastCursorInfo) => ({
            lastType: lastCursorInfo.type,
            type: CT_HOVER_LABEL,
            hoverLabel: buttonLabel,
          }));
        };
        const handleMouseLeave = (event) => {
          setCursorInfo((lastCursorInfo) => ({
            lastType: lastCursorInfo.type,
            type: CT_FOLLOW_MOUSE,
          }));
        };
        buttonLabel.addEventListener("mouseenter", handleMouseEnter);
        buttonLabel.addEventListener("mouseleave", handleMouseLeave);
      });
  }, [setCursorInfo]);

  // useEffect for mousePosition
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition((prevMousePosition) => ({
        ...prevMousePosition,
        clientX: event.clientX,
        clientY: event.clientY,
      }));
    };
    const handleTouchMove = (event) => {
      if (event.changedTouches.length) {
        const { clientX, clientY } = event.changedTouches[0];
        setMousePosition((prevMousePosition) => ({
          ...prevMousePosition,
          clientX,
          clientY,
        }));
      }
    };
    const handleTouchEnd = (event) => {
      if (cursorInfo.type !== CT_ROAD_MAP) hideCuror();
    };
    const handleTouchStart = (event) => {
      if (event.changedTouches.length && cursorInfo.type !== CT_ROAD_MAP) {
        if (touchCursorTween) touchCursorTween.kill();
        const { clientX, clientY } = event.changedTouches[0];
        gsap.set("#cursor", {
          left: clientX,
          top: clientY,
        })
        touchCursorTween = gsap.to("#cursor", {
          scale: 1,
          duration: 0.5,
          ease: "circ.out",
        });

        setMousePosition((prevMousePosition) => ({
          ...prevMousePosition,
          clientX,
          clientY,
        }));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    if (theme !== THEME_DESKTOP) {
      if (cursorInfo.type === CT_FOLLOW_MOUSE)
        gsap.to("#cursor", {
          scale: 0,
        });
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("touchstart", handleTouchStart);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (theme !== THEME_DESKTOP) {
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, [theme, cursorInfo]);
  return <div id="cursor"></div>;
}
