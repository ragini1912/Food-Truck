import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./HeroSection.css";
import DistanceCheker from "../DistanceChecker/DistanceChecker";

// Custom food truck icon
const customIcon = new L.Icon({
  iconUrl: "/images/food-truck.png",
  iconSize: [40, 40],
});

// Sample location data
const locations = [
  {
    title: "DUZEN ANNE",
    area: "Seattle",
    type: "Japanese",
    coords: [47.6062, -122.3321],
    distance: 2,
    rating: 4.5,
  },
  {
    title: "Garden Food Truck",
    area: "Mercer St",
    coords: [47.6092, -122.3341],
    distance: 3,
    rating: 4.2,
  },
  {
    title: "CASCAPE",
    area: "Danny My",
    coords: [47.6042, -122.3301],
    distance: 1,
    rating: 4.7,
  },
  // Add more locations as needed
];

const FoodTruckHero = () => {
  const [distanceFilter] = useState(10);
  const [mapView, setMapView] = useState("map");
  const center = [47.6062, -122.3321]; // Seattle coordinates

  const filteredLocations = locations.filter(
    (loc) => loc.distance <= distanceFilter
  );

  return (
    <div className="food-truck-hero">
      {/* Header Section */}
      <div className="hero-header">
        <h1>FOOD TRUCKING</h1>
        <h2>SERVICES</h2>
      </div>

      {/* Map Controls */}
      <div className="map-controls">
        <button
          className={`map-btn ${mapView === "map" ? "active" : ""}`}
          onClick={() => setMapView("map")}
        >
          Map
        </button>
        <button
          className={`map-btn ${mapView === "satellite" ? "active" : ""}`}
          onClick={() => setMapView("satellite")}
        >
          Satellite
        </button>
      </div>

      {/* Main Content */}
      <div className="hero-content">
        {/* Distance Checker */}
        <DistanceCheker />

        {/* Location List */}
        <div className="location-list">
          {filteredLocations.map((loc, index) => (
            <div key={index} className="location-card">
              <h3>{loc.title}</h3>
              <p>{loc.area}</p>
              {loc.type && <p className="type">{loc.type}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="map-container">
        <MapContainer center={center} zoom={13} className="map-section">
          <TileLayer
            url={
              mapView === "satellite"
                ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />
          {filteredLocations.map((loc, idx) => (
            <Marker key={idx} position={loc.coords} icon={customIcon}>
              <Popup>
                <strong>{loc.title}</strong>
                <br />
                {loc.area}
                {loc.type && (
                  <>
                    <br />
                    Type: {loc.type}
                  </>
                )}
                <br />
                Rating: {loc.rating} ⭐
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default FoodTruckHero;
