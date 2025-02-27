import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { useContext, useRef } from "react";
import { THEME_IPAD, THEME_IPHONE, ThemeContext } from "../ThemeContext";
import Divider from "../components/Divider";
import "../style/section-14.css";
gsap.registerPlugin(ScrollTrigger);

export default function () {
  const sectionRef = useRef();
  const theme = useContext(ThemeContext);
  useGSAP(
    () => {
      const _section14 = $(sectionRef.current);
      const title = _section14.find(">.title");
      gsap.fromTo(
        title,
        {
          opacity: 0.6,
          fontSize: 20,
          lineHeight: 54,
          y: -200,
        },
        {
          opacity: 1,
          fontSize:
            theme === THEME_IPAD ? 216 : theme === THEME_IPHONE ? 82 : 301,
          lineHeight:
            theme === THEME_IPAD
              ? "195px"
              : theme === THEME_IPHONE
              ? "54px"
              : "268px",
          y: 0,

          scrollTrigger: {
            trigger: _section14,
            start: "top 80%",
            end: "top 40%",
            scrub: false,
            //once: true,
            onLeave: () => {
              gsap.to(".App>.container", {
                backgroundImage:
                  "linear-gradient(270deg, #000000, #000000, #000000)",
                duration: 1,
              });
            },
          },
        }
      );
    },
    { dependencies: [] }
  );
  return (
    <div className="section" id="section-14" ref={sectionRef}>
      <Divider />
      <div className="title">BlockStrata</div>
      <div className="footer-box">
        <div className="info-box">
          <div className="info-col">
            <div className="title">Sections</div>
            <div className="info">
              Explore Cohorts
              <br />
              Organizational Structure <br />
              Insights
              <br />
              Case Studies
              <br />
              Our Roadmap Process <br />
              Press Room
              <br />
              Annual Reports Index
              <br />
            </div>
          </div>
          <div className="info-col">
            <div className="title">Compliance</div>
            <div className="info">
              Terms of Use
              <br />
              Privacy Policy (DPIA)
              <br />
              GDPR Compliance
              <br />
              CCPA Compliance
              <br />
              SEC Disclosures (ADV, PF, U4)
              <br />
              Risk Disclosure
              <br />
              Know Your Customer
              <br />
              Customer Relationship Summary
              <br />
              Anti-Money Laundering
            </div>
          </div>
        </div>
        <div className="contact-box">
          <div className="info-col">
            <div className="title">Contact</div>
            <div className="info">
              New York Office (HQ)
              <br />
              Suite 712
              <br />
              213 Avenue of the Americas
              <br />
              New York, NY 10001
              <br />
              USA
              <br />
              +1 (212) - 555 - 7984
              <br />
            </div>
          </div>
          <div className="info-col last-info">
            <div className="title">Interact</div>
            <div className="info">
              X<br />
              Linkedin
              <br />
              Github
              <br />
              YouTube
              <br />
              TikTok
              <br />
              Instagram
              <br />
              Facebook
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
