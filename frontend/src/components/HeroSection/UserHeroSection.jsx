import React, { useState } from "react";
import { MapPin, Star, Clock, Phone, Search, X } from "lucide-react";
import DistanceChecker from "../DistanceChecker/DistanceChecker";

const UserHeroSection = () => {
  const [selectedDistance, setSelectedDistance] = useState(10);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [viewMode, setViewMode] = useState("map");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock food truck data
  const foodTrucks = [
    {
      id: 1,
      name: "Taco Paradise",
      type: "Mexican",
      rating: 4.8,
      distance: 2.3,
      position: { top: "25%", left: "35%" },
      cuisine: "Mexican Street Food",
      hours: "11:00 AM - 9:00 PM",
      phone: "(555) 123-4567",
      image: "🌮",
      specialties: ["Tacos", "Burritos", "Quesadillas"],
    },
    {
      id: 2,
      name: "Burger Beast",
      type: "American",
      rating: 4.6,
      distance: 1.8,
      position: { top: "40%", left: "60%" },
      cuisine: "Gourmet Burgers",
      hours: "12:00 PM - 10:00 PM",
      phone: "(555) 234-5678",
      image: "🍔",
      specialties: ["Beef Burgers", "Chicken Sandwiches", "Fries"],
    },
    {
      id: 3,
      name: "Ramen Road",
      type: "Japanese",
      rating: 4.9,
      distance: 3.1,
      position: { top: "60%", left: "45%" },
      cuisine: "Authentic Ramen",
      hours: "5:00 PM - 11:00 PM",
      phone: "(555) 345-6789",
      image: "🍜",
      specialties: ["Tonkotsu Ramen", "Miso Ramen", "Gyoza"],
    },
    {
      id: 4,
      name: "Pizza Planet",
      type: "Italian",
      rating: 4.7,
      distance: 4.2,
      position: { top: "30%", left: "70%" },
      cuisine: "Wood-Fired Pizza",
      hours: "11:30 AM - 9:30 PM",
      phone: "(555) 456-7890",
      image: "🍕",
      specialties: ["Margherita", "Pepperoni", "Veggie Supreme"],
    },
    {
      id: 5,
      name: "BBQ Express",
      type: "BBQ",
      rating: 4.5,
      distance: 5.8,
      position: { top: "50%", left: "25%" },
      cuisine: "Southern BBQ",
      hours: "12:00 PM - 8:00 PM",
      phone: "(555) 567-8901",
      image: "🍖",
      specialties: ["Pulled Pork", "Brisket", "Ribs"],
    },
    {
      id: 6,
      name: "Sweet Treats",
      type: "Dessert",
      rating: 4.8,
      distance: 1.5,
      position: { top: "70%", left: "65%" },
      cuisine: "Gourmet Desserts",
      hours: "2:00 PM - 10:00 PM",
      phone: "(555) 678-9012",
      image: "🍦",
      specialties: ["Ice Cream", "Waffles", "Churros"],
    },
  ];

  const filteredTrucks = foodTrucks.filter(
    (truck) =>
      truck.distance <= selectedDistance &&
      (searchQuery === "" ||
        truck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const HeroSection = () => (
    <div className="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black/20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block text-yellow-300">FOOD</span>
              <span className="block">TRUCKING</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-orange-200">
                SERVICES
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-orange-100 mb-8 max-w-lg">
              Discover the best food trucks in your area. Fresh, delicious meals
              on wheels, delivered right to your neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setViewMode("map")}
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Find Food Trucks
              </button>
              <button
                onClick={() => setViewMode("list")}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-200"
              >
                View All Trucks
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl transform rotate-6 shadow-2xl"></div>
              <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-8xl transform -rotate-3">
                🚚
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TruckCard = ({ truck, isMapView = false }) => (
    <div
      className={`${
        isMapView
          ? "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          : "w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      } 
      ${selectedTruck?.id === truck.id ? "z-50" : "z-30"}
      `}
      style={isMapView ? truck.position : {}}
      onClick={() =>
        setSelectedTruck(selectedTruck?.id === truck.id ? null : truck)
      }
    >
      {isMapView ? (
        <>
          <div className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <div className="text-2xl sm:text-3xl">{truck.image}</div>
          </div>

          <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-48 sm:w-64 bg-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
            <div className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl">{truck.image}</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                    {truck.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {truck.cuisine}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <span className="ml-1 font-semibold">{truck.rating}</span>
                </div>
                <span className="text-gray-500">{truck.distance}km away</span>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-100 text-xs sm:text-sm">
                <div className="flex items-center text-gray-600 mb-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {truck.hours}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {truck.phone}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{truck.image}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {truck.name}
                </h3>
                <p className="text-sm text-gray-600">{truck.cuisine}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{truck.rating}</span>
              </div>
              <p className="text-xs text-gray-500">{truck.distance}km away</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {truck.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{truck.hours}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{truck.phone}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-600">
              {truck.price}
            </span>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200">
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header for desktop */}
        <div className="hidden lg:flex justify-between items-center h-16 gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6 flex-shrink-0">
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === "map"
                  ? "bg-orange-100 text-orange-700"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === "list"
                  ? "bg-orange-100 text-orange-700"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              List View
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <DistanceChecker
                selectedDistance={selectedDistance}
                setSelectedDistance={setSelectedDistance}
              />
              {/* Search and buttons for mobile/tablet */}
              <div className="lg:hidden space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or cuisine..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setViewMode("map")}
                    className={`sm:w-1/2 px-4 py-2 rounded-lg font-medium transition-all ${
                      viewMode === "map"
                        ? "bg-orange-100 text-orange-700"
                        : "text-gray-600 hover:text-orange-600"
                    }`}
                  >
                    Map View
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`sm:w-1/2 px-4 py-2 rounded-lg font-medium transition-all ${
                      viewMode === "list"
                        ? "bg-orange-100 text-orange-700"
                        : "text-gray-600 hover:text-orange-600"
                    }`}
                  >
                    List View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {viewMode === "map" ? (
              /* Map View */
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Food Truck Locations
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Seattle Area</span>
                    </div>
                  </div>
                </div>

                <div className="relative h-72 lg:h-[400px] bg-gradient-to-br from-green-100 to-blue-100 overflow-hidden">
                  {/* Mock map background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 800 600">
                      <defs>
                        <pattern
                          id="grid"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="#ccc"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Food truck markers */}
                  {filteredTrucks.map((truck) => (
                    <TruckCard key={truck.id} truck={truck} isMapView={true} />
                  ))}

                  {/* User location */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-blue-600 whitespace-nowrap">
                      Your Location
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* List View */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Available Food Trucks
                  </h2>
                  <p className="text-gray-600">
                    {filteredTrucks.length} trucks found
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTrucks.map((truck) => (
                    <TruckCard key={truck.id} truck={truck} />
                  ))}
                </div>

                {filteredTrucks.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No trucks found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your distance or search criteria
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Truck Details Modal */}
      {selectedTruck && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedTruck.name}
                </h3>
                <button
                  onClick={() => setSelectedTruck(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="text-6xl mb-2">{selectedTruck.image}</div>
                <p className="text-lg text-gray-600">{selectedTruck.cuisine}</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">
                      {selectedTruck.rating}
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    {selectedTruck.distance}km away
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTruck.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{selectedTruck.hours}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{selectedTruck.phone}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-2xl font-bold text-green-600">
                    {selectedTruck.price}
                  </span>
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHeroSection;
