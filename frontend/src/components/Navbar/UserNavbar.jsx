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
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount] = useState(3);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

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
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setActiveDropdown(null);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    closeAllDropdowns();
    navigate(path);
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
    {
      name: "Food Stories",
      icon: BookOpen,
      description: "Behind the scenes",
      path: "/user-restaurant",
    },
    {
      name: "Recipes",
      icon: Utensils,
      description: "Try at home",
      path: "/user-restaurant",
    },
    {
      name: "News & Updates",
      icon: FileText,
      description: "Latest announcements",
      path: "/user-restaurant",
    },
    {
      name: "Chef Interviews",
      icon: User,
      description: "Meet our team",
      path: "/user-restaurant",
    },
  ];

  const pageItems = [
    {
      name: "Locations",
      icon: MapPin,
      description: "Find us near you",
      path: "/user-restaurant",
    },
    {
      name: "FAQ",
      icon: FileText,
      description: "Get your questions answered",
      path: "/user-restaurant",
    },
  ];

  const profileMenuItems = [
    { name: "My Profile", icon: User, path: "/profile" },
    { name: "My Orders", icon: ShoppingBag, path: "/profile/orders" },
    { name: "Notification", icon: Bell, path: "/notification" },
    { name: "Settings", icon: Settings, path: "/profile/settings" },
    { name: "Logout", icon: LogOut, path: "/profile/logout" },
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
          <div
            key={index}
            onClick={() => handleNavigation(item.path)}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-200 cursor-pointer"
          >
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl hover:scale-110 transition-transform duration-200">
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-gray-800 hover:text-orange-600 transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MobileDropdownItem = ({ item }) => (
    <div
      onClick={() => handleNavigation(item.path)}
      className="w-full flex items-center gap-3 p-3 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
    >
      <item.icon className="w-4 h-4 text-gray-500" />
      <span className="text-sm">{item.name}</span>
    </div>
  );

  const MobileMenuItem = ({ icon: Icon, text, path }) => (
    <div
      onClick={() => handleNavigation(path)}
      className="w-full flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer"
    >
      <Icon className="w-5 h-5 text-orange-600" />
      <span className="font-medium">{text}</span>
    </div>
  );

  const MobileMenu = () => (
    <div
      className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`absolute right-0 top-0 h-full w-80 max-w-[80vw] sm:max-w-[60vw] bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto`}
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
          <MobileMenuItem icon={Home} text="Home" path="/" />
          <MobileMenuItem icon={Info} text="About Us" path="/about" />

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
                  <MobileDropdownItem key={index} item={item} />
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
                  <MobileDropdownItem key={index} item={item} />
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
                  <MobileDropdownItem key={index} item={item} />
                ))}
              </div>
            )}
          </div>

          <MobileMenuItem icon={Phone} text="Contact" path="/contact" />
          <MobileMenuItem icon={ShoppingCart} text="My Cart" path="/cart" />

          <div className="space-y-1">
            <button
              onClick={() => toggleDropdown("mobile-profile")}
              className="w-full flex items-center justify-between p-4 hover:bg-orange-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Profile</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === "mobile-profile" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "mobile-profile" && (
              <div className="ml-6 space-y-1">
                {profileMenuItems.map((item, index) => (
                  <MobileDropdownItem key={index} item={item} />
                ))}
              </div>
            )}
          </div>

          <div
            onClick={() => handleNavigation("/login")}
            className="w-full flex items-center gap-3 p-4 mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl transition-colors shadow-md hover:from-orange-600 hover:to-orange-700 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Login / Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 transition-all duration-300 ease-in-out font-sans">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            onClick={() => handleNavigation("/")}
            className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              FOOD TRUCK
            </span>
          </div>

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
              to="/contact"
              onClick={closeAllDropdowns}
              className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/cart"
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
                    <Link
                      to="/profile"
                      onClick={closeAllDropdowns}
                      className="block p-4 border-b border-gray-100 hover:bg-orange-50 transition-colors duration-200"
                    >
                      <h4 className="font-semibold text-gray-800">John Doe</h4>
                      <p className="text-sm text-gray-500">
                        john.doe@example.com
                      </p>
                    </Link>
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
              to="/login"
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
            >
              Login
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <div
              onClick={() => handleNavigation("/cart")}
              className="relative p-2 mr-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors duration-200 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
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

      <MobileMenu />
    </nav>
  );
};

export default UserNavbar;
