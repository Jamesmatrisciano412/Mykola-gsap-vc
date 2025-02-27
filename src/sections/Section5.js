import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { useContext, useRef } from "react";
import Divider from "../components/Divider";
import StackCard from "../components/StackCard";
import "../style/section-5.css";
import { THEME_IPHONE, ThemeContext } from "../ThemeContext";
import SectionalButton from "../components/SectionalButton";
gsap.registerPlugin(ScrollTrigger);
export default function () {
  const theme = useContext(ThemeContext);
  const sectionRef = useRef();
  const cardInfos = [
    {
      title: (
        <>
          Strategic <br />
          Guidance
        </>
      ),
      content:
        "Our team consults on assessments of how blockchain can\n impact business operations in addition to identifying areas\n where processes can be streamlined, or enhancements made to traceability as well as understanding how to improve overall data security and compliance. With our guidance, we assist we translate business goals into achievable roadmaps using blockchain technology.",
    },
    {
      title: (
        <>
          Technical <br />
          Expertise
        </>
      ),
      content:
        "Our team consults on assessments of how blockchain can\n impact business operations in addition to identifying areas\n where processes can be streamlined, or enhancements made to traceability as well as understanding how to improve overall data security and compliance. With our guidance, we assist we translate business goals into achievable roadmaps using blockchain technology.",
    },
    {
      title: (
        <>
          Implementation <br />
          Planning
        </>
      ),
      content:
        "Our team consults on assessments of how blockchain can\n impact business operations in addition to identifying areas\n where processes can be streamlined, or enhancements made to traceability as well as understanding how to improve overall data security and compliance. With our guidance, we assist we translate business goals into achievable roadmaps using blockchain technology.",
    },
    {
      title: (
        <>
          Risk <br />
          Management
        </>
      ),
      content:
        "Our team consults on assessments of how blockchain can\n impact business operations in addition to identifying areas\n where processes can be streamlined, or enhancements made to traceability as well as understanding how to improve overall data security and compliance. With our guidance, we assist we translate business goals into achievable roadmaps using blockchain technology.",
    },
  ];
  useGSAP(
    () => {
      const _section = $(sectionRef.current);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: _section,
          start: (theme === THEME_IPHONE ? "top -270px" : "top 0px"),
          end: (theme === THEME_IPHONE ? "+=2800px" : "+=3000px"),
          toggleActions: "play play reverse reverse",
          scrub: true,
          //once: true,
          markers: false,
          pin: true,
          pinSpacing: false,
        },
      });
      for (let index = 0; index < cardInfos.length; index++) {
        tl.fromTo(
          `.stack-card-${index}`,
          {
            opacity: 0,
            background: "#1A1E264D",
            border: "1px solid #FFFFFF40",
            y: 60,
          },
          {
            opacity: 1,
            color: "rgba(255, 255, 255, 1)",
            background: "#1D2127E5",
            border: "1px solid #FFFFFF",
            y: 0,
            duration: 1,
          }
        );
        if (index != cardInfos.length - 1)
          tl.to(
            new Array(index + 1).fill(0).map((_, ii) => `.stack-card-${ii}`),
            {
              background: "#1A1E264D",
              color: "rgba(255, 255, 255, 0.05)",
              border: "1px solid #FFFFFF40",
              z: "-=10",
              y: "-=55",
              duration: 1,
            },
            ">+3"
          );
      }
      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );
  return (
    <div className="section" id="section-5" ref={sectionRef}>
      <Divider />
      <div className="reveal">
        Our areas of
        <br /> expertise
      </div>
      <div className="subtitle">
        Our team bridges the gap between the technical aspects ofblockchain and
        the real-world needs of emerging start ups to realize gains in security,
        transparency, value and efficiency.
      </div>
      <div className="content">
        {cardInfos.map(({ title, content }, index) => (
          <StackCard
            info={{ no: "0" + (index + 1), title, content }}
            key={index}
            className={`stack-card-${index} loaded`}
          />
        ))}
      </div>
      <SectionalButton label="Dive deeper into our expertise" type="right" />
    </div>
  );
}
