import React, { useState, useEffect } from "react";
import {
  ChefHat,
  Star,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  Play,
  Utensils,
  Award,
  Users,
} from "lucide-react";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";

const RestaurantHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "Exquisite Culinary Experience",
      subtitle: "Where flavors meet perfection in every dish",
      description:
        "Indulge in our chef's masterpieces crafted with the finest ingredients and passion for excellence",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "Reserve Your Table",
      accent: "New Menu Available",
    },
    {
      id: 2,
      title: "Authentic Italian Cuisine",
      subtitle: "Traditional recipes passed down through generations",
      description:
        "Experience the authentic taste of Italy with our hand-made pasta and wood-fired pizzas",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "View Menu",
      accent: "Chef's Special",
    },
    {
      id: 3,
      title: "Romantic Fine Dining",
      subtitle: "Perfect ambiance for memorable moments",
      description:
        "Create unforgettable memories in our elegant dining space with exceptional service",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "Book Now",
      accent: "Wine Pairing Available",
    },
  ];

  const stats = [
    { icon: Award, value: "15+", label: "Awards Won" },
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Utensils, value: "200+", label: "Signature Dishes" },
    { icon: Star, value: "4.9", label: "Rating" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <>
      <RestaurantNavbar />
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
            style={{
              backgroundImage: `url(${currentHero.image})`,
              filter: "brightness(0.4)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 opacity-20">
          <ChefHat className="w-32 h-32 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute bottom-40 left-10 opacity-10">
          <Utensils className="w-24 h-24 text-orange-400 animate-bounce" />
        </div>
        {/* Main Content */}
        <div className="relative h-screen flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white space-y-8">
                {/* Accent Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-semibold animate-pulse">
                  <Star className="w-4 h-4 mr-2" />
                  {currentHero.accent}
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                      {currentHero.title.split(" ")[0]}
                    </span>
                    <br />
                    <span className="text-white">
                      {currentHero.title.split(" ").slice(1).join(" ")}
                    </span>
                  </h1>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light">
                    {currentHero.subtitle}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl">
                  {currentHero.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <span className="relative z-10 flex items-center justify-center">
                      {currentHero.cta}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>

                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="group flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  >
                    <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Watch Our Story
                  </button>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>123 Gourmet Street, Raipur</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>Open Daily 11AM - 11PM</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Stats Cards */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div
                        key={index}
                        className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-6 h-6 text-black" />
                          </div>
                          <div className="text-3xl font-bold text-white">
                            {stat.value}
                          </div>
                          <div className="text-gray-300 text-sm">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="lg:hidden mt-12">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <IconComponent className="w-5 h-5 text-yellow-400" />
                        <div className="text-xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-gray-300 text-xs">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-yellow-400 w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        {/* Video Modal */}
        {isVideoPlaying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl mx-4">
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                  <p className="text-xl">Restaurant Story Video</p>
                  <p className="text-gray-400 mt-2">
                    Video content would be embedded here
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantHeroSection;
