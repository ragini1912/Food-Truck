import React, { useState } from "react";
import { Search, Filter, Star, MapPin, Phone, X } from "lucide-react";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";

const RestaurantDelivery = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const [drivers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      phone: "+1 234-567-8901",
      rating: 4.8,
      status: "available",
      location: "Downtown",
      completedOrders: 145,
      earnings: 2340,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Sarah Chen",
      phone: "+1 234-567-8902",
      rating: 4.9,
      status: "busy",
      location: "Midtown",
      completedOrders: 203,
      earnings: 3120,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Mike Torres",
      phone: "+1 234-567-8903",
      rating: 4.7,
      status: "offline",
      location: "Uptown",
      completedOrders: 89,
      earnings: 1450,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      phone: "+1 234-567-8904",
      rating: 4.6,
      status: "available",
      location: "East Side",
      completedOrders: 167,
      earnings: 2680,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ]);

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || driver.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <RestaurantNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto p-4 lg:p-7 space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search drivers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drivers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDrivers.map((driver) => (
              <div
                key={driver.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(
                        driver.status
                      )} rounded-full border-2 border-white`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{driver.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {driver.location}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {driver.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {driver.completedOrders}
                    </p>
                    <p className="text-xs text-gray-500">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{driver.earnings}
                    </p>
                    <p className="text-xs text-gray-500">Earnings</p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => setSelectedDriver(driver)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                  >
                    View Details
                  </button>
                  <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Driver Detail Modal */}
          {selectedDriver && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-md w-full p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Driver Details
                  </h3>
                  <button
                    onClick={() => setSelectedDriver(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <img
                    src={selectedDriver.avatar}
                    alt={selectedDriver.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h4 className="text-lg font-bold text-gray-900">
                    {selectedDriver.name}
                  </h4>
                  <p className="text-gray-600">{selectedDriver.location}</p>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">
                      {selectedDriver.rating}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        selectedDriver.status === "available"
                          ? "bg-green-100 text-green-800"
                          : selectedDriver.status === "busy"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedDriver.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed Orders</span>
                    <span className="font-medium">
                      {selectedDriver.completedOrders}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Earnings</span>
                    <span className="font-medium">
                      ₹{selectedDriver.earnings}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Call Driver
                  </button>
                  <button className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50">
                    Track Location
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantDelivery;
