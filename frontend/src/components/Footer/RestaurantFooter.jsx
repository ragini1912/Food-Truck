import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Heart,
  Star,
  ChefHat,
  Utensils,
} from "lucide-react";

const RestaurantFooter = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [newsletter, setNewsletter] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletter.trim()) {
      setIsSubscribed(true);
      setNewsletter("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Facebook, label: "Facebook", color: "hover:text-blue-400" },
    { icon: Instagram, label: "Instagram", color: "hover:text-pink-400" },
    { icon: Twitter, label: "Twitter", color: "hover:text-blue-300" },
    { icon: Youtube, label: "YouTube", color: "hover:text-red-400" },
  ];

  const quickLinks = [
    "About Us",
    "Menu",
    "Reservations",
    "Private Events",
    "Catering",
    "Gift Cards",
    "Careers",
    "Reviews",
  ];

  const menuCategories = [
    "Appetizers",
    "Main Course",
    "Desserts",
    "Beverages",
    "Chef Specials",
    "Seasonal Menu",
    "Wine List",
    "Cocktails",
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-amber-400 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-orange-500 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-red-500 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <ChefHat className="w-8 h-8" />
                Stay Updated with Our Latest
              </h3>
              <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
                Subscribe to receive exclusive recipes, special offers, and
                updates about our newest dishes
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="max-w-md mx-auto flex gap-2"
              >
                <input
                  type="email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <p className="mt-4 text-amber-100 animate-pulse">
                  ✨ Thank you for subscribing! Welcome to our culinary family!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Restaurant Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Bella Vista
                  </h2>
                  <p className="text-slate-400">Fine Dining Experience</p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Experience culinary excellence in an atmosphere of elegance and
                warmth. Our chef-crafted dishes celebrate both tradition and
                innovation.
              </p>

              <div className="flex items-center gap-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-slate-300">4.9/5 Rating</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    setActiveSection(
                      activeSection === "address" ? null : "address"
                    )
                  }
                >
                  <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300">123 Gourmet Street</p>
                    <p className="text-slate-300">
                      Downtown District, City 12345
                    </p>
                    {activeSection === "address" && (
                      <p className="text-amber-400 text-sm mt-2 animate-pulse">
                        Click for directions →
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    setActiveSection(activeSection === "phone" ? null : "phone")
                  }
                >
                  <Phone className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-slate-300">+1 (555) 123-4567</p>
                    {activeSection === "phone" && (
                      <p className="text-amber-400 text-sm mt-1 animate-pulse">
                        Tap to call →
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    setActiveSection(activeSection === "email" ? null : "email")
                  }
                >
                  <Mail className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-slate-300">hello@bellavista.com</p>
                    {activeSection === "email" && (
                      <p className="text-amber-400 text-sm mt-1 animate-pulse">
                        Send us an email →
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg">
                  <Clock className="w-5 h-5 text-amber-400 mt-1" />
                  <div className="text-slate-300">
                    <p className="font-medium">Operating Hours</p>
                    <div className="text-sm space-y-1 mt-2">
                      <p>Mon-Thu: 5:00 PM - 10:00 PM</p>
                      <p>Fri-Sat: 5:00 PM - 11:00 PM</p>
                      <p>Sunday: 4:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setActiveSection(activeSection === link ? null : link)
                    }
                    className={`text-left p-2 rounded-lg transition-all duration-300 ${
                      activeSection === link
                        ? "bg-amber-500/20 text-amber-400 transform scale-105"
                        : "text-slate-300 hover:text-amber-400 hover:bg-slate-800/50"
                    }`}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Categories */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">
                Our Menu
              </h3>
              <div className="space-y-2">
                {menuCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setActiveSection(
                        activeSection === category ? null : category
                      )
                    }
                    className={`w-full text-left p-2 rounded-lg transition-all duration-300 ${
                      activeSection === category
                        ? "bg-orange-500/20 text-orange-400 transform translate-x-2"
                        : "text-slate-300 hover:text-orange-400 hover:bg-slate-800/50 hover:translate-x-1"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Social Media Links */}
              <div className="flex items-center gap-6">
                <span className="text-slate-400 font-medium">Follow Us:</span>
                <div className="flex gap-4">
                  {socialLinks.map(({ icon: Icon, label, color }, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setActiveSection(activeSection === label ? null : label)
                      }
                      className={`w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${color} ${
                        activeSection === label
                          ? "ring-2 ring-amber-400 scale-110"
                          : ""
                      }`}
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center lg:text-right">
                <p className="text-slate-400 text-sm flex items-center gap-2 justify-center lg:justify-end">
                  Made with{" "}
                  <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                  © 2025 Bella Vista Restaurant. All rights reserved.
                </p>
                <div className="flex gap-4 mt-2 text-xs text-slate-500 justify-center lg:justify-end">
                  <button className="hover:text-amber-400 transition-colors">
                    Privacy Policy
                  </button>
                  <span>•</span>
                  <button className="hover:text-amber-400 transition-colors">
                    Terms of Service
                  </button>
                  <span>•</span>
                  <button className="hover:text-amber-400 transition-colors">
                    Accessibility
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-110 z-20"
        >
          <ChefHat className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default RestaurantFooter;
