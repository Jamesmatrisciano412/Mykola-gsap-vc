import { useContext } from "react";
import Divider from "../components/Divider";
import FirstCard from "../components/FirstCard";
import SectionalButton from "../components/SectionalButton";
import "../style/section-9.css";
import { ThemeContext, THEME_IPAD, THEME_IPHONE } from "../ThemeContext";
export default function () {
  const theme = useContext(ThemeContext);
  const cardsInfo = [
    {
      title: <>DIVE is Revolutionizing Digital Identity Verification</>,
      content: (
        <>
          DIVE’s tamper-proof and decentralized identity verification systems
          have been deployed throughout the B2B and B2C spheres and demonstrate
          improvements in security, privacy, and sustainability at scale.,
        </>
      ),
      bgImage: `${theme === THEME_IPHONE ? "phone-" : theme === THEME_IPAD ? "pad-" : ""
        }sec9-card1.png`,
      tags: ["Cohort23B", "Blockchain", "Medtech"],
    },
    {
      title: <>Voltax Empowers Renewable Energy Trading on the Blockchain</>,
      content: (
        <>
          We backed Voltax’s bold vision for a blockchain-based platform
          enabling the trading of renewable energy credits. This technology has
          demonstrated transparency and traceability in energy transactions on a
          grid of any scale, thereby promoting the use of sustainable energy
          sources.
        </>
      ),
      bgImage: "sec9-card2.png",
      isResponsiveImage: true,
      tags: ["Cohort23B", "Blockchain", "Medtech"],
    },
    {
      title: (
        <>
          MedChain redefines security, diagnosis, communication with healthcare
          data records
        </>
      ),
      content: (
        <>
          By securing patient records on an immutable blockchain ensures
          privacy, accuracy, accessibility, safety, improved patient outcomes,
          cost-savings and sets a new standard throughout the health care
          system.
        </>
      ),
      bgImage: `${theme === THEME_IPHONE ? "phone-" : theme === THEME_IPAD ? "pad-" : ""
        }sec9-card3.png`,
      tags: ["Cohort23B", "Blockchain", "Medtech"],
    },
    {
      title: (
        <>
          Streamlining Real Estate Transactions with Smart Contracts by Prospect
        </>
      ),
      content: (
        <>
          Our investment in Prospect allowed us to pioneer a new era in real
          estate with the deployment of smart contracts to automate and secure
          property transactions.
        </>
      ),
      bgImage: "sec9-card4.png",
      tags: ["Cohort23B", "Blockchain", "Medtech"],
    },
    {
      title: (
        <>Enhancing Transparency in the Food Supply Chain with Foodtrack</>
      ),
      content: (
        <>
          FoodTrack created a blockchain-based platform to track food products
          from farm to table and is providing unparalleled transparency,
          reductions in fraud as well as improved food safety and trust.
        </>
      ),
      bgImage: `${theme === THEME_IPHONE ? "phone-" : theme === THEME_IPAD ? "pad-" : ""
        }sec9-card5.png`,
      tags: ["Cohort23B", "Blockchain", "Medtech"],
    },
    {
      title: (
        <>
          Innovating Financial Services with CheckPoint’s Ledger-driven
          Solutions
        </>
      ),
      content: (
        <>
          FoodTrack created a blockchain-based platform to track food products
          from farm to table and is providing unparalleled transparency,
          reductions in fraud as well as improved food safety and trust.
        </>
      ),
      bgImage: `${theme === THEME_IPHONE ? "phone-" : theme === THEME_IPAD ? "pad-" : ""
        }sec9-card6.png`,
      tags: ["Cohort23B", "Blockchain", "Medtech"],
    },
  ];
  return (
    <div className="section" id="section-9">
      <Divider />
      <div className="reveal">
        Case Studies <br />
        from the field
      </div>
      <div className="subtitle">
        A brief look at the evolving blockchain technology landscape
        demonstrates Blockstrata's ability to identify promising start ups,
        provide strategic analysis, investment and deliver impactful businesses.
      </div>
      <div className="card-group">
        <div className="card-column">
          {(theme !== THEME_IPHONE ? [0, 1, 2,] : [0, 3, 1]).map((value) => (
            <FirstCard
              info={cardsInfo[value]}
              key={value}
              className={`card-${value + 1}${value == 1 ? " big-card" : ""}`}
            />
          ))}
        </div>
        <div className="card-column">
          {(theme !== THEME_IPHONE ? [3, 4, 5] : [4, 2, 5]).map((value) => (
            <FirstCard
              info={cardsInfo[value]}
              key={value}
              className={`card-${value + 1}${value == 3 ? " big-card" : ""}`}
            />
          ))}
        </div>
      </div>
      <SectionalButton label="Explore all case studies" type="right" />
    </div>
  );
}
