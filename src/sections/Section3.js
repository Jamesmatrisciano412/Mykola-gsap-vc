import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { useRef } from "react";
import SplitType from "split-type";
import Divider from "../components/Divider";
import SectionalButton from "../components/SectionalButton";
import "../style/section-3.css";
import { wrapByLineWrapper } from "../utils";
gsap.registerPlugin(ScrollTrigger);

export default function () {
  const sectionRef = useRef();
  useGSAP(
    () => {
      const _section = $(sectionRef.current);
      // Blockquote animation
      document.fonts.ready.then(() => {
        document
          .querySelectorAll(".block-auto-type")
          .forEach((blockquote, index) => {
            const text = new SplitType(blockquote, {
              types: ["lines", "chars"],
            });
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: blockquote,
                  start: "top 95%",
                  end: "+=496px",
                  scrub: false,
                  markers: false,
                  once: true,
                },
              })
              .fromTo(
                text.chars,
                {
                  color: "#233246ff",
                  opacity: 0,
                },
                {
                  opacity: 0.95,
                  stagger: {
                    each: 0.01,
                  },
                  duration: 0.01,
                }
              );
          });
        document
          .querySelectorAll(".block-scroll-type")
          .forEach((blockquote, index) => {
            const text = new SplitType(blockquote, {
              types: ["lines", "chars"],
            });
            gsap.fromTo(
              text.chars,
              {
                color: "#233246",
                opacity: 0,
              },
              {
                scrollTrigger: {
                  trigger: blockquote,
                  start: "top 75%",
                  end: "+=480px",
                  scrub: 3,
                  markers: false,
                },
                opacity: 1,
                color: "#ffffff",
                stagger: {
                  each: 0.01,
                },
                duration: 0.01,
              }
            );
          });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: _section.find(">.photo"),
              start: "top 90%",
              scrub: false,
              markers: false,
              once: true,
            },
          })
          .fromTo(
            _section.find(".photo>.image"),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
            }
          )
          .from(
            new SplitType(_section.find(">.photo>.description"), {
              types: "lines",
            }).lines.map((line) => wrapByLineWrapper(line)),
            {
              opacity: 0,
              y: "100%",
              stagger: 0.1,
              duration: 0.5,
            },
            "<"
          );
      });
    },
    { scope: sectionRef, dependencies: [] }
  );
  return (
    <div className="section" id="section-3" ref={sectionRef}>
      <Divider />
      <div className="block-quote">
        <p className="block-auto-type">
          From revolutionizing global supply chain management and finance to
          transforming healthcare, cybersecurity, and communications, blockchain
          has continued to evolve, redefine consumer behaviors, and unlock
          tremendous opportunities for our clients and partners. By leveraging
          our extensive knowledge base and partner networks across industries we
          anticipate unprecedented interoperability between public and private
          sectors on a global scale.”
        </p>
        <p className="block-scroll-type">
          From revolutionizing global supply chain management and finance to
          transforming healthcare, cybersecurity, and communications, blockchain
          has continued to evolve, redefine consumer behaviors, and unlock
          tremendous opportunities for our clients and partners. By leveraging
          our extensive knowledge base and partner networks across industries we
          anticipate unprecedented interoperability between public and private
          sectors on a global scale.”
        </p>
      </div>
      <div className="photo">
        <img className="image" src="./assets/sec3.png" />
        <div className="description">
          — Jochem Andersen, CEO <br />
          Taken from Interview at Digital Business
          Summit, January 2024
        </div>
      </div>
      <SectionalButton label="Watch the keynote" type="right" />
    </div>
  );
}
