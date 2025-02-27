import { gsap } from "gsap";
import $ from "jquery";
import { useContext, useRef } from "react";
import SplitType from "split-type";

import SectionalButton from "../components/SectionalButton";

import { useGSAP } from "@gsap/react";
import { THEME_IPHONE, ThemeContext } from "../ThemeContext";
import "../style/section-1.css";
export default function () {
  const sectionRef = useRef();
  const theme = useContext(ThemeContext);
  useGSAP(
    () => {
      const landingText = document.querySelector("#section-1>.landing-text");
      const splitType = new SplitType(landingText, {
        types: ["chars"],
      });
      const landingLines = document.querySelectorAll(
        "#section-1>.landing-text>.landing-line"
      );
      const tl = gsap
        .timeline()
        .set(landingLines, { position: "static", display: "block" })
        .fromTo(
          splitType.chars,
          {
            color: "#233246ff",
            opacity: 0,
          },
          {
            opacity: 0.95,
            stagger: {
              each: 0.025,
            },
            duration: 0.01,
          }
        )
        .to(
          splitType.chars,
          {
            opacity: 1,
            color: "white",
            stagger: {
              each: 0.025,
            },
            duration: 0.01,

            onComplete: () => {
              const texts = theme === THEME_IPHONE ? [
                "sustainable and <br/> thriving digital",
                "secure and resilient <br/> data fabric for the",
                "innovative and <br/> blockchain-integrated",
              ] : [
                "sustainable and thriving digital",
                "secure and resilient data fabric for the",
                "innovative and blockchain-integrated",
              ];
              let shiftingSplit = null;
              let nextTextIndex = 1;
              function updateText() {
                if (shiftingSplit !== null) shiftingSplit.revert();
                const shiftingLine = $(
                  "#section-1>.landing-text>.shifting-line"
                );
                shiftingLine.html(texts[nextTextIndex]);
                shiftingSplit = new SplitType(
                  "#section-1>.landing-text>.shifting-line",
                  {
                    types: ["lines", "chars"],
                  }
                );
                tl.fromTo(
                  shiftingSplit.chars,
                  {
                    y: "100%",
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    onComplete: function () {
                      nextTextIndex = (nextTextIndex + 1) % texts.length;
                      setTimeout(updateText, 700);
                    },
                  }
                );
              }
              setTimeout(updateText, 700);
              /*shiftingLine.innerHTML =
              "<div class='content'>sustainable and thriving digital</div>";
            const shiftingContent = shiftingLine.firstElementChild;
            
            //for (let i = 0; i < 2; i++) {}*/
            },
          },
          "<+0.35"
        );
    },
    { scope: sectionRef, dependencies: [] }
  );
  return (
    <div className="section" id="section-1" ref={sectionRef}>
      <div className="landing-text">
        {theme === THEME_IPHONE ? (
          <>
            <div className="landing-line">
              Our fund is <br />
              accelerating <br />
              investment in viable,
            </div>
            <div className="landing-line">
              technology-focused <br />
              proposals to deliver the
            </div>
          </>
        ) : (
          <>
            <div className="landing-line">
              Our fund is accelerating investment in viable,
            </div>
            <div className="landing-line">
              technology-focused proposals to deliver the
            </div>
          </>
        )}

        <div className="landing-line shifting-line">
          sustainable and {theme === THEME_IPHONE ? <br /> : ''}
          thriving digital
        </div>
        <div className="landing-line">economy of tomorrow.</div>
      </div>
      <SectionalButton label="Explore our future" type="down" />
    </div>
  );
}
