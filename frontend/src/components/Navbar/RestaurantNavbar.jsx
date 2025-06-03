import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  ChefHat,
  Utensils,
  Heart,
  Star,
  Home,
  User,
  LogIn,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const RestaurantNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);

  // Mock user data - replace with real authentication
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "menu", label: "Menu", icon: Utensils },
    { id: "about", label: "About", icon: Heart },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "contact", label: "Contact", icon: Phone },
  ];

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
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    setShowProfileDropdown(false);

    // Smooth scroll to section (if element exists)
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogin = () => {
    // Mock login - replace with real authentication
    setIsLoggedIn(true);
    setUser(mockUser);
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileDropdown(false);
    setActiveSection("home");
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
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
      {/* Top Info Bar - Hidden on mobile */}
      <div className="hidden lg:block bg-gradient-to-r from-amber-600 to-orange-500 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Open: Mon-Sun 11AM - 11PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>123 Gourmet Street, Foodie District</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>+1 (555) 123-FOOD</span>
          </div>
        </div>
      </div>
      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl shadow-2xl border-b border-amber-500/20"
            : "bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-lg"
        }`}
        style={{
          animation: "slideDown 0.6s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center space-x-3 group focus:outline-none"
            >
              <div className="relative transform group-hover:scale-110 transition-all duration-300">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <ChefHat className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Bella Vista
                </h1>
                <p className="text-xs text-gray-400 -mt-1">
                  Fine Dining Experience
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group focus:outline-none ${
                        isActive
                          ? "text-amber-400 bg-amber-500/10"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                          style={{
                            animation: "slideIndicator 0.3s ease-out",
                          }}
                        />
                      )}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Auth Section - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative profile-dropdown">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-amber-400"
                    />
                    <span className="text-white font-medium">{user?.name}</span>
                    <div
                      className={`transform transition-transform duration-200 ${
                        showProfileDropdown ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-4 h-4 text-gray-300"
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
                    <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 backdrop-blur-xl border border-amber-500/20 rounded-xl shadow-2xl py-2">
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-white font-medium">{user?.name}</p>
                        <p className="text-gray-400 text-sm">{user?.email}</p>
                      </div>
                      <Link
                        to="/restaurant/profile"
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <hr className="border-gray-700 my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile Auth Button */}
              {isLoggedIn ? (
                <button
                  onClick={toggleProfileDropdown}
                  className="profile-dropdown relative focus:outline-none"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-amber-400"
                  />
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-xl border border-amber-500/20 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-white font-medium text-sm">
                          {user?.name}
                        </p>
                        <p className="text-gray-400 text-xs">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => handleNavClick("profile")}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">Profile</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </div>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <LogIn className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => handleNavClick("contact")}
                className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Toggle menu"
              >
                <div
                  className="transform transition-transform duration-300"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-amber-500/20 transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                        isActive
                          ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full"></div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-800 space-y-3">
              <div className="flex items-center space-x-3 px-4 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>Mon-Sun: 11AM - 11PM</span>
              </div>
              <div className="flex items-center space-x-3 px-4 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Gourmet Street</span>
              </div>

              {/* Mobile Auth Section */}
              {isLoggedIn ? (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-xl">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
                    />
                    <div>
                      <p className="text-white font-medium">{user?.name}</p>
                      <p className="text-gray-400 text-sm">{user?.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => handleNavClick("profile")}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      </nav>
      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideIndicator {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 1.5rem;
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default RestaurantNavbar;
