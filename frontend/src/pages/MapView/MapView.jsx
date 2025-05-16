import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import api from "../../services/api";
import "./MapView.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapView = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [foodTrucks, setFoodTrucks] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
      fetchNearbyTrucks(latitude, longitude);
    });
  }, []);

  const fetchNearbyTrucks = async (lat, lng) => {
    try {
      const response = await api.get(
        `/api/foodtrucks/nearby/?lat=${lat}&lng=${lng}`
      );
      setFoodTrucks(response.data);
    } catch (err) {
      console.error("Failed to fetch nearby food trucks");
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-map-placeholder">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={14}
          >
            {foodTrucks.map((truck) => (
              <Marker
                key={truck.id}
                position={{ lat: truck.location.y, lng: truck.location.x }}
                title={truck.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapView;
