import React from "react";
import "./CateringCuisines.css";
import cateringImage from "../../assets/images/Food-Truck-2.png";
import cuisinesImage from "../../assets/images/Food-Truck-3.png";
import footerImage from "../../assets/images/icons.png";

const CateringCuisines = () => {
  return (
    <div className="catering-cuisines-container">
      <div className="content-wrapper">
        <div className="text-content">
          <h1>Catering</h1>
          <h1>Cuisines</h1>
          <p className="description">
            Consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </div>
        <div className="images">
          <div className="catering-image">
            <img src={cateringImage} alt="Catering" />
          </div>
          <div className="footer-image">
            <img src={footerImage} alt="Catering-footer" />
          </div>
        </div>

        <div className="image-content">
          <img src={cuisinesImage} alt="Cuisines" />
        </div>
      </div>
    </div>
  );
};

export default CateringCuisines;
