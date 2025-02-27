import { useContext } from "react";
import { THEME_DESKTOP, THEME_IPAD, ThemeContext } from "../ThemeContext";
export default function () {
  const theme = useContext(ThemeContext);
  return (
    <div className="card-button">
      <div className="line-wrapper">
        <div className="title">
          {theme === THEME_DESKTOP
            ? "Read more"
            : theme === THEME_IPAD
            ? "Read"
            : ""}
        </div>
      </div>
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
  );
}
