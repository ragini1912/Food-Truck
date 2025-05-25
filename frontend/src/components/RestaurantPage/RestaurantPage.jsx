import React, { useState } from "react";
import {
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Search,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";

const RestaurantPage = () => {
  const [activeTab, setActiveTab] = useState("order");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ultimate Loaded Nacho Fiesta",
      category: "Hot Nacho Chips",
      price: 20,
      quantity: 1,
    },
    {
      id: 2,
      name: "Smoked Salmon Bagel",
      category: "Smoked Biscuit",
      price: 40,
      quantity: 2,
    },
    {
      id: 3,
      name: "Cranberry Club Sandwich",
      category: "Vegetables",
      price: 50,
      quantity: 3,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [
    {
      id: 1,
      name: "Ultimate Loaded Nacho Fiesta",
      category: "Best Seller",
      price: 40,
      originalPrice: null,
      rating: 4.8,
      reviews: "1k+ Ratings",
      description:
        "Nacho typically consists of layers of crispy tortilla chips topped with a variety of delicious ingredients...",
      image: "/api/placeholder/200/150",
      badge: "Best Seller",
      isVeg: true,
    },
    {
      id: 2,
      name: "Burger & French Fries Combo",
      category: "Special Combos",
      price: 30,
      originalPrice: 60,
      rating: 4.7,
      reviews: "1k+ Ratings",
      description:
        "Your burger dish looks perfect combination of flavors and textures.",
      image: "/api/placeholder/200/150",
      badge: "Customized",
      isVeg: true,
    },
    {
      id: 3,
      name: "Smoked Salmon Bagel",
      category: "Sandwich",
      price: 35,
      originalPrice: null,
      rating: 4.9,
      reviews: "850+ Ratings",
      description:
        "Fresh smoked salmon with cream cheese on a toasted everything bagel.",
      image: "/api/placeholder/200/150",
      badge: null,
      isVeg: false,
    },
    {
      id: 4,
      name: "Pesto Penne Pasta",
      category: "Pasta",
      price: 28,
      originalPrice: null,
      rating: 4.6,
      reviews: "650+ Ratings",
      description: "Creamy pesto sauce with fresh basil and parmesan cheese.",
      image: "/api/placeholder/200/150",
      badge: null,
      isVeg: true,
    },
  ];

  const categories = [
    "Best Seller",
    "Special Combos",
    "Sandwich",
    "Tacos",
    "Pasta",
    "Noodles",
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Amazing food quality and fast delivery! The nachos were perfectly loaded.",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "1 week ago",
      comment:
        "Great variety of options. The salmon bagel was fresh and delicious.",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Best restaurant in town! Never disappointed with their service.",
      avatar: "/api/placeholder/40/40",
    },
  ];

  const photos = [
    "/api/placeholder/300/200",
    "/api/placeholder/300/200",
    "/api/placeholder/300/200",
    "/api/placeholder/300/200",
    "/api/placeholder/300/200",
    "/api/placeholder/300/200",
  ];

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addToCart = (menuItem) => {
    const existingItem = cartItems.find((item) => item.name === menuItem.name);
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: menuItem.name,
          category: menuItem.category,
          price: menuItem.price,
          quantity: 1,
        },
      ]);
    }
  };

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const renderOrderOnline = () => (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Menu Section */}
      <div className="flex-1">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-48 md:h-auto relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {item.badge}
                    </span>
                  )}
                  <div className="absolute top-3 right-3">
                    <div
                      className={`w-6 h-6 rounded border-2 ${
                        item.isVeg ? "border-green-500" : "border-red-500"
                      } bg-white flex items-center justify-center`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.isVeg ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange-600">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {item.reviews}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="lg:w-80">
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-gray-800">Cart Items</h3>
          </div>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.category}
                    </p>
                  </div>
                  <span className="font-bold text-gray-800">${item.price}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Serve {item.quantity}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Sub Total</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge (2 kms)</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount (10%)</span>
              <span className="text-green-600">-${discount.toFixed(0)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          About Our Restaurant
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src="/api/placeholder/400/300"
              alt="Restaurant interior"
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Welcome to our premium dining experience! We specialize in fresh,
              locally-sourced ingredients and innovative culinary techniques
              that bring out the best flavors in every dish.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700">
                  123 Food Street, Culinary District
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700">Open: 9:00 AM - 11:00 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700">+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">{renderStars(4.8)}</div>
              <span className="text-gray-600">4.8 (2.5k+ reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={photo}
              alt={`Restaurant photo ${index + 1}`}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="flex">{renderStars(4.8)}</div>
            <span className="text-2xl font-bold text-gray-800">4.8</span>
            <span className="text-gray-600">(2,500+ reviews)</span>
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-100 pb-6 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {review.name}
                    </h4>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "order", label: "Order Online", component: renderOrderOnline },
    { id: "overview", label: "Overview", component: renderOverview },
    { id: "photos", label: "Photos", component: renderPhotos },
    { id: "reviews", label: "Reviews", component: renderReviews },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Gourmet Kitchen
                </h1>
                <p className="text-gray-600 text-sm">
                  Premium dining experience
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>30-45 min</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>2.5 km away</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-orange-600 border-orange-600 bg-orange-50"
                    : "text-gray-600 border-transparent hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tabs.find((tab) => tab.id === activeTab).component()}
      </div>
    </div>
  );
};

export default RestaurantPage;
