import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { useRef } from "react";
import SplitType from "split-type";
import "../style/card.css";
import "../style/first-card.css";
import { wrapByLineWrapper } from "../utils";
import CardButton from "./CardButton";

gsap.registerPlugin(ScrollTrigger);
function FirstCard({
  info: { title, content, bgImage, tags },
  className = null,
}) {
  const firstCardRef = useRef();
  useGSAP(
    () => {
      const _cardEle = $(firstCardRef.current);
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
            tl.from(
              new SplitType(_cardEle.find("pre"), {
                types: "lines",
              }).lines.map((line) => wrapByLineWrapper(line)),
              {
                opacity: 0,
                y: "100%",
                duration: 0.5,
              },
              "<+0.3"
            )
              .from(
                new SplitType(_cardEle.find("h4"), {
                  types: "lines",
                }).lines.map((line) => wrapByLineWrapper(line)),
                {
                  opacity: 0,
                  y: "100%",
                  stagger: 0.1,
                  duration: 0.5,
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
                  duration: 0.5,
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
          },
          // onLeaveBack: function () {
          //   _cardEle.removeClass("loaded");
          // },
        },
        defaults: {
          ease: "circ.out",
          duration: 1,
        },
      });

      return () => {};
    },
    { scope: firstCardRef, dependencies: [] }
  );
  return (
    <div
      className={"card first-card" + " " + (className ? className : "")}
      ref={firstCardRef}
    >
      <img className="bg-image border-animate" src={`./assets/${bgImage}`} />
      <div className="bg-overlay"></div>
      <pre>{title}</pre>
      <h4>{content}</h4>
      <div className="card-footer">
        <div className="tag-list">
          {tags.map((tag, index) => (
            <div className="tag-item" key={index}>
              #{tag}
            </div>
          ))}
        </div>
        <CardButton />
      </div>
    </div>
  );
}

export default FirstCard;