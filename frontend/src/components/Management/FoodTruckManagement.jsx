import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  Truck,
  Save,
  Star,
  Users,
  Camera,
  Edit3,
  ChefHat,
  Globe,
  Navigation,
  Search,
} from "lucide-react";

const FoodTruckManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "american",
    description: "",
    hours: "",
    phone: "",
    email: "",
    website: "",
    capacity: "50",
    rating: "4.5",
    lat: 21.2514,
    lng: 81.6296,
    address: "Raipur, Chhattisgarh, India",
    image: null,
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const cuisineTypes = [
    { value: "american", label: "American", icon: "🍔" },
    { value: "italian", label: "Italian", icon: "🍝" },
    { value: "mexican", label: "Mexican", icon: "🌮" },
    { value: "indian", label: "Indian", icon: "🍛" },
    { value: "chinese", label: "Chinese", icon: "🥡" },
    { value: "japanese", label: "Japanese", icon: "🍣" },
    { value: "mediterranean", label: "Mediterranean", icon: "🥗" },
    { value: "thai", label: "Thai", icon: "🍜" },
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Initialize Google Map
  useEffect(() => {
    // In a real implementation, you would load Google Maps API here
    // window.initMap = initializeMap;
    loadGoogleMapsScript();
  }, []);

  const loadGoogleMapsScript = () => {
    // Simulate Google Maps API loading
    setTimeout(() => {
      setMapLoaded(true);
      initializeMap();
    }, 1000);

    // In real implementation, you would load the script like this:
    /*
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
    */
  };

  const initializeMap = () => {
    // Simulate Google Maps initialization
    // In real implementation:
    /*
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: formData.lat, lng: formData.lng },
      zoom: 15,
      styles: customMapStyles
    });

    const marker = new google.maps.Marker({
      position: { lat: formData.lat, lng: formData.lng },
      map: map,
      draggable: true,
      title: 'Food Truck Location'
    });

    marker.addListener('dragend', (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      updateLocation(lat, lng);
    });

    map.addListener('click', (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      marker.setPosition({ lat, lng });
      updateLocation(lat, lng);
    });
    */
  };

  const updateLocation = async (lat, lng) => {
    setFormData((prev) => ({ ...prev, lat, lng }));

    // Reverse geocoding to get address
    // In real implementation:
    /*
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setFormData(prev => ({ 
          ...prev, 
          lat, 
          lng, 
          address: results[0].formatted_address 
        }));
      }
    });
    */

    // Simulate address update
    setFormData((prev) => ({
      ...prev,
      lat,
      lng,
      address: `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    }));
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          updateLocation(lat, lng);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          alert(
            "Unable to get your current location. Please ensure location permissions are enabled."
          );
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert("Geolocation is not supported by this browser.");
    }
  };

  const searchLocation = async () => {
    if (!searchAddress.trim()) return;

    setIsLoadingLocation(true);

    // In real implementation, use Google Places API:
    /*
    const service = new google.maps.places.PlacesService(map);
    const request = {
      query: searchAddress,
      fields: ['name', 'geometry'],
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
        const location = results[0].geometry.location;
        updateLocation(location.lat(), location.lng());
      }
      setIsLoadingLocation(false);
    });
    */

    // Simulate search with random location adjustment
    setTimeout(() => {
      const randomLat = 21.2514 + (Math.random() - 0.5) * 0.1;
      const randomLng = 81.6296 + (Math.random() - 0.5) * 0.1;
      updateLocation(randomLat, randomLng);
      setIsLoadingLocation(false);
      setSearchAddress("");
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Food truck information saved successfully!");
    }, 2000);
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Truck },
    { id: "location", label: "Location", icon: MapPin },
    { id: "details", label: "Details", icon: Edit3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-4 px-4 sm:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 shadow-lg">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            Food Truck Management
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your mobile restaurant with our comprehensive platform
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-white/50">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.id
                        ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50"
                        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50/50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Basic Info Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Truck Name */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Food Truck Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Tasty Wheels, Street Flavors"
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70"
                      />
                      <ChefHat className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Cuisine Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cuisine Type *
                    </label>
                    <select
                      name="cuisine"
                      value={formData.cuisine}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70 appearance-none"
                    >
                      {cuisineTypes.map((cuisine) => (
                        <option key={cuisine.value} value={cuisine.value}>
                          {cuisine.icon} {cuisine.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Capacity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Seating Capacity
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="50"
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70"
                      />
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell customers about your delicious food and unique style..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70 resize-none"
                    />
                  </div>

                  {/* Operating Hours */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Operating Hours
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="hours"
                        value={formData.hours}
                        onChange={handleChange}
                        placeholder="e.g., Mon-Fri: 11AM-9PM, Sat-Sun: 10AM-10PM"
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70"
                      />
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === "location" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                {/* Current Location Display */}
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    Current Location
                  </h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium text-gray-600">
                        Address:
                      </span>
                      <p className="text-gray-800 mt-1">{formData.address}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">
                          Latitude:
                        </span>
                        <span className="ml-2 font-mono text-orange-600">
                          {formData.lat.toFixed(6)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Longitude:
                        </span>
                        <span className="ml-2 font-mono text-orange-600">
                          {formData.lng.toFixed(6)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Search */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Search Location
                  </h3>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                        placeholder="Enter address or place name..."
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70"
                        onKeyPress={(e) =>
                          e.key === "Enter" && searchLocation()
                        }
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <button
                      onClick={searchLocation}
                      disabled={isLoadingLocation || !searchAddress.trim()}
                      className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                    >
                      {isLoadingLocation ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Search className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={getCurrentLocation}
                    disabled={isLoadingLocation}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isLoadingLocation ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Getting Location...
                      </>
                    ) : (
                      <>
                        <Navigation className="w-5 h-5" />
                        Use Current Location
                      </>
                    )}
                  </button>
                </div>

                {/* Google Map Container */}
                <div className="relative">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Interactive Map
                  </h3>
                  <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border-2 border-gray-200">
                    {!mapLoaded ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-600 font-medium">
                            Loading Google Maps...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        ref={mapRef}
                        className="w-full h-full bg-gradient-to-br from-blue-200 via-green-200 to-blue-300 relative cursor-pointer"
                        onClick={(e) => {
                          // Simulate map click
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = (e.clientX - rect.left) / rect.width;
                          const y = (e.clientY - rect.top) / rect.height;

                          // Convert to lat/lng (simplified simulation)
                          const newLat = formData.lat + (y - 0.5) * 0.01;
                          const newLng = formData.lng + (x - 0.5) * 0.01;

                          updateLocation(newLat, newLng);
                        }}
                      >
                        {/* Map Marker */}
                        <div
                          className="absolute transform -translate-x-1/2 -translate-y-full"
                          style={{
                            left: "50%",
                            top: "50%",
                          }}
                        >
                          <div className="relative">
                            <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
                              <Truck className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                              Food Truck Location
                            </div>
                          </div>
                        </div>

                        {/* Map Grid Lines */}
                        <div className="absolute inset-0 opacity-20">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute border-gray-400"
                              style={{
                                left: `${i * 10}%`,
                                top: 0,
                                bottom: 0,
                                borderLeft: "1px solid",
                              }}
                            />
                          ))}
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute border-gray-400"
                              style={{
                                top: `${i * 10}%`,
                                left: 0,
                                right: 0,
                                borderTop: "1px solid",
                              }}
                            />
                          ))}
                        </div>

                        {/* Map Instructions */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                          Click anywhere to set location
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Map Controls */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => updateLocation(formData.lat, formData.lng)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Reset to Center
                    </button>
                    <button
                      onClick={() => {
                        // Simulate zoom in
                        const zoomStep = 0.001;
                        updateLocation(
                          formData.lat + (Math.random() - 0.5) * zoomStep,
                          formData.lng + (Math.random() - 0.5) * zoomStep
                        );
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Zoom In
                    </button>
                  </div>
                </div>

                {/* Manual Coordinates Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="lat"
                      value={formData.lat}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="lng"
                      value={formData.lng}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@foodtruck.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://www.yourfoodtruck.com"
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white/70"
                      />
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Rating Display */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Rating
                    </label>
                    <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-lg">
                        {formData.rating}
                      </span>
                      <span className="text-gray-500">/ 5.0</span>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Food Truck Image
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-400 transition-all duration-300 bg-white/70 group"
                      >
                        <div className="text-center">
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-orange-500 transition-colors duration-300" />
                          <p className="text-gray-600 font-medium">
                            Upload Food Truck Image
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:from-orange-600 hover:to-red-600"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Food Truck Info
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Orders", value: "1,234", icon: "📦" },
            { label: "Customer Rating", value: "4.8★", icon: "⭐" },
            { label: "Active Days", value: "87", icon: "📅" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodTruckManagement;
