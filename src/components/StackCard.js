import "../style/card.css";
import "../style/stack-card.css";
// This card is used in Section 5
function StackCard({ info: { no, title, content }, className }) {
  return (
    <div className={"stack-card" + " " + (className ? className : "")}>
      <div className="bg-overlay"></div>
      <div className="no">{no}</div>
      <div className="title">{title}</div>
      <div className="description">{content}</div>
    </div>
  );
}

export default StackCard;
