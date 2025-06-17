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
  X,
  BookOpen,
} from "lucide-react";
import UserNavbar from "../Navbar/UserNavbar";
import { useNavigate } from "react-router-dom";

const UserRestaurantPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("order");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ultimate Loaded Nacho Fiesta",
      category: "Hot Nacho Chips",
      price: 20,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Smoked Salmon Bagel",
      category: "Smoked Biscuit",
      price: 40,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Cranberry Club Sandwich",
      category: "Vegetables",
      price: 50,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

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
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      badge: "Best Seller",
      isVeg: true,
      customizable: false,
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
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      badge: "Customized",
      isVeg: true,
      customizable: true,
    },
    {
      id: 3,
      name: "Smoked Salmon Bagel",
      category: "Sandwich",
      price: 20,
      originalPrice: null,
      rating: 4.9,
      reviews: "1k+ Ratings",
      description:
        "This sandwich is a delightful combination of fresh crisp lettuce, juicy tomato slices.",
      image:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
      badge: null,
      isVeg: false,
      customizable: true,
    },
    {
      id: 4,
      name: "Avocado toasts with radish and...",
      category: "Sandwich",
      price: 25,
      originalPrice: null,
      rating: 4.6,
      reviews: "1k+ Ratings",
      description:
        "This sandwich is a delightful combination of fresh creamy avocado slices of toasts.",
      image:
        "https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop",
      badge: null,
      isVeg: true,
      customizable: false,
    },
    {
      id: 5,
      name: "Cranberry Club Sandwich",
      category: "Sandwich",
      price: 50,
      originalPrice: null,
      rating: 4.8,
      reviews: "1k+ Ratings",
      description:
        "The club sandwich is a classic favorite, known for its layers of delicious cured.",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      badge: null,
      isVeg: false,
      customizable: false,
    },
    {
      id: 6,
      name: "Delicious taco shells with ground...",
      category: "Tacos",
      price: 30,
      originalPrice: null,
      rating: 4.7,
      reviews: "1k+ Ratings",
      description:
        "Crunchy or delicious in each mouthful bite, crafted with fresh ingredients.",
      image:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
      badge: null,
      isVeg: false,
      customizable: false,
    },
  ];

  const categories = [
    { id: "", name: "All", count: menuItems.length },
    { id: "Best Seller", name: "Best Seller", count: 1 },
    { id: "Special Combos", name: "Special Combos", count: 1 },
    { id: "Sandwich", name: "Sandwich", count: 3 },
    { id: "Tacos", name: "Tacos", count: 1 },
    { id: "Pasta", name: "Pasta", count: 0 },
    { id: "Noodles", name: "Noodles", count: 0 },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Amazing food quality and fast delivery! The nachos were perfectly loaded.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "1 week ago",
      comment:
        "Great variety of options. The salmon bagel was fresh and delicious.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Best restaurant in town! Never disappointed with their service.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    },
  ];

  const photos = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
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
          image: menuItem.image,
        },
      ]);
    }
  };

  const handleCheckout = () => {
    navigate("/cart");
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = Math.round(subtotal * 0.1);
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

  // Mobile Cart Component
  const MobileCart = () => (
    <div
      className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
        isMobileCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsMobileCartOpen(false)}
      />
      {/* Cart Content */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white border-t shadow-2xl transition-transform duration-300 transform ${
          isMobileCartOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the cart from closing it
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Cart Items</h3>
            <button onClick={() => setIsMobileCartOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <div className="p-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-100 pb-4 flex items-start gap-3"
              >
                {/* Image with responsive size */}
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.category}
                      </p>
                    </div>
                    <span className="font-bold text-gray-800">
                      ₹{item.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Serve {item.quantity}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t bg-gray-50">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Sub Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Charge (2 kms)</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount (10%)</span>
              <span className="text-green-600">-₹{discount}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold">
                <span>To Pay</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );

  const renderOrderOnline = () => (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Desktop Category Sidebar */}
      <div className="hidden lg:block w-80">
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "hover:bg-orange-50 text-gray-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.name}</span>
                  <span
                    className={`text-sm ${
                      selectedCategory === category.id
                        ? "text-orange-100"
                        : "text-gray-500"
                    }`}
                  >
                    {category.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Controls */}
        <div className="lg:hidden flex gap-2 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:block relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
          />
        </div>

        {/* Category Header for Mobile */}
        <div className="lg:hidden mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {selectedCategory || "All Items"}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredItems.length} items)
            </span>
          </h2>
        </div>

        {/* Menu Items */}
        <div className="space-y-4 lg:space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-32 lg:w-48 h-32 lg:h-auto relative flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.badge && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {item.badge}
                    </span>
                  )}
                  <div className="absolute top-2 right-2">
                    <div
                      className={`w-5 h-5 lg:w-6 lg:h-6 rounded border-2 ${
                        item.isVeg ? "border-green-500" : "border-red-500"
                      } bg-white flex items-center justify-center`}
                    >
                      <div
                        className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${
                          item.isVeg ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 lg:p-6">
                  <div className="flex justify-between items-start mb-2 lg:mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1 lg:mb-2 leading-tight">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-1 lg:mb-2">
                        <div className="flex items-center gap-1">
                          {renderStars(item.rating)}
                        </div>
                        <span className="text-xs lg:text-sm text-gray-600 ml-1">
                          {item.reviews}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl lg:text-2xl font-bold text-orange-600">
                          ₹{item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm lg:text-lg text-gray-400 line-through">
                            /₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                      {item.customizable && (
                        <span className="text-xs text-orange-600 font-medium">
                          Customized
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 lg:mb-4 leading-relaxed text-sm lg:text-base">
                    {item.description}
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 lg:px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-sm lg:text-base"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Cart */}
      <div className="hidden lg:block w-80">
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-gray-800">Cart Items</h3>
          </div>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-100 pb-4 flex items-start gap-3"
              >
                {/* Image with responsive size */}
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.category}
                      </p>
                    </div>
                    <span className="font-bold text-gray-800">
                      ₹{item.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Serve {item.quantity}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Sub Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge (2 kms)</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount (10%)</span>
              <span className="text-green-600">-₹{discount}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
          About Our Restaurant
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
              alt="Restaurant interior"
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Welcome to Fiesta Mexico! We specialize in authentic Mexican
              cuisine with fresh, locally-sourced ingredients and traditional
              cooking methods that bring out the best flavors in every dish.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700">Ontario, Canada</span>
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
              <div className="flex">{renderStars(5.0)}</div>
              <span className="text-gray-600">5.0 (1k+ reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={photo}
              alt={`Restaurant view ${index + 1}`}
              className="w-full h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="flex">{renderStars(5.0)}</div>
            <span className="text-xl lg:text-2xl font-bold text-gray-800">
              5.0
            </span>
            <span className="text-gray-600">(1k+ reviews)</span>
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

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <UserNavbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">🌮</span>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">
                  Fiesta Mexico : Authentic Mexican Food
                </h1>
                <p className="text-gray-300 text-sm lg:text-base">
                  Ontario, Canada.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>4.0km</span>
                </div>
                <div className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-white" />
                  <span className="font-semibold">5.0 (1k+ Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>4.0km</span>
              </div>
              <div className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-white" />
                <span className="font-semibold text-xs">5.0 (1k+ Reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 lg:px-6 py-3 lg:py-4 font-semibold transition-all duration-200 border-b-2 whitespace-nowrap text-sm lg:text-base ${
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {tabs.find((tab) => tab.id === activeTab).component()}
      </div>
      {/* Mobile Bottom Cart */}
      {cartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white rounded-lg px-3 py-1 text-sm font-semibold">
                {cartItems.length} items
              </div>
              <div>
                <div className="text-sm text-gray-600">Total</div>
                <div className="font-bold">₹{total}</div>
              </div>
            </div>
            <button
              onClick={() => setIsMobileCartOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              View cart →
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Modal */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCloseMobileMenu}
        onTouchStart={handleCloseMobileMenu} // Added for mobile touch support
      >
        <div
          className="flex items-center justify-center min-h-screen px-4"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()} // Prevent touch events inside the modal from closing it
        >
          <div
            className={`bg-white w-full max-w-md rounded-xl shadow-2xl transition-all duration-300 transform ${
              isMobileMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Menu Categories</h3>
                <button onClick={handleCloseMobileMenu}>
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-orange-100 text-orange-600 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Menu Button at Bottom Left */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-24 left-4 z-40 flex flex-col items-center justify-center bg-gray-800 text-white p-3 rounded-lg shadow-lg"
      >
        <BookOpen className="w-5 h-5 mb-1" />
        <span className="text-xs font-medium">Menu</span>
      </button>
      <MobileCart />
    </div>
  );
};

export default UserRestaurantPage;
