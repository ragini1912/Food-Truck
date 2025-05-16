import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import locations from "../data/locations";
import "./MapDisplay.css";

const customIcon = new L.Icon({
  iconUrl: "/images/food-truck.png",
  iconSize: [40, 40],
});

const MapDisplay = ({ distanceFilter }) => {
  const center = [47.6062, -122.3321];

  const filtered = locations.filter((loc) => loc.distance <= distanceFilter);

  return (
    <MapContainer center={center} zoom={13} className="map-section">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {filtered.map((loc, idx) => (
        <Marker key={idx} position={loc.coords} icon={customIcon}>
          <Popup>
            <strong>{loc.title}</strong>
            <br />
            {loc.details}
            <br />
            Rating: {loc.rating} ⭐
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapDisplay;
