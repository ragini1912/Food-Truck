import React from "react";
import "./DistanceChecker.css";
import distanceImage from "../../assets/images/distanceChecker-1.png";

const DistanceChecker = () => {
  return (
    <div className="distance-container">
      <div className="distance-content">
        {/* Image section */}
        <div className="distance-image">
          <img src={distanceImage} alt="Distance visualization" />
        </div>

        {/* Text and button section */}
        <div className="distance-info">
          <h2 className="distance-title">Distance(KM)</h2>
          <button className="availability-btn">Check Availability</button>
        </div>
      </div>
    </div>
  );
};

export default DistanceChecker;
