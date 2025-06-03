import React from "react";
import "./DistanceChecker.css";
import foodTruckImg from "../../assets/images/Food-Truck-1.png";

const DistanceChecker = ({ selectedDistance, setSelectedDistance }) => {
  const percent = ((selectedDistance - 1) / 19) * 100;

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
            left: `${percent}%`,
            transform: `translateX(-${percent}%)`,
          }}
        >
          {selectedDistance}
        </div>
        <input
          type="range"
          min={1}
          max={20}
          value={selectedDistance}
          onChange={(e) => setSelectedDistance(Number(e.target.value))}
          className="slider"
          style={{
            background: `linear-gradient(to right, #ff8d00 0%, #ff8d00 ${percent}%, #ffffff ${percent}%, #ffffff 100%)`,
          }}
        />
      </div>
      <button className="check-button">Check Availability</button>
    </div>
  );
};

export default DistanceChecker;
