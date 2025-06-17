import React, { useState } from "react";
import { Play, Pizza, Truck } from "lucide-react";
import pizzaImageWithBg from "../../assets/images/pizza-with-bg (1).png";

const AboutUs = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: Pizza,
      title: "50+ Pizza Items",
      description: "We provide premium & high quality tasty pizza",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Truck,
      title: "Online Fast Delivery",
      description: "We provide 24/7 fast online delivery for all items",
      color: "from-blue-500 to-purple-500",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Main Content */}
      <div className="max-w-7xl w-full mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                About Us
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                The study is the work of researchers at Nottingham University's
                School of Medicine who focused on chemicals known as antigens.
                In particular, they cause our bodies to make auto-antibodies
                that target and try to block those invading antigens.
              </p>

              {/* Quote Box */}
              <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
                <p className="italic text-xs sm:text-sm md:text-base relative z-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  sint quam facere suscipit ea quibusdam esse vero. Repellendus!
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:from-slate-500 hover:to-slate-900 transform hover:scale-105 transition-all duration-300">
                Order Now
              </button>

              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="flex items-center justify-center sm:justify-start gap-3 bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center transition-transform duration-300 ${
                    isVideoPlaying ? "scale-110" : ""
                  }`}
                >
                  <Play className="text-white" size={12} fill="white" />
                </div>
                How to place order
              </button>
            </div>
          </div>

          {/* Right Content - Pizza Image */}
          <div className="hidden lg:flex order-1 lg:order-2 justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg">
              <div className="about-image flex justify-center lg:justify-end items-center lg:items-end">
                <img
                  src={pizzaImageWithBg}
                  alt="About Us"
                  className="w-full h-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
