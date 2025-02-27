import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import $ from "jquery";
import { useContext, useRef } from "react";
import SplitType from "split-type";
import { THEME_DESKTOP, ThemeContext } from "../ThemeContext";
import "../style/card.css";
import "../style/second-card.css";
import { wrapByLineWrapper } from "../utils";
import CardButton from "./CardButton";

// This card is used in Section 6 and 12
function SecondCard({
  info: { imageFile, shortDesc, longDesc, date, tag1, tag2 },
  className,
}) {
  const theme = useContext(ThemeContext);
  const secondCardRef = useRef();
  useGSAP(
    () => {
      const _cardEle = $(secondCardRef.current);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: _cardEle,
          start: "top 100%",
          end: "bottom 0%",
          scrub: false,
          markers: false,
          once: true,
          onEnter: function () {
            _cardEle.addClass("loaded");
          },
        },
        defaults: {
          ease: "circ.out",
          duration: 0.5,
        },
      });
      document.fonts.ready.then(() => {
        tl.from(
          _cardEle.find(".image"),
          {
            opacity: 0,
            duration: 0.5,
          },
          "<+0.2"
        )
          .from(
            new SplitType(_cardEle.find(".short-desc"), {
              types: "lines",
            }).lines.map((line) => wrapByLineWrapper(line)),
            {
              opacity: 0,
              y: "100%",
              duration: 0.5,
            },
            "<"
          )
          .from(
            new SplitType(_cardEle.find(".long-desc"), {
              types: "lines",
            }).lines.map((line) => wrapByLineWrapper(line)),
            {
              opacity: 0,
              y: "100%",
              stagger: 0.1,
              duration: 0.4,
            },
            "<"
          )
          .from(
            _cardEle
              .find(".tag-item")
              .map((index, item) => wrapByLineWrapper(item)),
            {
              opacity: 0,
              y: "100%",
              stagger: 0.1,
              duration: 0.4,
            },
            "<"
          )
          .from(
            _cardEle.find(".card-button .title"),
            {
              opacity: 0,
              y: "100%",
              duration: 0.5,
            },
            "<"
          )
          .from(
            _cardEle.find(".card-button .icon"),
            {
              clipPath: "circle(0%)",
              duration: 0.2,
            },
            "<+0.1"
          )
          .from(
            _cardEle.find(".card-button .icon svg"),
            {
              clipPath: "inset(0% 100% 0% 0%)",
              duration: 0.2,
            },
            "<+0.3"
          );
      });
    },
    { scope: secondCardRef, dependencies: [] }
  );
  return (
    <div
      className={"card second-card" + " " + (className ? className : "")}
      ref={secondCardRef}
    >
      <div className="bg-overlay"></div>
      <img className="image" src={`./assets/${imageFile}`} />
      {theme === THEME_DESKTOP && <div className="short-desc">{shortDesc}</div>}
      <div className="info-col">
        {theme !== THEME_DESKTOP && (
          <div className="short-desc">{shortDesc}</div>
        )}
        <div className="long-desc">{longDesc}</div>
        <div className="card-footer">
          <div className="date tag-item">{date}</div>
          <div className="tag1 tag-item">{tag1}</div>
          <div className="tag2 tag-item">{tag2}</div>
          <CardButton />
        </div>
      </div>
    </div>
  );
}

export default SecondCard;
