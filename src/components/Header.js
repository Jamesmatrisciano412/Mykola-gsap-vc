import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import $ from "jquery";
import { useRef } from "react";
import SplitType from "split-type";
import "../style/Header.css";
import { wrapByLineWrapper } from "../utils";
import PngSequence from "./PngSequence";
export default function () {
  /*
  // Head items
  gsap.fromTo(
    ".menu-item",
    {
      y: -60,
    },
    {
      y: 0,
      ease: "power3.out",
      duration: 1,
      stagger: {
        each: 0.1,
      },
    }
  );
  */
  const headerRef = useRef();
  useGSAP(
    () => {
      const headerElement = headerRef.current;
      const _headerEle = $(headerElement);
      const tl = gsap
        .timeline({
          paused: true,
          defaults: { ease: "circ.out", duration: 0.5 },
        })
        .set(headerElement, {
          height: "100vh",
        })
        .to(headerElement, {
          backgroundImage:
            "linear-gradient(90deg, rgba(46, 43, 33, 0.95) 0%, #161E29 40%)",
          ease: "power3.inOut",
        })
        .from(wrapByLineWrapper(_headerEle.find(".interact .title")[0]), {
          opacity: 0,
          filter: "blur(4px)",
          y: "100%",
        })
        .from(
          wrapByLineWrapper(_headerEle.find(".contact .title")[0]),
          {
            opacity: 0,
            filter: "blur(4px)",
            y: "100%",
          },
          "<"
        )
        .from(
          _headerEle
            .find(".link")
            .map((index, item) => wrapByLineWrapper(item)),
          {
            opacity: 0,
            filter: "blur(4px)",
            y: "100%",
            duration: 1,
          },
          "<"
        )
        .from(
          new SplitType(_headerEle.find(".interact .info"), {
            types: "lines",
          }).lines.map((line) => wrapByLineWrapper(line)),
          {
            opacity: 0,
            filter: "blur(4px)",
            y: "100%",
          },
          "<+0.3"
        )
        .from(
          new SplitType(_headerEle.find(".contact .info"), {
            types: "lines",
          }).lines.map((line) => wrapByLineWrapper(line)),
          {
            opacity: 0,
            filter: "blur(4px)",
            y: "100%",
          },
          "<"
        );
      //.set(".container", { visibility: "visible" });
      const _menuToggle = $(".menu-toggle");
      const handleMenuToggleBtn = () => {
        _menuToggle.toggleClass("active");
        if (tl.paused()) tl.play();
        else tl.reversed(!tl.reversed());
      };
      _menuToggle.on("click", handleMenuToggleBtn);
      return () => {
        _menuToggle.off("click", handleMenuToggleBtn);
      };
    },
    { scope: headerRef, dependencies: [] }
  );
  return (
    <div className="header" ref={headerRef}>
      <div className="nav">
        <div className="title menu-item">
          <PngSequence
            startFrame={0}
            lastFrame={23}
            imgFilePathPrefix={"header_logo/Logo_only_reveal_"}
            delayAtLast={12000}
            lazyLoading={false}
          />
          <span>Blockstrata VC</span>
        </div>
        {/* <div className="menu-list">
          {["Portfolio", "Insights", "Approach", "Contact"].map(
            (item, index) => (
              <div className="menu-item" key={index}>
                {item}
              </div>
            )
          )}
        </div> */}
        <div className="menu-toggle"></div>
      </div>
      <div className="content">
        <div className="extra">
          <div className="interact">
            <div className="title">Interact</div>
            <div className="info">
              X <br />
              Linkedin <br />
              Github <br />
              YouTube <br />
              TikTok <br />
              Instagram <br />
              Facebook
            </div>
          </div>
          <div className="contact">
            <div className="title">Contact</div>
            <div className="info">
              New York Office (HQ) <br />
              Suite 712 <br />
              213 Avenue of the Americas <br />
              New York, NY 10001 <br />
              USA <br />
              +1 (212) - 555 - 7984
            </div>
          </div>
        </div>
        <div className="links">
          {[
            "Portfolio",
            "Our Approach",
            "Case Studies",
            "Insights",
            "Meet our Team",
            "Work with Us",
          ].map((value, index) => (
            <div className="link" key={index}>
              <div className="text">{value}</div>
              <div className="icon">
                <svg
                  width="21"
                  height="15"
                  viewBox="0 0 21 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 7.5L7.619 7.5L19.5237 7.5"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14.7617 14.5L19.9998 7.5008L14.7617 1.0008"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
