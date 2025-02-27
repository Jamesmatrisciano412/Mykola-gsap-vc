import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContext } from "react";
import { THEME_IPHONE, ThemeContext } from "../ThemeContext";
import Divider from "../components/Divider";
import SectionalButton from "../components/SectionalButton";
import "../style/section-11.css";

gsap.registerPlugin(ScrollTrigger);
export default function () {
  const theme = useContext(ThemeContext);
  return (
    <div className="section" id="section-11">
      <Divider />
      <div className="reveal">
        Our insights and
        <br /> announcements. <br />
        Your inbox
      </div>
      <div className="subtitle">
        Your inbox grants you insider access with our latest insights, deep dive
        analysis, exclusive portfolio updates, and more from our expert team.
      </div>
      <div className="sign-up-container">
        <div className="sign-up-box">
          <div className="email-input input-div reveal">
            Type your email address here to begin
          </div>
          <div className="email-input-bottom-line"></div>
          <div className="sign-up-footer">
            <div className="title">Your consent:</div>
            <div className="action-list">
              <SectionalButton
                label={theme === THEME_IPHONE ? "Tap to agree" : "I agree"}
                type="check"
                className="check-button"
              />
              <SectionalButton label="Sign up" type="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
