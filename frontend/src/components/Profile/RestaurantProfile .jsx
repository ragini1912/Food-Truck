import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Camera,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Upload,
  Edit3,
  Save,
  X,
  Check,
  Wifi,
  Car,
  Thermometer,
  CreditCard,
  Search,
  Navigation,
  Trash2,
} from "lucide-react";
import { RestaurantContext } from "../../context/RestaurantContext";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";

const RestaurantProfile = () => {
  const { restaurantData, setRestaurantData } = useContext(RestaurantContext);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize formData with additional fields for images and location
  const [formData, setFormData] = useState({
    name: restaurantData?.name || "Bella Vista Restaurant",
    description: restaurantData?.description || "Experience authentic cuisine.",
    restaurant_type: restaurantData?.restaurant_type || "restaurant",
    category: restaurantData?.category || "Fine Dining",
    food_categories: restaurantData?.food_categories || "Italian, Indian",
    cuisine_types: restaurantData?.cuisine_types || ["Italian"],
    address: restaurantData?.address || "123 Culinary Street, Mumbai 400001",
    city: restaurantData?.city || "Mumbai",
    state: restaurantData?.state || "Maharashtra",
    pincode: restaurantData?.pincode || "400001",
    latitude: restaurantData?.latitude || 19.076,
    longitude: restaurantData?.longitude || 72.8777,
    phone: restaurantData?.phone || "+91 98765 43210",
    email: restaurantData?.email || "contact@restaurant.com",
    delivery_available: restaurantData?.delivery_available ?? true,
    delivery_type: restaurantData?.delivery_type || "platform",
    pickup_available: restaurantData?.pickup_available ?? true,
    delivery_radius: restaurantData?.delivery_radius || 5,
    min_delivery_time: restaurantData?.min_delivery_time || 30,
    max_delivery_time: restaurantData?.max_delivery_time || 60,
    min_order_amount: restaurantData?.min_order_amount || 0.0,
    delivery_fee: restaurantData?.delivery_fee || 0.0,
    packaging_fee: restaurantData?.packaging_fee || 0.0,
    opening_time: restaurantData?.opening_time || "11:00",
    closing_time: restaurantData?.closing_time || "22:00",
    is_24_hours: restaurantData?.is_24_hours ?? false,
    weekly_off: restaurantData?.weekly_off || [],
    gst_number: restaurantData?.gst_number || "",
    fssai_license: restaurantData?.fssai_license || "",
    business_license: restaurantData?.business_license || "",
    status: restaurantData?.status || "active",
    is_verified: restaurantData?.is_verified ?? false,
    is_featured: restaurantData?.is_featured ?? false,
    is_promoted: restaurantData?.is_promoted ?? false,
    accepts_cash: restaurantData?.accepts_cash ?? true,
    accepts_card: restaurantData?.accepts_card ?? true,
    accepts_upi: restaurantData?.accepts_upi ?? true,
    has_parking: restaurantData?.has_parking ?? false,
    has_wifi: restaurantData?.has_wifi ?? false,
    has_ac: restaurantData?.has_ac ?? false,
    rating: "4.8",
    total_reviews: "1,247",
    capacity: "120",
    established: "2015",
    images: restaurantData?.images || [], // Array for multiple images
  });

  // Initialize map
  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  const loadGoogleMapsScript = () => {
    // Simulate Google Maps API loading
    setTimeout(() => {
      setMapLoaded(true);
      initializeMap();
    }, 1000);

    // Real implementation (commented):
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
    // Real implementation:
    /*
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: formData.latitude, lng: formData.longitude },
      zoom: 15,
      styles: customMapStyles
    });

    const marker = new google.maps.Marker({
      position: { lat: formData.latitude, lng: formData.longitude },
      map: map,
      draggable: true,
      title: 'Restaurant Location'
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
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      address: `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`, // Simulated address
    }));

    // Real implementation for reverse geocoding:
    /*
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setFormData(prev => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          address: results[0].formatted_address,
          city: results[0].address_components.find(c => c.types.includes('locality'))?.long_name || prev.city,
          state: results[0].address_components.find(c => c.types.includes('administrative_area_level_1'))?.long_name || prev.state,
          pincode: results[0].address_components.find(c => c.types.includes('postal_code'))?.long_name || prev.pincode,
        }));
      }
    });
    */
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

    // Simulate search with random location adjustment
    setTimeout(() => {
      const randomLat = formData.latitude + (Math.random() - 0.5) * 0.1;
      const randomLng = formData.longitude + (Math.random() - 0.5) * 0.1;
      updateLocation(randomLat, randomLng);
      setIsLoadingLocation(false);
      setSearchAddress("");
    }, 1500);

    // Real implementation:
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
  };

  const restaurantTypes = [
    { value: "movable", label: "Movable (Food Truck/Cart)" },
    { value: "non_movable", label: "Non-Movable (Fixed Location)" },
    { value: "restaurant", label: "Traditional Restaurant" },
  ];

  const statusChoices = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "closed", label: "Temporarily Closed" },
    { value: "suspended", label: "Suspended" },
  ];

  const deliveryTypes = [
    { value: "self", label: "Self Delivery" },
    { value: "platform", label: "Platform Delivery" },
    { value: "both", label: "Both" },
    { value: "pickup_only", label: "Pickup Only" },
  ];

  const cuisineOptions = [
    "Indian",
    "Chinese",
    "Italian",
    "Mexican",
    "Thai",
    "Continental",
    "Japanese",
    "Korean",
    "American",
    "Mediterranean",
    "French",
    "Spanish",
    "Greek",
    "Lebanese",
    "Vietnamese",
  ];

  const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const tabs = ["basic", "contact", "hours", "details"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCuisineChange = (cuisine) => {
    setFormData((prev) => ({
      ...prev,
      cuisine_types: prev.cuisine_types.includes(cuisine)
        ? prev.cuisine_types.filter((c) => c !== cuisine)
        : [...prev.cuisine_types, cuisine],
    }));
  };

  const handleWeeklyOffChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      weekly_off: prev.weekly_off.includes(day)
        ? prev.weekly_off.filter((d) => d !== day)
        : [...prev.weekly_off, day],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImagePreviews((prev) => [...prev, ...newImages]);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages.map((img) => img.preview)],
      }));
    }
  };

  const handleImageRemove = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRestaurantData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = tabs.indexOf(activeTab);
    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[prevIndex]);
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
        activeTab === id
          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
          : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const FormField = ({
    label,
    name,
    type = "text",
    value,
    placeholder,
    required = false,
    className = "",
    disabled = !isEditing,
    options = [],
    isSelect = false,
    isCheckbox = false,
    checked,
    onChange,
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange || handleChange}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
            disabled ? "bg-gray-50" : "bg-white"
          } ${className}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : isCheckbox ? (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange || handleChange}
            disabled={disabled}
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
          />
          <span className="text-sm text-gray-700">{label}</span>
        </div>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange || handleChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none ${
            disabled ? "bg-gray-50" : "bg-white"
          } ${className}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange || handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
            disabled ? "bg-gray-50" : "bg-white"
          } ${className}`}
        />
      )}
    </div>
  );

  const renderBasicInfo = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormField
          label="Restaurant Name"
          name="name"
          value={formData.name}
          placeholder="Enter restaurant name"
          required
        />
        <FormField
          label="Restaurant Type"
          name="restaurant_type"
          value={formData.restaurant_type}
          isSelect
          options={restaurantTypes}
        />
        <FormField
          label="Category"
          name="category"
          value={formData.category}
          placeholder="e.g., Fast Food, Fine Dining, Cafe"
          required
        />
        <FormField
          label="Food Categories"
          name="food_categories"
          value={formData.food_categories}
          placeholder="e.g., North Indian, South Indian, Chinese"
          required
        />
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cuisine Types <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {cuisineOptions.map((cuisine) => (
              <FormField
                key={cuisine}
                label={cuisine}
                name="cuisine_types"
                isCheckbox
                checked={formData.cuisine_types.includes(cuisine)}
                onChange={() => handleCuisineChange(cuisine)}
              />
            ))}
          </div>
        </div>
        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          placeholder="Describe your restaurant's atmosphere and specialties"
        />
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Location & Contact
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormField
          label="Address"
          name="address"
          type="textarea"
          value={formData.address}
          placeholder="Enter complete address"
          required
        />
        <FormField
          label="City"
          name="city"
          value={formData.city}
          placeholder="Enter city"
          required
        />
        <FormField
          label="State"
          name="state"
          value={formData.state}
          placeholder="Enter state"
          required
        />
        <FormField
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          placeholder="Enter pincode"
          required
        />
        <FormField
          label="Latitude"
          name="latitude"
          type="number"
          value={formData.latitude}
          placeholder="Enter latitude"
        />
        <FormField
          label="Longitude"
          name="longitude"
          type="number"
          value={formData.longitude}
          placeholder="Enter longitude"
        />
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          placeholder="Enter 10-digit phone number"
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          placeholder="Enter email address"
        />
      </div>
      {isEditing && (
        <div className="mt-8 space-y-6">
          {/* Current Location Display */}
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              Current Location
            </h3>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium text-gray-600">Address:</span>
                <p className="text-gray-800 mt-1">{formData.address}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Latitude:</span>
                  <span className="ml-2 font-mono text-orange-600">
                    {formData.latitude.toFixed(6)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Longitude:</span>
                  <span className="ml-2 font-mono text-orange-600">
                    {formData.longitude.toFixed(6)}
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
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 bg-white"
                  onKeyPress={(e) => e.key === "Enter" && searchLocation()}
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
                    <p className="text-gray-600 font-medium">Loading Map...</p>
                  </div>
                </div>
              ) : (
                <div
                  ref={mapRef}
                  className="w-full h-full bg-gradient-to-br from-blue-200 via-green-200 to-blue-300 relative cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    const newLat = formData.latitude + (y - 0.5) * 0.01;
                    const newLng = formData.longitude + (x - 0.5) * 0.01;
                    updateLocation(newLat, newLng);
                  }}
                >
                  {/* Map Marker */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-full"
                    style={{ left: "50%", top: "50%" }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        Restaurant Location
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
                onClick={() =>
                  updateLocation(formData.latitude, formData.longitude)
                }
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Reset to Center
              </button>
              <button
                onClick={() => {
                  const zoomStep = 0.001;
                  updateLocation(
                    formData.latitude + (Math.random() - 0.5) * zoomStep,
                    formData.longitude + (Math.random() - 0.5) * zoomStep
                  );
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Zoom In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderHours = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Business Hours & Delivery
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormField
          label="Open 24 Hours"
          name="is_24_hours"
          isCheckbox
          checked={formData.is_24_hours}
        />
        {!formData.is_24_hours && (
          <>
            <FormField
              label="Opening Time"
              name="opening_time"
              type="time"
              value={formData.opening_time}
              required
            />
            <FormField
              label="Closing Time"
              name="closing_time"
              type="time"
              value={formData.closing_time}
              required
            />
          </>
        )}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Weekly Off Days
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weekDays.map((day) => (
              <FormField
                key={day}
                label={day.slice(0, 3)}
                name="weekly_off"
                isCheckbox
                checked={formData.weekly_off.includes(day)}
                onChange={() => handleWeeklyOffChange(day)}
              />
            ))}
          </div>
        </div>
        <FormField
          label="Delivery Available"
          name="delivery_available"
          isCheckbox
          checked={formData.delivery_available}
        />
        <FormField
          label="Pickup Available"
          name="pickup_available"
          isCheckbox
          checked={formData.pickup_available}
        />
        <FormField
          label="Delivery Type"
          name="delivery_type"
          value={formData.delivery_type}
          isSelect
          options={deliveryTypes}
        />
        <FormField
          label="Delivery Radius (KM)"
          name="delivery_radius"
          type="number"
          value={formData.delivery_radius}
          min="1"
        />
        <FormField
          label="Min Delivery Time (Minutes)"
          name="min_delivery_time"
          type="number"
          value={formData.min_delivery_time}
          min="1"
        />
        <FormField
          label="Max Delivery Time (Minutes)"
          name="max_delivery_time"
          type="number"
          value={formData.max_delivery_time}
          min="1"
        />
        <FormField
          label="Min Order Amount (₹)"
          name="min_order_amount"
          type="number"
          value={formData.min_order_amount}
          min="0"
          step="0.01"
        />
        <FormField
          label="Delivery Fee (₹)"
          name="delivery_fee"
          type="number"
          value={formData.delivery_fee}
          min="0"
          step="0.01"
        />
        <FormField
          label="Packaging Fee (₹)"
          name="packaging_fee"
          type="number"
          value={formData.packaging_fee}
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Business Details & Features
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormField
          label="GST Number"
          name="gst_number"
          value={formData.gst_number}
          placeholder="Enter GST number"
        />
        <FormField
          label="FSSAI License"
          name="fssai_license"
          value={formData.fssai_license}
          placeholder="Enter FSSAI license number"
        />
        <FormField
          label="Business License"
          name="business_license"
          value={formData.business_license}
          placeholder="Enter business license number"
        />
        <FormField
          label="Status"
          name="status"
          value={formData.status}
          isSelect
          options={statusChoices}
        />
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Methods
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <FormField
                label="Cash"
                name="accepts_cash"
                isCheckbox
                checked={formData.accepts_cash}
              />
              <CreditCard className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <FormField
                label="Card"
                name="accepts_card"
                isCheckbox
                checked={formData.accepts_card}
              />
              <CreditCard className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <FormField
                label="UPI"
                name="accepts_upi"
                isCheckbox
                checked={formData.accepts_upi}
              />
              <Phone className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <FormField
                label="Parking"
                name="has_parking"
                isCheckbox
                checked={formData.has_parking}
              />
              <Car className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <FormField
                label="WiFi"
                name="has_wifi"
                isCheckbox
                checked={formData.has_wifi}
              />
              <Wifi className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <FormField
                label="AC"
                name="has_ac"
                isCheckbox
                checked={formData.has_ac}
              />
              <Thermometer className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Verification & Promotion
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <FormField
                label="Verified"
                name="is_verified"
                isCheckbox
                checked={formData.is_verified}
              />
              <Check className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <FormField
                label="Featured"
                name="is_featured"
                isCheckbox
                checked={formData.is_featured}
              />
              <Star className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl">
              <FormField
                label="Promoted"
                name="is_promoted"
                isCheckbox
                checked={formData.is_promoted}
              />
              <Star className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Image Gallery
          </h3>
          {isEditing && (
            <div className="relative mb-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="gallery-upload"
              />
              <label
                htmlFor="gallery-upload"
                className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-400 transition-all duration-300 bg-white group"
              >
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-orange-500 transition-colors duration-300" />
                  <p className="text-gray-600 font-medium">
                    Upload Restaurant Images
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG up to 10MB each
                  </p>
                </div>
              </label>
            </div>
          )}
          {imagePreviews.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagePreviews.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.preview}
                    alt={`Restaurant ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl shadow-md"
                  />
                  {isEditing && (
                    <button
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No images uploaded yet.</p>
          )}
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">
              {formData.rating}
            </div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">
              {formData.total_reviews}
            </div>
            <div className="text-sm text-gray-600">Reviews</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">
              {formData.capacity}
            </div>
            <div className="text-sm text-gray-600">Capacity</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case "basic":
        return renderBasicInfo();
      case "contact":
        return renderContact();
      case "hours":
        return renderHours();
      case "details":
        return renderDetails();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <>
      <RestaurantNavbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="relative h-40 sm:h-48 bg-gradient-to-r from-orange-600 via-red-500 to-pink-500">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>

            <div className="relative px-6 sm:px-8 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white shadow-xl overflow-hidden border-4 border-white">
                      {imagePreviews.length > 0 ? (
                        <img
                          src={imagePreviews[0].preview}
                          alt="Restaurant"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                          <span className="text-white font-bold text-2xl sm:text-3xl">
                            {formData.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      {isEditing && (
                        <label className="absolute top-2 right-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-opacity-30 transition-all duration-200">
                          <Camera className="w-4 h-4 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload({
                                target: { files: [e.target.files[0]] },
                              })
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                      {formData.name}
                    </h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{formData.rating}</span>
                        <span>({formData.total_reviews} reviews)</span>
                      </div>
                      <span>•</span>
                      <span>{formData.cuisine_types.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 sm:mt-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setImagePreviews([]);
                          setFormData((prev) => ({ ...prev, images: [] }));
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                        <span className="hidden sm:inline">Cancel</span>
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-sm"
                      >
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">Save</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-lg">
            <TabButton id="basic" label="Basic Info" icon={Edit3} />
            <TabButton id="contact" label="Contact" icon={Phone} />
            <TabButton id="hours" label="Hours" icon={Clock} />
            <TabButton id="details" label="Details" icon={Star} />
          </div>

          <div className="space-y-8">
            <form onSubmit={handleSubmit}>
              {renderCurrentTab()}
              <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeTab === "basic"}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "basic"
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Previous
                </button>
                <div className="text-sm text-gray-500">
                  {activeTab === "basic"
                    ? "Basic Info"
                    : activeTab === "contact"
                    ? "Contact"
                    : activeTab === "hours"
                    ? "Hours"
                    : "Details"}
                </div>
                {activeTab !== "details" ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Save Profile</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
