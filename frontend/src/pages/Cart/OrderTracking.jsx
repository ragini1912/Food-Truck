import React, { useState, useEffect } from "react";
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
import UserNavbar from "../../components/Navbar/UserNavbar";

const OrderTracking = () => {
  const [activeTab, setActiveTab] = useState("status");
  const [driverPosition, setDriverPosition] = useState({
    lat: 34.8526,
    lng: -82.394,
  });
  const [orderStatus, setOrderStatus] = useState("on-the-way");

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPosition((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.002,
        lng: prev.lng + (Math.random() - 0.5) * 0.002,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const orderItems = [
    {
      name: "Ultimate Loaded Nacho Fiesta",
      description: "Red Nacho Chips",
      price: 20,
    },
    { name: "Smoked Salmon Bagel", description: "Smoked Biscuit", price: 40 },
    { name: "Cranberry Club Sandwich", description: "Vegetables", price: 50 },
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

  const MapComponent = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden">
      {/* Mock map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300">
        {/* Map grid pattern */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border-l border-gray-400"
              style={{ left: `${i * 5}%`, height: "100%" }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border-t border-gray-400"
              style={{ top: `${i * 5}%`, width: "100%" }}
            />
          ))}
        </div>

        {/* Roads */}
        <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-600 opacity-60 transform rotate-12"></div>
        <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-600 opacity-60 transform -rotate-6"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-600 opacity-60"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-600 opacity-60 transform rotate-3"></div>

        {/* Restaurant marker */}
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Store className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Driver marker */}
        <div
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            top: `${40 + Math.sin(Date.now() / 3000) * 10}%`,
            left: `${50 + Math.cos(Date.now() / 4000) * 15}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rotate-45"></div>
        </div>

        {/* Delivery address marker */}
        <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <Home className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 33% 25% Q 45% 35% 50% 50% T 75% 75%"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeDasharray="10,5"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Google Maps style overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">G</span>
          </div>
          <div>
            <p className="text-sm font-medium">
              This page can't load Google Maps correctly
            </p>
            <button className="text-blue-500 text-xs underline">
              Do you own this website?
            </button>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-4 top-4 bg-white rounded-lg shadow-lg">
        <button className="block p-3 border-b hover:bg-gray-50">
          <ChevronLeft className="w-4 h-4 rotate-90" />
        </button>
        <button className="block p-3 hover:bg-gray-50">
          <ChevronRight className="w-4 h-4 rotate-90" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <UserNavbar />
      {/* Main Content */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm mb-2">
            <Home className="w-4 h-4" />
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">Order Tracking</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Order Tracking
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-96 lg:h-[500px]">
              <MapComponent />
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
                          <p className="text-sm text-gray-600">Blackville</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Store className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Restaurant Address</p>
                          <p className="text-sm text-gray-600">Starbucks</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Home className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Delivery Address</p>
                          <p className="text-sm text-gray-600">Blackville</p>
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
                        className="flex justify-between items-start p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200"
                      >
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
                        <span className="font-semibold text-red-600">-₹10</span>
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

        {/* Order Status Timeline */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="font-bold text-xl mb-6 text-gray-800">
            Order Progress
          </h3>
          <div className="flex items-center justify-between">
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
    </div>
  );
};

export default OrderTracking;
