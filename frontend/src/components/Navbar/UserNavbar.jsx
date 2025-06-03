import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  MapPin,
  ShoppingCart,
  Menu,
  X,
  User,
  Home,
  Info,
  ShoppingBag,
  BookOpen,
  FileText,
  Phone,
  Utensils,
  Coffee,
  Truck,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount] = useState(3); // Example cart count
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    setIsProfileDropdownOpen(false); // Close profile dropdown if another is opened
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setActiveDropdown(null); // Close other dropdowns if profile is opened
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const orderItems = [
    {
      name: "Browse Menu",
      icon: Utensils,
      description: "Explore our full menu",
      path: "/user-restaurant",
    },
    {
      name: "Quick Order",
      icon: Coffee,
      description: "Order your favorites fast",
      path: "/user-restaurant",
    },
    {
      name: "Catering",
      icon: Truck,
      description: "Large orders & events",
      path: "/user-restaurant",
    },
    {
      name: "Track Order",
      icon: MapPin,
      description: "Follow your delivery",
      path: "/order-tracking",
    },
  ];

  const blogItems = [
    { name: "Food Stories", icon: BookOpen, description: "Behind the scenes" },
    { name: "Recipes", icon: Utensils, description: "Try at home" },
    {
      name: "News & Updates",
      icon: FileText,
      description: "Latest announcements",
    },
    { name: "Chef Interviews", icon: User, description: "Meet our team" },
  ];

  // Remove About from pageItems
  const pageItems = [
    { name: "Locations", icon: MapPin, description: "Find us near you" },
    { name: "Careers", icon: User, description: "Join our team" },
    { name: "FAQ", icon: FileText, description: "Get your questions answered" },
  ];

  const DropdownMenu = ({ items, isOpen }) => (
    <div
      className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform ${
        isOpen
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div className="p-2">
        {items.map((item, index) => (
          <Link // Changed button to Link
            to={item.path || "#"} // Added path for navigation
            key={index}
            onClick={closeAllDropdowns}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-200 group"
          >
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </Link> // Changed from </button> to </Link>
        ))}
      </div>
    </div>
  );

  const MobileMenu = () => (
    <div
      className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Menu */}
      <div
        className={`absolute right-0 top-0 h-full w-80 max-w-[80vw] sm:max-w-[60vw] bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto scrollbar-hide ${
          // Adjusted max-width
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                FOOD TRUCK
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-2 pb-40">
          <Link // Changed button to Link
            to="/"
            onClick={closeAllDropdowns}
            className="w-full flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors text-left"
          >
            <Home className="w-5 h-5 text-orange-600" />
            <span className="font-medium">Home</span>
          </Link>

          <Link // Changed button to Link
            to="/about" // Example path
            onClick={closeAllDropdowns}
            className="w-full flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors text-left"
          >
            <Info className="w-5 h-5 text-orange-600" />
            <span className="font-medium">AboutUs</span>
          </Link>

          <div className="space-y-1">
            <button
              onClick={() => toggleDropdown("mobile-order")}
              className="w-full flex items-center justify-between p-4 hover:bg-orange-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Order</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === "mobile-order" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "mobile-order" && (
              <div className="ml-6 space-y-1">
                {orderItems.map((item, index) => (
                  <Link // Changed button to Link
                    to={item.path || "#"} // Added path for navigation
                    key={index}
                    onClick={closeAllDropdowns}
                    className="w-full flex items-center gap-3 p-3 hover:bg-orange-50 rounded-lg transition-colors text-left"
                  >
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <button
              onClick={() => toggleDropdown("mobile-blog")}
              className="w-full flex items-center justify-between p-4 hover:bg-orange-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Blog</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === "mobile-blog" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "mobile-blog" && (
              <div className="ml-6 space-y-1">
                {blogItems.map((item, index) => (
                  <Link // Changed button to Link
                    to={item.path || "#"} // Added path for navigation
                    key={index}
                    onClick={closeAllDropdowns}
                    className="w-full flex items-center gap-3 p-3 hover:bg-orange-50 rounded-lg transition-colors text-left"
                  >
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <button
              onClick={() => toggleDropdown("mobile-pages")}
              className="w-full flex items-center justify-between p-4 hover:bg-orange-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Pages</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === "mobile-pages" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "mobile-pages" && (
              <div className="ml-6 space-y-1">
                {pageItems.map((item, index) => (
                  <Link // Changed button to Link
                    to={item.path || "#"} // Added path for navigation
                    key={index}
                    onClick={closeAllDropdowns}
                    className="w-full flex items-center gap-3 p-3 hover:bg-orange-50 rounded-lg transition-colors text-left"
                  >
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link // Changed button to Link
            to="/Footer" // Example path
            onClick={closeAllDropdowns}
            className="w-full flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors text-left"
          >
            <Phone className="w-5 h-5 text-orange-600" />
            <span className="font-medium">Contact</span>
          </Link>

          {/* Added Cart and Profile to Mobile Menu */}
          <Link
            to="/cart"
            onClick={closeAllDropdowns}
            className="w-full flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors text-left"
          >
            <ShoppingCart className="w-5 h-5 text-orange-600" />
            <span className="font-medium">My Cart</span>
            {cartCount > 0 && (
              <span className="ml-auto bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/profile"
            onClick={closeAllDropdowns}
            className="w-full flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors text-left"
          >
            <User className="w-5 h-5 text-orange-600" />
            <span className="font-medium">My Profile</span>
          </Link>

          <Link
            to="/login" // Assuming a login page
            onClick={closeAllDropdowns}
            className="w-full flex items-center gap-3 p-4 mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl transition-colors text-left shadow-md hover:from-orange-600 hover:to-orange-700"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Login / Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );

  const profileMenuItems = [
    { name: "View Profile", icon: User, path: "/profile" },
    { name: "My Orders", icon: ShoppingBag, path: "/orders" }, // Example path
    { name: "Notifications", icon: Bell, path: "/notifications" }, // Example path
    { name: "Settings", icon: Settings, path: "/settings" }, // Example path
    { name: "Logout", icon: LogOut, path: "/logout" }, // Example path, handle logout logic
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 transition-all duration-300 ease-in-out font-sans">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              FOOD TRUCK
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2" ref={dropdownRef}>
            <Link
              to="/"
              onClick={closeAllDropdowns}
              className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors duration-200"
            >
              Home
            </Link>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("order")}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Order <ChevronDown size={16} />
              </button>
              <DropdownMenu
                items={orderItems}
                isOpen={activeDropdown === "order"}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("blog")}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Blog <ChevronDown size={16} />
              </button>
              <DropdownMenu
                items={blogItems}
                isOpen={activeDropdown === "blog"}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("pages")}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Pages <ChevronDown size={16} />
              </button>
              <DropdownMenu
                items={pageItems}
                isOpen={activeDropdown === "pages"}
              />
            </div>

            <Link
              to="/contact" // Example path
              onClick={closeAllDropdowns}
              className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right side icons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/Cart"
              className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown - Desktop */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors duration-200"
                aria-label="User Profile"
              >
                <User className="w-6 h-6" />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform opacity-100 translate-y-0 scale-100">
                  <div className="p-2">
                    <div className="p-4 border-b border-gray-100">
                      <h4 className="font-semibold text-gray-800">John Doe</h4>{" "}
                      {/* Example User Name */}
                      <p className="text-sm text-gray-500">
                        john.doe@example.com
                      </p>{" "}
                      {/* Example User Email */}
                    </div>
                    {profileMenuItems.map((item, index) => (
                      <Link
                        to={item.path}
                        key={index}
                        onClick={closeAllDropdowns}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-200 group"
                      >
                        <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-orange-100 transition-colors duration-200">
                          <item.icon className="w-4 h-4 text-gray-600 group-hover:text-orange-600 transition-colors" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/login" // Assuming a login page
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <Link
              to="/Cart"
              className="relative p-2 mr-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu />
    </nav>
  );
};

export default UserNavbar;
