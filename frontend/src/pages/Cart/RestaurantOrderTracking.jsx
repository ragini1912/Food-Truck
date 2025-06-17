import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  CreditCard,
  Check,
  Package,
  Car,
  Store,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";

const RestaurantOrderTracking = () => {
  const [activeTab, setActiveTab] = useState("status");
  const [orderStatus, setOrderStatus] = useState("on-the-way");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Location coordinates
  const restaurantLocation = { lat: 34.8526, lng: -82.394 };
  const deliveryLocation = { lat: 34.8606, lng: -82.38 };
  const [driverLocation, setDriverLocation] = useState({
    lat: 34.8566,
    lng: -82.387,
  });

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => {
        // Move driver closer to delivery location over time
        const newLat =
          prev.lat +
          (deliveryLocation.lat - prev.lat) * 0.05 +
          (Math.random() - 0.5) * 0.001;
        const newLng =
          prev.lng +
          (deliveryLocation.lng - prev.lng) * 0.05 +
          (Math.random() - 0.5) * 0.001;
        return { lat: newLat, lng: newLng };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Initialize Google Map
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      // Create map
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 14,
        center: driverLocation,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      mapInstanceRef.current = map;

      // Restaurant marker
      const restaurantMarker = new window.google.maps.Marker({
        position: restaurantLocation,
        map: map,
        title: "Restaurant - Starbucks",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#3B82F6",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        },
      });

      // Delivery location marker
      const deliveryMarker = new window.google.maps.Marker({
        position: deliveryLocation,
        map: map,
        title: "Delivery Address",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#10B981",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        },
      });

      // Driver marker
      const driverMarker = new window.google.maps.Marker({
        position: driverLocation,
        map: map,
        title: "Driver - Jose Mike",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 15,
          fillColor: "#F59E0B",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 4,
        },
      });

      markersRef.current = [restaurantMarker, deliveryMarker, driverMarker];

      // Create route
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#3B82F6",
          strokeWeight: 4,
          strokeOpacity: 0.8,
        },
      });

      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin: restaurantLocation,
          destination: deliveryLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          }
        }
      );
    };

    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  // Update driver marker position
  useEffect(() => {
    if (mapInstanceRef.current && markersRef.current[2]) {
      markersRef.current[2].setPosition(driverLocation);
      mapInstanceRef.current.panTo(driverLocation);
    }
  }, [driverLocation]);

  const orderItems = [
    {
      name: "Ultimate Loaded Nacho Fiesta",
      description: "Hot Nacho Chips",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop",
    },
    {
      name: "Smoked Salmon Bagel",
      description: "Smoked Biscuit",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200&h=200&fit=crop",
    },
    {
      name: "Cranberry Club Sandwich",
      description: "Vegetables",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop",
    },
  ];

  const statusSteps = [
    { id: "confirmed", label: "Order Confirmed", completed: true },
    { id: "preparing", label: "Preparing", completed: true },
    {
      id: "on-the-way",
      label: "On the Way",
      completed: orderStatus === "on-the-way" || orderStatus === "delivered",
    },
    {
      id: "delivered",
      label: "Delivered",
      completed: orderStatus === "delivered",
    },
  ];

  // Fallback map component for when Google Maps isn't loaded
  const FallbackMap = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Loading Google Maps...</p>
        <p className="text-sm text-gray-500 mt-2">
          Please add your Google Maps API key to see the live map
        </p>
      </div>
    </div>
  );

  return (
    <>
      <RestaurantNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-600 to-slate-400 text-white py-6 px-4 shadow-2xl">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Order Tracking
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map and Order Progress Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-96 lg:h-[500px]">
                {window.google ? (
                  <div ref={mapRef} className="w-full h-full" />
                ) : (
                  <FallbackMap />
                )}
              </div>
              {/* Order Status Timeline */}
              <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-xl mb-6 text-gray-800">
                  Order Progress
                </h3>
                <div className="flex items-center justify-center">
                  {statusSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                            step.completed
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-110"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {step.completed ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <Package className="w-6 h-6" />
                          )}
                        </div>
                        <p
                          className={`mt-2 text-sm font-medium text-center ${
                            step.completed ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-4 transition-all duration-500 ${
                            statusSteps[index + 1].completed
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Details Section */}
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("status")}
                    className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                      activeTab === "status"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Order Status
                  </button>
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                      activeTab === "details"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Order Details
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                {activeTab === "status" && (
                  <div className="space-y-6">
                    {/* Delivery Info */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-green-800">
                            Deliver to: Home
                          </p>
                          <p className="text-green-600 text-sm">
                            85, Songland Cir, South Carolina, USA
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-800">
                            Payment Method
                          </p>
                          <p className="text-blue-600 text-sm">
                            Card 86** ****430
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Driver Info */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                      <h3 className="font-semibold text-orange-800 mb-4">
                        Driver Information
                      </h3>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          JM
                        </div>
                        <div>
                          <p className="font-semibold">Jose Mike</p>
                          <p className="text-sm text-gray-600">
                            Estimated Delivery: 30 mins
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Live Location Updates */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <h3 className="font-semibold text-purple-800 mb-3">
                        Live Tracking
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Restaurant: Starbucks</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          <span className="text-sm">
                            Driver: Moving to delivery
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">
                            Destination: Your Home
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800">
                        Shipping Details
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <Car className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Driver Position</p>
                            <p className="text-sm text-gray-600">En Route</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Store className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Restaurant</p>
                            <p className="text-sm text-gray-600">Starbucks</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Home className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Delivery Address</p>
                            <p className="text-sm text-gray-600">
                              Songland Cir
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      {orderItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 space-x-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                          <p className="font-bold text-lg text-gray-800">
                            ₹{item.price}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Bill Details */}
                    <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-4 text-lg">
                        Bill Details
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sub Total</span>
                          <span className="font-semibold">₹110</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Delivery Charge (2 kms)
                          </span>
                          <span className="font-semibold text-green-600">
                            Free
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount (10%)</span>
                          <span className="font-semibold text-red-600">
                            -₹10
                          </span>
                        </div>
                        <hr className="border-gray-300" />
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-bold text-gray-800">Total</span>
                          <span className="font-bold text-green-600">₹100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantOrderTracking;
