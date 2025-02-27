import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Divider from "../components/Divider";
import FirstCard from "../components/FirstCard";
import SectionalButton from "../components/SectionalButton";
import "../style/section-2.css";
import { useContext } from "react";
import { THEME_IPAD, THEME_IPHONE, ThemeContext } from "../ThemeContext";
gsap.registerPlugin(ScrollTrigger);
export default function () {
  const theme = useContext(ThemeContext);
  const cardsInfo = [
    {
      title: "SeedTract",
      content:
        "SeedTract is revolutionizing the agricultural sector with a blockchain- based system to track seeds and agricultural production thereby enhancing transparency and reducing fraud and contamination.",
      bgImage: `${theme === THEME_IPHONE ? "phone-" : theme === THEME_IPAD ? "pad-" : ""
        }sec2-card1.png`,
      tags: ["Cohort24A", "Blockchain", "Fintech"],
    },
    {
      title: "CheckPoint POS Systems",
      content:
        "CheckPoint has already begun to transform the retail industry with its blockchain-based Point of Sale (POS) software offering secure, transparent, and efficient transaction processing.",
      bgImage: "sec2-card2.png",
      tags: ["Cohort24A", "Blockchain", "Fintech"],
    },
    {
      title: "EDR Diagnostic Records",
      content:
        "Electronic Diagnostic Records is developing blockchain solutions to store, secure and manage healthcare data and patient records in compliance with regulations around the world.",
      bgImage: `${theme === THEME_IPHONE ? "phone-" : theme === THEME_IPAD ? "pad-" : ""
        }sec2-card3.png`,
      tags: ["Cohort24A", "Blockchain", "Medtech"],
    },
    {
      title: "Convoy Logistics",
      content:
        "Convoy’s platform ensures every step of the supply chain is recorded on an immutable blockchain ledger to optimize transparency and logistics.",
      bgImage: `${theme === THEME_IPHONE ? "phone-" : theme === THEME_IPAD ? "pad-" : ""
        }sec2-card4.png`,
      tags: ["Cohort24A", "Blockchain", "Logistics"],
    },
  ];
  return (
    <div className="section" id="section-2">
      <Divider />
      <div className="reveal">
        Meet the latest
        <br /> cohort reaching
        <br /> Series A funding
      </div>
      <div className="subtitle">
        Discover our latest investments in companies already leveraging
        blockchain technology and scaling their operations to bring innovative
        value- driven solutions to market.
      </div>
      <div className="card-group">
        <div className="card-column">
          <FirstCard info={cardsInfo[0]} className="card-1" />
          <FirstCard info={cardsInfo[theme !== THEME_IPHONE ? 1 : 2]} className="card-2 big-card" />
        </div>
        <div className="card-column">
          <FirstCard info={cardsInfo[theme !== THEME_IPHONE ? 2 : 1]} className="card-3 big-card" />
          <FirstCard info={cardsInfo[3]} className="card-4" />
        </div>
      </div>
      <SectionalButton label="Meet more of the cohort" type="right" />
    </div>
  );
}
