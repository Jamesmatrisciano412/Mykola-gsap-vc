import Divider from "../components/Divider";
import SecondCard from "../components/SecondCard";
import SectionalButton from "../components/SectionalButton";
import "../style/section-12.css";
export default function () {
  const secondCardsInfo = [
    {
      imageFile: "sec12-card1.png",
      shortDesc: (
        <>
          Blockstrata Announces Series B Funding for AI-Driven Health Image
          Analysis
        </>
      ),
      longDesc: (
        <>
          We're thrilled to announce that EDR (Cohort 2024A) has secured a new
          round of funding to continue its improvements in medical image
          diagnostic accuracy and efficiency for medical professionals and
          patients. With improved patient outcomes and more streamlined
          healthcare operations, new cost savings are leading the way.
        </>
      ),
      date: "June 18, 2024",
      tag1: "#Medtech",
      tag2: "#AI",
    },
    {
      imageFile: "sec12-card2.png",
      shortDesc: (
        <>
          From Finance to Retail: CheckPoint POS continues to disrupts
          Traditional Transactional Models
        </>
      ),
      longDesc: (
        <>
          Blockchain technology is reshaping industries from finance to retail,
          and we are proud to be at the forefront of this revolution by
          partnering with Checkpoint POS (Cohort24A). Explore how this
          blockchain- based platform is enabling faster, more secure
          transactions and revolutionizing supply chains through transparent
          product tracking.
        </>
      ),
      date: "May 28, 2024",
      tag1: "#Fintech",
      tag2: "#Datafabric",
    },
    {
      imageFile: "sec12-card3.png",
      shortDesc: (
        <>
          Unlocking the Last Mile of Delivery for Warehouses with new
          blockchain-based supply chain platforms
        </>
      ),
      longDesc: (
        <>
          We are witnessing a groundbreaking shift in logistics as blockchain
          technology streamlines operations and enhances transparency across
          supply chains. PackTrack (Cohort23B) has emerged as a major player in
          logistics across global trade networks be enabling shipment tracking
          authenticity verification and optimized inventory.
        </>
      ),
      date: "March 27, 2024",
      tag1: "#Cybersecurity",
      tag2: "#AI",
    },
  ];
  return (
    <div className="section" id="section-12">
      <Divider />
      <div className="reveal">The latest from our Press Room</div>
      <div className="subtitle">
        We’re driving innovation, reaching key milestones and fostering growth
        within the blockchain ecosystem— here’s the latest news to break. 
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
