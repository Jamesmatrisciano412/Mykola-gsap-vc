import { useContext } from "react";
import Divider from "../components/Divider";
import SecondCard from "../components/SecondCard";
import SectionalButton from "../components/SectionalButton";

import "../style/section-6.css";
import { ThemeContext } from "../ThemeContext";
export default function () {
  const theme = useContext(ThemeContext);
  const secondCardsInfo = [
    {
      imageFile: "sec6-card1.png",
      shortDesc:
        "Agriculture is ripe for a revolution with new developments in product tracing on the blockchain.",
      longDesc:
        "Blockchain is revolutionizing the agricultural sector through enhanced supply chain transparency, secure data fabric integration, and data-driven farming practices. With promising gains in efficiency, quality, tracing, and sustainability, these five blockchain innovations are leading the way to brighter forecasts.",
      date: "March 27, 2024",
      tag1: "#Cybersecurity",
      tag2: "#AI",
    },
    {
      imageFile: "sec6-card2.png",
      shortDesc:
        "The convergence of AI, Robotics and Logistics throughout the supply chain reveals new cost efficiencies.",
      longDesc:
        "A recent visit to Convoy (Cohort24A), an AI-powered robotics and logistics firm, demonstrated advancements in supply chain management. In this analysis, learn how Blockstrata's early research and investment in automation, humanoid robots, and enhanced data security are reshaping the future of supply chain management.",
      date: "March 27, 2024",
      tag1: "#Cybersecurity",
      tag2: "#AI",
    },
    {
      imageFile: "sec6-card3.png",
      shortDesc:
        "E-Commerce Evolution: Blockchain Wallets are poised to lead the way for a new generation of global commerce.",
      longDesc:
        "The next generation of e-commerce will be safe, transparent and secure transactions across borders. Powered by the year-over-year increases in registered blockchain wallets— understanding this new consumer behavior will be crucial for market leaders— and its fast approaching, are you ready to serve the next billion users?",
      date: "March 27, 2024",
      tag1: "#Cybersecurity",
      tag2: "#AI",
    },
  ];
  return (
    <div className="section" id="section-6">
      <Divider />
      <div className="reveal">
        Insights from the <br />
        field of digital <br />
        disruption
      </div>
      <div className="subtitle">
        Our latest research, articles, and analysis highlight the transformative
        potential of blockchain technology across various sectors of our
        economy.
      </div>
      <div className="card-group">
        {secondCardsInfo.map((info, index) => (
          <SecondCard
            info={info}
            className={"card-" + (index + 1)}
            key={index}
          />
        ))}
      </div>
      <SectionalButton label="Explore more insights" type="right" />
    </div>
  );
}
