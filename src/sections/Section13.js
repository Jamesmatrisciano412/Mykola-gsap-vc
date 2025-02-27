import { useContext } from "react";
import { THEME_IPHONE, ThemeContext } from "../ThemeContext";
import Divider from "../components/Divider";
import SectionalButton from "../components/SectionalButton";
import "../style/section-13.css";
export default function () {
  const theme = useContext(ThemeContext);
  return (
    <div className="section" id="section-13">
      <Divider />
      <div className="reveal">Contact Us</div>
      <div className="subtitle">
        For any inquiries or further information about our services and
        investment opportunities, please fill out this form and a member of our
        team will greet you with a prompt response. 
      </div>
      <div className="contact-box">
        <div className="info-box">
          <div className="info-col">
            <div className="info-item">
              New York Office
              <br /> Suite 712
              <br /> 213 Avenue of the Americas
              <br /> New York, NY 10001
              <br /> USA
            </div>
            <div className="info-item hongkong-info">
              Hong Kong Office
              <br /> 289 Queen’s Road Central
              <br /> Central, Hong Kong
              <br /> SAR, 999077
            </div>
          </div>
          <div className="info-col">
            <div className="info-item">
              London Office
              <br /> 101 Bishopsgate
              <br /> London EC1A 3XD
              <br /> United Kingdom
            </div>
            <div className="info-item canada-info">
              Canada Office
              <br /> 202 Bay Street
              <br /> Toronto, ON
              <br /> M5H 2N2
              <br /> Canada
            </div>
          </div>
        </div>
        <div className="input-box">
          <div className="input-div">First name</div>
          <div className="input-div">Last name</div>
          <div className="input-div">Email address</div>
          <div className="input-div select-input">
            <div>Select a department to direct your message</div>
            <svg
              width="22"
              height="8"
              viewBox="0 0 22 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 1L11 7L1 1" stroke="white" strokeLinecap="square" />
            </svg>
          </div>
          <div className="input-div">Subject</div>
          <div className="input-div">Type your message</div>
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
