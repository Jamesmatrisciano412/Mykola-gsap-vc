import "../style/bento-card.css";
import "../style/card.css";
function BentoCard({ render, className = null }) {
  return (
    <div className={"card bento-card" + " " + (className ? className : "")}>
      <div className="bg-overlay"></div>
      {render()}
    </div>
  );
}

export default BentoCard;
