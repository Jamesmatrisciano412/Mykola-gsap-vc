import "../style/sectional-button.css";
import MagneticEffect from "./MagneticEffect";
export default function SectionalButton({ label, type, className }) {
  return (
    <div className="sectional-button-wrapper">
      <div className={"sectional-button " + (className ? className : "")}>
        <MagneticEffect>
          <div className="label">{label}</div>
        </MagneticEffect>
        <div className="icon">
          {type == "down" ? (
            <svg
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.50098 0L7.50098 7.2381V18.5476" />
              <path d="M0.500977 14.0238L7.50018 19L14.0002 14.0238" />
            </svg>
          ) : type == "right" ? (
            <svg
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 7.49927L7.2381 7.49927L18.5476 7.49927" />
              <path d="M14.0239 14.499L19.0001 7.49982L14.0239 0.999821" />
            </svg>
          ) : type == "check" ? (
            <svg
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 7.5L6 12L15 0.5" />
            </svg>
          ) : (
            <span>Invalid - type</span>
          )}
        </div>
      </div>
    </div>
  );
}
