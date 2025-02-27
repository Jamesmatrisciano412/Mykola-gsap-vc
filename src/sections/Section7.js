import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { useContext, useEffect } from "react";
import SplitType from "split-type";
import Divider from "../components/Divider";
import PngSequence from "../components/PngSequence";
import SectionalButton from "../components/SectionalButton";
import "../style/section-7.css";
import { wrapByLineWrapper } from "../utils";
import { THEME_IPAD, ThemeContext } from "../ThemeContext";
gsap.registerPlugin(ScrollTrigger);
export default function () {
  const theme = useContext(ThemeContext);
  const boxInfo = [
    {
      title: "Discovery",
      content: (
        <>
          An initial focus is placed on advanced market research techniques,
          conducting in-depth customer interviews, and performing a competitive
          analysis to gather actionable insights and initiate the development of
          an impactful solution.
        </>
      ),
      pngSequence: (
        <PngSequence
          startFrame={0}
          lastFrame={110}
          imgFilePathPrefix={"sec7-card1/1-Discovery_"}
        />
      ),
    },
    {
      title: "Product Market Fit",
      content: (
        <>
          An initial focus is placed on advanced market research techniques,
          conducting in-depth customer interviews, and performing a competitive
          analysis to gather actionable insights and initiate the development of
          an impactful solution.
        </>
      ),
      pngSequence: (
        <PngSequence
          startFrame={0}
          lastFrame={103}
          imgFilePathPrefix={"sec7-card2/4-Product-Market-Fit_"}
        />
      ),
    },
    {
      title: "Series A",
      content: (
        <>
          Securing Series A funding is pivotal for scaling. Once we have
          highlighted a product’s unique market potential and traction, our
          strategic guidance and clear plan for utilizing capital funding
          positions our cohort for accelerated growth and market penetration.
        </>
      ),
      pngSequence: (
        <PngSequence
          startFrame={0}
          lastFrame={239}
          imgFilePathPrefix={"sec7-card3/3-Series-A_"}
        />
      ),
    },
    {
      title: "Beta Launch",
      content: (
        <>
          A beta launch rigorously tests the product in a real- world
          environment, addressing technical and user experience issues.
          Simultaneously, a targeted marketing strategy to maximize value
          delivery, drive product adoption, and challenge market leadership.
        </>
      ),
      pngSequence: (
        <PngSequence
          startFrame={0}
          lastFrame={88}
          imgFilePathPrefix={"sec7-card4/4-Beta-Launch_"}
          className="faded-all"
        />
      ),
    },
  ];
  useEffect(() => {
    document.fonts.ready.then(() => {
      $("#section-7 .boxes .box").each((index, element) => {
        const _ele = $(element);
        gsap
          .timeline({
            scrollTrigger: {
              trigger: _ele,
              start: theme === THEME_IPAD ? "top 90%" : "top 80%", // when the top of the trigger hits the top of the viewport
              end: "top 20%", // end after scrolling 500px beyond the start
              scrub: false,
              markers: false,
              once: true,
              onEnter: function () {
                _ele.addClass("loaded hover");
              },
            },
            defaults: {
              duration: 0.5,
            },
          })
          .from(
            wrapByLineWrapper(_ele.find(".number")[0]),
            {
              y: "100%",
            },
            "<+0.2"
          )
          .from(
            _ele.find(".png-sequence"),
            {
              opacity: 0,
            },
            "<"
          )
          .from(
            wrapByLineWrapper(_ele.find(".title")[0]),
            {
              y: "100%",
            },
            "<"
          )
          .from(
            new SplitType(_ele.find(".content"), {
              types: "lines",
            }).lines.map((line) => wrapByLineWrapper(line)),
            {
              y: "100%",
            },
            "<"
          );
      });
    });
  }, []);
  return (
    <div className="section" id="section-7">
      <Divider />
      <div className="reveal">
        Our Cohort <br />
        Roadmap
      </div>
      <div className="subtitle">
        Our comprehensive roadmap leverages our expertise to guide selected
        companies through crucial phases, ensuring we foresee challenges,
        achieve key milestones and are poised for absolute market success. 
      </div>
      <div className="content">
        <div className="mid-line">
          {[0, 1, 2, 3, 4].map((value) => (
            <div className={`point point-${value}`} key={value}></div>
          ))}
        </div>
        <div className="boxes">
          {[0, 1, 2, 3].map((value) => (
            <div className={`box card box-${value}`} key={value}>
              <div className="number">0{value + 1}</div>
              {boxInfo[value].pngSequence}
              <div className="title">{boxInfo[value].title}</div>
              <div className="content">{boxInfo[value].content}</div>
            </div>
          ))}
        </div>
      </div>
      <SectionalButton label="Discover our Roadmap" type="right" />
    </div>
  );
}
