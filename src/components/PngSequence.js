import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { useRef } from "react";
import "../style/png-sequence.css";
gsap.registerPlugin(ScrollTrigger);
export default function ({
  startFrame,
  lastFrame,
  imgFilePathPrefix,
  framePadLength = 5,
  delayAtLast = null,
  lazyLoading = true,
  className = "",
}) {
  const containerRef = useRef();
  useGSAP(
    () => {
      const container = containerRef.current;
      let intervalId = null;
      function initAnimation() {
        container.innerHTML = "";
        for (let i = startFrame; i <= lastFrame; i++) {
          const img = document.createElement("img");
          function loadImg() {
            img.src = `./assets/${imgFilePathPrefix}${String(i).padStart(
              framePadLength,
              "0"
            )}.png`;
          }
          loadImg();
          img.classList = `image image-${i}`;
          container.appendChild(img);
        }
        function updateFrame(frame) {
          $(container).find(".image.active").removeClass("active");
          $(container).find(`.image-${frame}`).addClass("active");
        }
        updateFrame(startFrame);
        function startAnimation() {
          let currentFrame = startFrame;
          if (intervalId == null) {
            function intervalFunc() {
              currentFrame++;
              if (currentFrame > lastFrame) currentFrame = startFrame;
              updateFrame(currentFrame);
              if (currentFrame === lastFrame && delayAtLast !== null) {
                clearInterval(intervalId);
                setTimeout(() => {
                  intervalId = setInterval(intervalFunc, 40);
                }, delayAtLast);
              }
            }
            intervalId = setInterval(intervalFunc, 40);
          }
        }
        function stopAnimation() {
          clearInterval(intervalId);
          intervalId = null;
        }
        gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 100%",
            end: "bottom 0%",
            //toggleActions: "play play reverse reverse",
            scrub: false,
            markers: false,
            onEnter: startAnimation,
            onEnterBack: startAnimation,
            onLeave: stopAnimation,
            onLeaveBack: stopAnimation,
          },
        });
      }
      if (lazyLoading) {
        setTimeout(initAnimation, 3000);
      } else initAnimation();
      return () => {
        if (intervalId != null) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };
    },
    {
      scope: containerRef,
      dependencies: [startFrame, lastFrame, delayAtLast, imgFilePathPrefix],
    }
  );
  return (
    <div
      className={`png-sequence ${className ? className : ""}`}
      ref={containerRef}
    ></div>
  );
}
