import React from "react";
import "./CateringCards.css";
import tastyBitesImg from "../../assets/images/card1.png";
import savaAustinImg from "../../assets/images/card2.png";
import covaSmartImg from "../../assets/images/card1.png";

const CateringCards = () => {
  const cardsData = [
    {
      title: "Tasty bites",
      subtitle: "American foods",
      location: "San Diego, CA",
      image: tastyBitesImg,
      prices: ["$70/Day", "$400/Week", "$250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Sava austin martin",
      subtitle: "Spain foods",
      location: "Pinnacles National Park",
      image: savaAustinImg,
      prices: ["$70/Day", "$400/Week", "$250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Cova del smart truck",
      subtitle: "Spain foods",
      location: "San Diego, CA",
      image: covaSmartImg,
      prices: ["$30/Day", "$400/Week", "$250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Tasty bites",
      subtitle: "American foods",
      location: "San Diego, CA",
      image: tastyBitesImg,
      prices: ["$70/Day", "$400/Week", "$250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Sava austin martin",
      subtitle: "Spain foods",
      location: "Pinnacles National Park",
      image: savaAustinImg,
      prices: ["$70/Day", "$400/Week", "$250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Cova del smart truck",
      subtitle: "Spain foods",
      location: "San Diego, CA",
      image: covaSmartImg,
      prices: ["$30/Day", "$400/Week", "$250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
  ];

  return (
    <div className="catering-container">
      <div className="section-header">
        <h2>Explore The Catering Cuisines</h2>
        <p>Discover The Joy Of Mobile Dining Experiences</p>
      </div>

      <div className="cards-container">
        {cardsData.map((card, index) => (
          <div className="catering-card" key={index}>
            <div className="card-image">
              <img src={card.image} alt={card.title} />
              <p className="location">{card.location}</p>
            </div>
            <div className="card-header">
              <h3>{card.title}</h3>
              <p className="subtitle">{card.subtitle}</p>
            </div>
            <hr />
            <div className="card-prices">
              {card.prices.map((price, i) => (
                <span key={i}>{price}</span>
              ))}
            </div>
            <hr />
            <div className="card-dimensions">
              {card.dimensions.map((dimension, i) => (
                <span key={i}>{dimension}</span>
              ))}
            </div>

            <div className="card-features">
              {card.features.map((feature, i) => (
                <span key={i}>{feature}</span>
              ))}
            </div>

            <button className="view-more-btn">View More</button>
          </div>
        ))}
      </div>
      <button className="view-more-btn footer-btn">View More</button>
    </div>
  );
};

export default CateringCards;
