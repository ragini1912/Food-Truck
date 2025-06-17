import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  ChefHat,
  Utensils,
  Package,
  Star,
  Home,
  User,
  LogOut,
  Truck,
  ShoppingCart,
} from "lucide-react";

// Remove /* eslint-disable no-undef */ as the issue was resolved in the previous step

const RestaurantNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/restaurant" },
    { id: "menu", label: "Menu", icon: Utensils, path: "/restaurant/menu" },
    {
      id: "order-track",
      label: "Order Track",
      icon: Package,
      path: "/restaurant/order-tracking",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: ShoppingCart,
      path: "/restaurant/order-manage",
    },
    { id: "reviews", label: "Reviews", icon: Star, path: "/restaurant/review" },
    {
      id: "contact",
      label: "Contact",
      icon: Phone,
      path: "/restaurant/contact",
    },
    {
      id: "delivery",
      label: "Delivery",
      icon: Truck,
      path: "/restaurant/delivery",
    },
  ];

  const [activeSection, setActiveSection] = useState(() => {
    const currentSection = navItems.find(
      (item) => item.path === location.pathname
    );
    return currentSection ? currentSection.id : "home";
  });

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setShowProfileDropdown(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine active section based on current path
  useEffect(() => {
    const currentSection = navItems.find(
      (item) => item.path === location.pathname
    );
    if (currentSection) {
      setActiveSection(currentSection.id);
    }
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    if (showProfileDropdown) setShowProfileDropdown(false);
  };

  const handleNavClick = (sectionId, path) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    setShowProfileDropdown(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileDropdown(false);
    setActiveSection("home");
    navigate("/restaurant");
  };

  function toggleProfileDropdown() {
    setShowProfileDropdown(!showProfileDropdown);
    if (isOpen) setIsOpen(false);
  }

  const handleProfileClick = () => {
    setShowProfileDropdown(false);
    setIsOpen(false);
    navigate("/restaurant/profile");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showProfileDropdown]);

  return (
    <>
      {/* Top Info Bar - Visible on all screens, adjusted for smaller screens */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white text-[10px] xs:text-xs sm:text-sm py-1 xs:py-2 sm:py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-[1280px] mx-auto px-2 xs:px-4 sm:px-6 lg:px-4 xl:px-6 flex flex-col sm:flex-row justify-between items-center gap-y-1 sm:gap-y-0">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-2 xs:gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-1">
            <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 group">
              <Clock className="w-3 h-3 xs:w-4 h-4 sm:w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium">Open: Mon-Sun 11AM - 11PM</span>
            </div>
            <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 group">
              <MapPin className="w-3 h-3 xs:w-4 h-4 sm:w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">123 Gourmet Street</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 group cursor-pointer">
            <Phone className="w-3 h-3 xs:w-4 h-4 sm:w-5 h-5 group-hover:animate-pulse" />
            <span className="font-medium">+1 (555) 123-FOOD</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl shadow-2xl shadow-black/20"
            : "bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-2 xs:px-4 sm:px-6 lg:px-4 xl:px-6 2xl:max-w-[1400px]">
          <div className="flex justify-between items-center h-14 xs:h-16 sm:h-20 lg:h-20 xl:h-24">
            {/* Logo */}
            <Link
              to="/restaurant"
              onClick={() => handleNavClick("home", "/restaurant")}
              className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 group focus:outline-none"
            >
              <div className="relative transform group-hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 xs:w-10 h-10 sm:w-12 h-12 lg:w-12 h-12 xl:w-14 h-14 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-amber-500/30">
                  <ChefHat className="w-4 h-4 xs:w-5 h-5 sm:w-6 h-6 lg:w-6 h-6 xl:w-8 h-8 text-white drop-shadow-md" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 xs:w-3 h-3 sm:w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-md"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
                  Bella Vista
                </h1>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400 -mt-0.5 xs:-mt-0.5 sm:-mt-1 font-medium tracking-wide hidden xs:block">
                  Fine Dining Experience
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id, item.path)}
                      className={`relative px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-1.5 lg:py-2 xl:py-3 rounded-xl text-[10px] lg:text-xs xl:text-sm 2xl:text-base font-semibold transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-amber-400/50 border border-transparent ${
                        isActive
                          ? "text-amber-400 bg-gradient-to-r from-amber-500/20 to-orange-500/20 shadow-md border-amber-500/20"
                          : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center space-x-0.5 lg:space-x-1 xl:space-x-1.5 2xl:space-x-2">
                        <IconComponent
                          className={`w-3 h-3 lg:w-3.5 h-3.5 xl:w-4 h-4 2xl:w-5 h-5 transition-all duration-300 ${
                            isActive
                              ? "scale-110 text-amber-400"
                              : "group-hover:scale-105 group-hover:text-white"
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            isActive
                              ? "text-amber-400"
                              : "text-gray-300 group-hover:text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 lg:w-4 xl:w-5 2xl:w-6 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-sm animate-pulse" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-2">
              {isLoggedIn ? (
                <>
                  <div className="relative profile-dropdown">
                    <button
                      onClick={toggleProfileDropdown}
                      className="flex items-center space-x-0.5 lg:space-x-1 xl:space-x-1.5 2xl:space-x-2 px-1 lg:px-1.5 xl:px-2 2xl:px-2.5 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 shadow-md hover:shadow-lg border border-white/10"
                      aria-label="Profile"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        alt="User Avatar"
                        className="w-6 h-6 lg:w-7 h-7 xl:w-8 h-8 2xl:w-9 h-9 rounded-xl object-cover border-2 border-amber-400 shadow-sm"
                      />
                      <div
                        className={`transform transition-transform duration-300 ${
                          showProfileDropdown ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          className="w-2.5 h-2.5 lg:w-3 h-3 xl:w-3.5 h-3.5 2xl:w-4 h-4 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileDropdown && (
                      <div className="absolute right-0 top-full mt-1 lg:mt-2 w-44 lg:w-48 xl:w-52 2xl:w-64 bg-black/95 backdrop-blur-xl border border-amber-500/20 rounded-xl shadow-2xl py-1.5 lg:py-2 xl:py-2.5 2xl:py-3 z-50 animate-fadeIn">
                        <button
                          onClick={handleProfileClick}
                          className="w-full flex items-center space-x-1.5 lg:space-x-2 xl:space-x-2.5 2xl:space-x-3 px-2 lg:px-3 xl:px-4 2xl:px-5 py-1.5 lg:py-2 xl:py-2.5 2xl:py-3 border-b border-gray-700/30 text-left hover:bg-white/5 transition-all duration-200"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                            alt="User Avatar"
                            className="w-6 h-6 lg:w-7 h-7 xl:w-8 h-8 2xl:w-9 h-9 rounded-xl object-cover border-2 border-amber-400 shadow-sm"
                          />
                          <div>
                            <p className="text-white font-semibold text-[10px] lg:text-xs xl:text-sm 2xl:text-base">
                              John Doe
                            </p>
                            <p className="text-gray-400 text-[9px] lg:text-[10px] xl:text-xs 2xl:text-sm">
                              john@example.com
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={handleProfileClick}
                          className="w-full flex items-center space-x-1.5 lg:space-x-2 xl:space-x-2.5 2xl:space-x-3 px-2 lg:px-3 xl:px-4 2xl:px-5 py-1.5 lg:py-2 xl:py-2.5 2xl:py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-xl mx-0.5 my-0.5"
                        >
                          <User className="w-3 h-3 lg:w-3.5 h-3.5 xl:w-4 h-4 2xl:w-5 h-5" />
                          <span className="font-medium text-[10px] lg:text-xs xl:text-sm 2xl:text-base">
                            My Profile
                          </span>
                        </button>
                        <hr className="border-gray-700/30 my-0.5 lg:my-1 xl:my-1.5 2xl:my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-1.5 lg:space-x-2 xl:space-x-2.5 2xl:space-x-3 px-2 lg:px-3 xl:px-4 2xl:px-5 py-1.5 lg:py-2 xl:py-2.5 2xl:py-3 text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200 rounded-xl mx-0.5"
                        >
                          <LogOut className="w-3 h-3 lg:w-3.5 h-3.5 xl:w-4 h-4 2xl:w-5 h-5" />
                          <span className="font-medium text-[10px] lg:text-xs xl:text-sm 2xl:text-base">
                            Log Out
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/restaurant/login"
                    className="flex items-center space-x-0.5 lg:space-x-1 xl:space-x-1.5 2xl:space-x-2 px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold text-[10px] lg:text-xs xl:text-sm 2xl:text-base rounded-xl transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  >
                    <LogOut className="w-3 h-3 lg:w-3.5 h-3.5 xl:w-4 h-4 2xl:w-5 h-5" />
                    <span>Login</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/restaurant/login"
                  className="flex items-center space-x-0.5 lg:space-x-1 xl:space-x-1.5 2xl:space-x-2 px-2 lg:px-3 xl:px-4 2xl:px-6 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold text-[10px] lg:text-xs xl:text-sm 2xl:text-base rounded-xl transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                >
                  <LogOut className="w-3 h-3 lg:w-3.5 h-3.5 xl:w-4 h-4 2xl:w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-0.5 xs:space-x-1 sm:space-x-2">
              {isLoggedIn ? (
                <button
                  onClick={toggleProfileDropdown}
                  className="profile-dropdown relative focus:outline-none p-1 xs:p-1.5 sm:p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                  aria-label="Profile"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="User Avatar"
                    className="w-7 h-7 xs:w-8 h-8 sm:w-9 h-9 rounded-xl object-cover border-2 border-amber-400 shadow-sm"
                  />
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-1 xs:mt-2 w-52 xs:w-56 sm:w-64 bg-black/95 backdrop-blur-xl border border-amber-500/20 rounded-xl shadow-2xl py-1.5 xs:py-2 sm:py-3 z-50 animate-fadeIn">
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-3 border-b border-gray-700/30 text-left hover:bg-white/5 transition-all duration-200"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                          alt="User Avatar"
                          className="w-7 h-7 xs:w-8 h-8 sm:w-9 h-9 rounded-xl object-cover border-2 border-amber-400 shadow-sm"
                        />
                        <div>
                          <p className="text-white font-semibold text-xs xs:text-sm sm:text-base">
                            John Doe
                          </p>
                          <p className="text-gray-400 text-[10px] xs:text-xs sm:text-sm">
                            john@example.com
                          </p>
                        </div>
                      </button>
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-xl mx-0.5 xs:mx-1 my-0.5"
                      >
                        <User className="w-3.5 h-3.5 xs:w-4 h-4 sm:w-5 h-5" />
                        <span className="font-medium text-xs xs:text-sm sm:text-base">
                          Profile
                        </span>
                      </button>
                      <hr className="border-gray-700/30 my-0.5 xs:my-1 sm:my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-3 text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200 rounded-xl mx-0.5 xs:mx-1"
                      >
                        <LogOut className="w-3.5 h-3.5 xs:w-4 h-4 sm:w-5 h-5" />
                        <span className="font-medium text-xs xs:text-sm sm:text-base">
                          Log Out
                        </span>
                      </button>
                    </div>
                  )}
                </button>
              ) : (
                <Link
                  to="/restaurant/login"
                  className="p-1 xs:p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 shadow-md hover:shadow-lg transition-all duration-200"
                  aria-label="Login"
                >
                  <LogOut className="w-4 h-4 xs:w-5 h-5 sm:w-6 h-6" />
                </Link>
              )}

              <button
                onClick={() => handleNavClick("contact", "/restaurant/contact")}
                className="p-1 xs:p-1.5 sm:p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 shadow-md hover:shadow-lg transition-all duration-200"
                aria-label="Contact"
              >
                <Phone className="w-4 h-4 xs:w-5 h-5 sm:w-6 h-6" />
              </button>

              <button
                onClick={() =>
                  handleNavClick("delivery", "/restaurant/delivery")
                }
                className="p-1 xs:p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 shadow-md hover:shadow-lg transition-all duration-200"
                aria-label="Delivery"
              >
                <Truck className="w-4 h-4 xs:w-5 h-5 sm:w-6 h-6" />
              </button>

              <button
                onClick={toggleMobileMenu}
                className="p-1 xs:p-1.5 sm:p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
                aria-label="Toggle menu"
              >
                <div
                  className="transform transition-transform duration-300"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  {isOpen ? (
                    <X className="w-4 h-4 xs:w-5 h-5 sm:w-6 h-6" />
                  ) : (
                    <Menu className="w-4 h-4 xs:w-5 h-5 sm:w-6 h-6" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden bg-black/98 backdrop-blur-xl border-t border-amber-500/20 transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-6 max-h-[calc(100vh-3.5rem)] xs:max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto">
            <ul className="space-y-1 xs:space-y-2 sm:space-y-3">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id, item.path)}
                      className={`w-full flex items-center space-x-2 xs:space-x-3 sm:space-x-4 px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                        isActive
                          ? "text-amber-400 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/20 shadow-md"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`p-1 xs:p-1.5 sm:p-2 rounded-xl ${
                          isActive
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-white/5 text-gray-400"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 xs:w-5 h-5 sm:w-6 h-6 transition-transform duration-200 ${
                            isActive ? "scale-105" : ""
                          }`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-semibold text-sm xs:text-base sm:text-lg block">
                          {item.label}
                        </span>
                        <span className="text-[10px] xs:text-xs sm:text-sm text-gray-500 block">
                          {item.id === "home" && "Navigate to homepage"}
                          {item.id === "menu" && "Browse our delicious menu"}
                          {item.id === "order-track" && "Track your orders"}
                          {item.id === "orders" && "View your order history"}
                          {item.id === "reviews" && "Read customer reviews"}
                          {item.id === "contact" && "Get in touch with us"}
                          {item.id === "delivery" && "Delivery information"}
                        </span>
                      </div>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 xs:w-2 h-2 sm:w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-sm animate-pulse"></div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Contact Info */}
            <div className="mt-4 xs:mt-6 sm:mt-8 pt-3 xs:pt-4 sm:pt-6 border-t border-gray-800/30 space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 px-3 xs:px-4 sm:px-5 text-gray-400 text-[10px] xs:text-xs sm:text-sm bg-white/5 py-1.5 xs:py-2 sm:py-3 rounded-xl">
                <Clock className="w-3 h-3 xs:w-4 h-4 sm:w-5 h-5 text-amber-400" />
                <span className="font-medium">Mon-Sun: 11AM - 11PM</span>
              </div>
              <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 px-3 xs:px-4 sm:px-5 text-gray-400 text-[10px] xs:text-xs sm:text-sm bg-white/5 py-1.5 xs:py-2 sm:py-3 rounded-xl">
                <MapPin className="w-3 h-3 xs:w-4 h-4 sm:w-5 h-5 text-amber-400" />
                <span className="font-medium">123 Gourmet Street</span>
              </div>

              {/* Mobile Auth Section */}
              {isLoggedIn ? (
                <div className="mt-3 xs:mt-4 sm:mt-6 pt-3 xs:pt-4 sm:pt-6 border-t border-gray-800/30">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center space-x-2 xs:space-x-3 sm:space-x-4 px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-200"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      alt="User Avatar"
                      className="w-9 h-9 xs:w-10 h-10 sm:w-12 h-12 rounded-xl object-cover border-2 border-amber-400 shadow-sm"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm xs:text-base sm:text-lg">
                        John Doe
                      </p>
                      <p className="text-gray-400 text-[10px] xs:text-xs sm:text-sm">
                        john@example.com
                      </p>
                    </div>
                  </button>
                  <div className="mt-2 xs:mt-3 sm:mt-4 space-y-1 xs:space-y-2 sm:space-y-3">
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center space-x-2 xs:space-x-3 sm:space-x-4 px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      <User className="w-3.5 h-3.5 xs:w-4 h-4 sm:w-5 h-5" />
                      <span className="font-medium text-xs xs:text-sm sm:text-base">
                        My Profile
                      </span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 xs:space-x-3 sm:space-x-4 px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                    >
                      <LogOut className="w-3.5 h-3.5 xs:w-4 h-4 sm:w-5 h-5" />
                      <span className="font-medium text-xs xs:text-sm sm:text-base">
                        Log Out
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/restaurant/login"
                  className="w-full mt-3 xs:mt-4 sm:mt-6 px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold text-xs xs:text-sm sm:text-base rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400/50 flex items-center justify-center space-x-1.5 xs:space-x-2 sm:space-x-3"
                >
                  <LogOut className="w-3.5 h-3.5 xs:w-4 h-4 sm:w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      </nav>

      {/* Custom Styles (moved from style jsx to inline CSS for simplicity) */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Ensure touch targets are at least 44px */
        button,
        a {
          min-height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default RestaurantNavbar;
