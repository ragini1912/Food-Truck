import React from "react";
import "./CateringCards.css";
import tastyBitesImg from "../../assets/images/card1.png";
import savaAustinImg from "../../assets/images/card2.png";
import covaSmartImg from "../../assets/images/card1.png";
import locationIcon from "../../assets/images/location.png";
import ovenIcon from "../../assets/images/oven.png";
import freezerIcon from "../../assets/images/freezer.png";
import tapIcon from "../../assets/images/tap-sink.png";
import benchesIcon from "../../assets/images/benches.png";
import widthIcon from "../../assets/images/widthIcon.png";
import rulerIcon from "../../assets/images/rulerIcon.png";
import { useNavigate } from "react-router-dom";

const CateringCards = () => {
  const navigate = useNavigate();
  const cardsData = [
    {
      title: "Tasty bites",
      subtitle: "American foods",
      location: "San Diego, CA",
      image: tastyBitesImg,
      prices: ["₹70/Day", "₹400/Week", "₹250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Sava austin martin",
      subtitle: "Spain foods",
      location: "Pinnacles National Park",
      image: savaAustinImg,
      prices: ["₹70/Day", "₹400/Week", "₹250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Cova del smart truck",
      subtitle: "Spain foods",
      location: "San Diego, CA",
      image: covaSmartImg,
      prices: ["₹30/Day", "₹400/Week", "₹250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Tasty bites",
      subtitle: "American foods",
      location: "San Diego, CA",
      image: tastyBitesImg,
      prices: ["₹70/Day", "₹400/Week", "₹250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Sava austin martin",
      subtitle: "Spain foods",
      location: "Pinnacles National Park",
      image: savaAustinImg,
      prices: ["₹70/Day", "₹400/Week", "₹250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
    {
      title: "Cova del smart truck",
      subtitle: "Spain foods",
      location: "San Diego, CA",
      image: covaSmartImg,
      prices: ["₹30/Day", "₹400/Week", "₹250/Month"],
      dimensions: ["4 meters", "2.5 meters"],
      features: ["Oven", "Freezer", "Tap/Sink", "Benches"],
    },
  ];

  const featureIcons = [ovenIcon, freezerIcon, tapIcon, benchesIcon];

  return (
    <div className="catering-container">
      <div className="section-header">
        <h2>Explore The Catering Cuisines</h2>
        <p>Discover The Joy Of Mobile Dining Experiences</p>
      </div>
      <div className="cards-container">
        {cardsData.map((card, index) => (
          <div className="catering-card" key={index}>
            <div className="card-image-wrapper">
              <img
                src={card.image}
                alt={card.title}
                className="card-main-image"
              />
              <div className="overlay-info">
                <img
                  src={locationIcon}
                  alt="location"
                  className="location-icon"
                />
                <span className="location-text">{card.location}</span>
              </div>
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
                <span key={i}>
                  <img
                    src={i === 0 ? rulerIcon : widthIcon}
                    alt={i === 0 ? "Length" : "Width"}
                    className="dimension-icon"
                  />
                  {dimension}
                </span>
              ))}
            </div>
            <div className="card-features-grid">
              {card.features.map((feature, i) => (
                <div className="feature-item" key={i}>
                  <img
                    src={featureIcons[i]}
                    alt={feature}
                    className="feature-icon"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button
              className="view-more-btn"
              onClick={() => navigate("/user-restaurant")}
            >
              View More
            </button>
          </div>
        ))}
      </div>
      <button className="view-more-btn footer-btn">View More</button>
    </div>
  );
};

export default CateringCards;
