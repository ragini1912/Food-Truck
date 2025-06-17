import React, { useState, useEffect, useRef, useContext } from "react";
import {
  ChefHat,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  CreditCard,
  Wifi,
  Car,
  Thermometer,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import { Loader } from "@googlemaps/js-api-loader";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";

const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    restaurant_type: "restaurant",
    category: "",
    food_categories: "",
    cuisine_types: [],
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
    phone: "",
    email: "",
    delivery_available: true,
    delivery_type: "platform",
    pickup_available: true,
    delivery_radius: 5,
    min_delivery_time: 30,
    max_delivery_time: 60,
    min_order_amount: 0.0,
    delivery_fee: 0.0,
    packaging_fee: 0.0,
    opening_time: "",
    closing_time: "",
    is_24_hours: false,
    weekly_off: [],
    gst_number: "",
    fssai_license: "",
    business_license: "",
    status: "active",
    is_verified: false,
    is_featured: false,
    is_promoted: false,
    accepts_cash: true,
    accepts_card: true,
    accepts_upi: true,
    has_parking: false,
    has_wifi: false,
    has_ac: false,
  });
  const { setRestaurantData } = useContext(RestaurantContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    console.log("currentStep changed:", currentStep);
    console.log("isRegistered:", isRegistered);
  }, [currentStep, isRegistered]);

  // Load Google Maps API
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    loader
      .load()
      .then(() => {
        setIsMapLoaded(true);
      })
      .catch((e) => {
        console.error("Failed to load Google Maps API:", e);
      });
  }, []);

  // Initialize map when showing
  useEffect(() => {
    if (showMap && isMapLoaded && window.google && mapRef.current && !map) {
      initializeMap();
    }
  }, [showMap, isMapLoaded]);

  const initializeMap = () => {
    const defaultCenter = { lat: 28.6139, lng: 77.209 }; // Delhi default
    const currentCenter =
      formData.latitude && formData.longitude
        ? {
            lat: parseFloat(formData.latitude),
            lng: parseFloat(formData.longitude),
          }
        : defaultCenter;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 15,
      center: currentCenter,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    const markerInstance = new window.google.maps.Marker({
      position: currentCenter,
      map: mapInstance,
      draggable: true,
      title: "Restaurant Location",
    });

    mapInstance.addListener("click", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      markerInstance.setPosition(event.latLng);
      updateLocationFromMap(lat, lng);
      reverseGeocode(lat, lng);
    });

    markerInstance.addListener("dragend", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      updateLocationFromMap(lat, lng);
      reverseGeocode(lat, lng);
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  const updateLocationFromMap = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    }));
  };

  const reverseGeocode = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        const formattedAddress = results[0].formatted_address;

        let city = "",
          state = "",
          pincode = "";

        addressComponents.forEach((component) => {
          const types = component.types;
          if (
            types.includes("locality") ||
            types.includes("administrative_area_level_2")
          ) {
            city = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (types.includes("postal_code")) {
            pincode = component.long_name;
          }
        });

        setFormData((prev) => ({
          ...prev,
          address: formattedAddress,
          city: city || prev.city,
          state: state || prev.state,
          pincode: pincode || prev.pincode,
        }));
      }
    });
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.name.trim())
          newErrors.name = "Restaurant name is required";
        if (!formData.category.trim())
          newErrors.category = "Category is required";
        if (!formData.food_categories.trim())
          newErrors.food_categories = "Food categories are required";
        if (formData.cuisine_types.length === 0)
          newErrors.cuisine_types = "Select at least one cuisine type";
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
        if (!formData.phone.trim())
          newErrors.phone = "Phone number is required";
        if (formData.phone && !/^\d{10}$/.test(formData.phone))
          newErrors.phone = "Phone must be 10 digits";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Invalid email format";
        break;
      case 3:
        if (
          !formData.is_24_hours &&
          (!formData.opening_time || !formData.closing_time)
        ) {
          newErrors.opening_time = "Business hours are required";
        }
        break;
      case 4:
        // Optional validation: Require at least one payment method
        if (
          !formData.accepts_cash &&
          !formData.accepts_card &&
          !formData.accepts_upi
        ) {
          newErrors.payment_methods = "Select at least one payment method";
        }
        break;
      default:
        newErrors.general = "Unknown step in validation.";
        break;
    }

    console.log("Validation errors for step", step, ":", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log("handleNext called, currentStep:", currentStep);
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => {
        const nextStep = Math.min(prev + 1, 4);
        console.log("Moving to step:", nextStep);
        return nextStep;
      });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit called, currentStep:", currentStep, "event:", e);
    if (currentStep === 4 && validateStep(currentStep)) {
      console.log("Submitting form with data:", formData);
      setRestaurantData(formData);
      setIsRegistered(true);
      navigate("/restaurant/profile");
    } else if (validateStep(currentStep)) {
      setCurrentStep((prev) => {
        const nextStep = Math.min(prev + 1, 4);
        console.log("Moving to step from submit:", nextStep);
        return nextStep;
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
      e.preventDefault();
      console.log("Enter key prevented from submitting form");
    }
  };

  const handleMapToggle = () => {
    setShowMap(!showMap);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep >= step
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <div
                className={`w-12 h-1 mx-2 transition-all duration-300 ${
                  currentStep > step
                    ? "bg-gradient-to-r from-orange-500 to-red-500"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <ChefHat className="mx-auto h-12 w-12 text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
        <p className="text-gray-600">Tell us about your restaurant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Restaurant Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter restaurant name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Restaurant Type
          </label>
          <select
            name="restaurant_type"
            value={formData.restaurant_type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
          >
            {restaurantTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Fast Food, Fine Dining, Cafe"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.category}
            </p>
          )}
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Food Categories <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="food_categories"
            value={formData.food_categories}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
              errors.food_categories ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., North Indian, South Indian, Chinese"
          />
          {errors.food_categories && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.food_categories}
            </p>
          )}
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cuisine Types <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {cuisineOptions.map((cuisine) => (
              <label
                key={cuisine}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.cuisine_types.includes(cuisine)}
                  onChange={() => handleCuisineChange(cuisine)}
                  className="w-4 h-4 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">{cuisine}</span>
              </label>
            ))}
          </div>
          {errors.cuisine_types && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.cuisine_types}
            </p>
          )}
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 resize-none"
            placeholder="Tell customers about your restaurant..."
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="mx-auto h-12 w-12 text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Location & Contact</h2>
        <p className="text-gray-600">Where can customers find you?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 resize-none ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter complete address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter city"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter state"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.state}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
              errors.pincode ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter pincode"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.pincode}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Latitude
          </label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
            step="0.000001"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
            placeholder="Enter latitude"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Longitude
          </label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
            step="0.000001"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
            placeholder="Enter longitude"
            readOnly
          />
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Select Location on Map
            </label>
            <button
              type="button"
              onClick={handleMapToggle}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>{showMap ? "Hide Map" : "Show Map"}</span>
            </button>
          </div>

          {showMap && (
            <div className="relative">
              <div
                ref={mapRef}
                className="w-full h-80 rounded-xl border-2 border-gray-300 bg-gray-100 flex items-center justify-center"
              >
                {!isMapLoaded && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">
                      Loading Google Maps...
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Note: You'll need a valid Google Maps API key
                    </p>
                  </div>
                )}
              </div>
              {showMap && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    📍 Click on the map or drag the marker to set your
                    restaurant location
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter 10-digit phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Clock className="mx-auto h-12 w-12 text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">
          Business Hours & Delivery
        </h2>
        <p className="text-gray-600">
          Set your operating hours and delivery options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              name="is_24_hours"
              checked={formData.is_24_hours}
              onChange={handleInputChange}
              className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
            />
            <label className="text-sm font-semibold text-gray-700">
              Open 24 Hours
            </label>
          </div>
        </div>

        {!formData.is_24_hours && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Opening Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="opening_time"
                value={formData.opening_time}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
                  errors.opening_time ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.opening_time && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.opening_time}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Closing Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="closing_time"
                value={formData.closing_time}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 ${
                  errors.closing_time ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.closing_time && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.closing_time}
                </p>
              )}
            </div>
          </>
        )}

        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Weekly Off Days
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weekDays.map((day) => (
              <label
                key={day}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.weekly_off.includes(day)}
                  onChange={() => handleWeeklyOffChange(day)}
                  className="w-4 h-4 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {day.slice(0, 3)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Delivery Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="delivery_available"
                checked={formData.delivery_available}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <label className="text-sm font-semibold text-gray-700">
                Delivery Available
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="pickup_available"
                checked={formData.pickup_available}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <label className="text-sm font-semibold text-gray-700">
                Pickup Available
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Delivery Type
          </label>
          <select
            name="delivery_type"
            value={formData.delivery_type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
          >
            {deliveryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Delivery Radius (KM)
          </label>
          <input
            type="number"
            name="delivery_radius"
            value={formData.delivery_radius}
            onChange={handleInputChange}
            min="1"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Min Delivery Time (Minutes)
          </label>
          <input
            type="number"
            name="min_delivery_time"
            value={formData.min_delivery_time}
            onChange={handleInputChange}
            min="1"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Max Delivery Time (Minutes)
          </label>
          <input
            type="number"
            name="max_delivery_time"
            value={formData.max_delivery_time}
            onChange={handleInputChange}
            min="1"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Min Order Amount (₹)
          </label>
          <input
            type="number"
            name="min_order_amount"
            value={formData.min_order_amount}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Delivery Fee (₹)
          </label>
          <input
            type="number"
            name="delivery_fee"
            value={formData.delivery_fee}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Packaging Fee (₹)
          </label>
          <input
            type="number"
            name="packaging_fee"
            value={formData.packaging_fee}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Star className="mx-auto h-12 w-12 text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">
          Business Details & Features
        </h2>
        <p className="text-gray-600">Complete your restaurant profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            GST Number
          </label>
          <input
            type="text"
            name="gst_number"
            value={formData.gst_number}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
            placeholder="Enter GST number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            FSSAI License
          </label>
          <input
            type="text"
            name="fssai_license"
            value={formData.fssai_license}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
            placeholder="Enter FSSAI license number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business License
          </label>
          <input
            type="text"
            name="business_license"
            value={formData.business_license}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
            placeholder="Enter business license number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
          >
            {statusChoices.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Methods
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all duration-200">
              <input
                type="checkbox"
                name="accepts_cash"
                checked={formData.accepts_cash}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <CreditCard className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">
                Cash
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all duration-200">
              <input
                type="checkbox"
                name="accepts_card"
                checked={formData.accepts_card}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <CreditCard className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">
                Card
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all duration-200">
              <input
                type="checkbox"
                name="accepts_upi"
                checked={formData.accepts_upi}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <Phone className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">UPI</label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all duration-200">
              <input
                type="checkbox"
                name="has_parking"
                checked={formData.has_parking}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <Car className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">
                Parking
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all duration-200">
              <input
                type="checkbox"
                name="has_wifi"
                checked={formData.has_wifi}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <Wifi className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">
                WiFi
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all duration-200">
              <input
                type="checkbox"
                name="has_ac"
                checked={formData.has_ac}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <Thermometer className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">AC</label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Verification & Promotion
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all duration-200">
              <input
                type="checkbox"
                name="is_verified"
                checked={formData.is_verified}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <CheckCircle className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">
                Verified
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all duration-200">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <Star className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">
                Featured
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all duration-200">
              <input
                type="checkbox"
                name="is_promoted"
                checked={formData.is_promoted}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <Star className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">
                Promoted
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    console.log("Rendering step:", currentStep);
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <>
      <RestaurantNavbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Register Your Restaurant
              </h1>
              <p className="text-orange-100">
                Join our platform and start serving your delicious food!
              </p>
            </div>

            <div className="p-6 md:p-12">
              {renderStepIndicator()}

              <form onSubmit={handleSubmit} className="space-y-8">
                {renderCurrentStep()}

                <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      currentStep === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="text-sm text-gray-500">
                    Step {currentStep} of 4
                  </div>

                  {currentStep < 4 ? (
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
                      <CheckCircle className="w-5 h-5" />
                      <span>Register Restaurant</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantForm;
