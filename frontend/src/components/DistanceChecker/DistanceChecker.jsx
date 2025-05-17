import React, { useState } from "react";
import "./DistanceChecker.css";
import foodTruckImg from "../../assets/images/Food-Truck-1.png";

const DistanceChecker = () => {
  const [distance, setDistance] = useState(10);

  const handleChange = (e) => {
    setDistance(e.target.value);
  };

  return (
    <div className="distance-checker">
      <div className="truck-image">
        <img src={foodTruckImg} alt="Food Truck" />
      </div>
      <div className="distance-label">Distance(KM)</div>
      <div className="slider-container">
        <div
          className="slider-value"
          style={{
            left: `${distance}%`,
            transform: `translateX(-${distance}%)`,
          }}
        >
          {distance}
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={distance}
          onChange={handleChange}
          className="slider"
          style={{
            background: `linear-gradient(to right, #ff8d00 0%, #ff8d00 ${distance}%, #ffffff ${distance}%, #ffffff 100%)`,
          }}
        />
      </div>
      <button className="check-button">Check Availability</button>
    </div>
  );
};

export default DistanceChecker;
