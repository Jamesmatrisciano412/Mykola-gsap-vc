import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect } from "react";
import Divider from "../components/Divider";
import PngSequence from "../components/PngSequence";
import SectionalButton from "../components/SectionalButton";
import "../style/section-10.css";

gsap.registerPlugin(ScrollTrigger);

export default function () {
  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#section-10 .png-sequence",
          start: "top 85%",
          end: "top 60%",
          //toggleActions: "play play reverse reverse",
          scrub: true,
          markers: false,
        },
      })
      .fromTo(
        "#section-10 .png-sequence",
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
      .to("#cursor", {
        opacity: 0.2,
      });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#section-10 .png-sequence",
          start: "bottom 40%",
          end: "bottom 15%",
          //toggleActions: "play play reverse reverse",
          scrub: true,
          markers: false,
        },
      })
      .to("#cursor", {
        opacity: 1,
      });
  }, []);
  return (
    <div className="section" id="section-10">
      <Divider />
      <div className="reveal">
        Our latest report <br />
        is redefining <br />
        tomorrow
      </div>
      <div className="subtitle">
        Our process and product roadmap and iterative testing process help us
        identify emerging markets
      </div>
      <div className="content">
        <PngSequence
          startFrame={34}
          lastFrame={149}
          imgFilePathPrefix={"sec10-animation/Main-Glitch-Sphere 2_"}
        />
        <div className="description">
          Global <br />
          Insights and Opportunities <br />
          on the Blockchain 2024
        </div>
      </div>
      <SectionalButton label="Download the Report" type="right" />
    </div>
  );
}
