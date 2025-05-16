import React from "react";
import "./AboutUs.css";
import pizzaImage from "../../assets/images/pizza-with-bg (3).png";
import deliveryImage from "../../assets/images/pizza-with-bg (2).png";
import pizzaImageWithBg from "../../assets/images/pizza-with-bg (1).png";

const AboutUs = () => {
  return (
    <div className="about-container" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="about-content">
        {/* About Us Text Section */}
        <div className="about-text">
          <h2>About Us</h2>
          <p className="main-text">
            The study is the work of researchers at Nettingsham University's
            School of Medicine who focused on chemicals known as antigens. In
            particular, they cause our bodies to make auto-antibodies that
            target and try to block those invading antigens.
          </p>
          <p className="secondary-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sint
            quam heene suscipit eu quibusdiam esse veno. Repellentius!
          </p>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">
              <img src={pizzaImage} alt="Pizza Items" />
            </div>
            <div className="feature-text">
              <h3>50+ Pizza Items</h3>
              <p>We provide premium & high quality tasty pizza</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src={deliveryImage} alt="Fast Delivery" />
            </div>
            <div className="feature-text">
              <h3>Online Fast Delivery</h3>
              <p>We provide 24/7 fast online delivery for all items</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="primary-btn">Order Now</button>
          <button className="secondary-btn">
            <span className="play-icon">
              <svg viewBox="0 0 64 64" width="28" height="28">
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  stroke="#FFA500"
                  strokeWidth="4"
                  fill="white"
                />
                <polygon points="26,20 46,32 26,44" fill="#FCCE7A" />
              </svg>
            </span>
            <span className="btn-text">How to place order</span>
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="about-image">
        <img src={pizzaImageWithBg} alt="About Us" />
      </div>
    </div>
  );
};

export default AboutUs;
