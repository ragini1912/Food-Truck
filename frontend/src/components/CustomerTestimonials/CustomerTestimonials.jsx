import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const CustomerTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Maria May",
      role: "CEO, Foodcred",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 20,
      content:
        "Donec ipsum dolor sit amet, adipiscing elit. In luctus molestie dui, eu rhoncus orci feugiat at. Pellentesque fringilla diam at nisl malesuada fermentum. Morbi elementum bibendum enim non sollicitudin morbi elementum.",
      bgGradient: "from-amber-300 to-orange-400",
    },
    {
      id: 2,
      name: "John Morris",
      role: "Food Reviewer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 20,
      content:
        "Lorem ipsum dolor sit amet, adipiscing elit. In luctus molestie dui, eu rhoncus orci feugiat at. Pellentesque fringilla diam at nisl malesuada fermentum. Morbi elementum bibendum enim non sollicitudin morbi elementum.",
      bgGradient: "from-pink-300 to-rose-400",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Marketing Director",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 25,
      content:
        "Exceptional service and outstanding results! The team's dedication to excellence is evident in every interaction. They've transformed our business approach completely.",
      bgGradient: "from-purple-300 to-indigo-400",
    },
    {
      id: 4,
      name: "David Chen",
      role: "Product Manager",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 18,
      content:
        "Innovative solutions that deliver real value. Their expertise and professionalism have been instrumental in achieving our project goals ahead of schedule.",
      bgGradient: "from-emerald-300 to-teal-400",
    },
    {
      id: 5,
      name: "Emily Rodriguez",
      role: "Creative Director",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 30,
      content:
        "Creative excellence meets technical precision. The collaboration has been seamless, and the results speak for themselves. Highly recommended!",
      bgGradient: "from-cyan-300 to-blue-400",
    },
    {
      id: 6,
      name: "Michael Thompson",
      role: "Tech Entrepreneur",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 35,
      content:
        "Outstanding experience from start to finish. The attention to detail and customer service exceeded all expectations. This is how business should be done!",
      bgGradient: "from-slate-300 to-gray-400",
    },
    {
      id: 7,
      name: "Lisa Wang",
      role: "UX Designer",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 22,
      content:
        "Incredible value and quality! The team understood our vision perfectly and delivered beyond what we imagined. Absolutely recommend to anyone looking for excellence.",
      bgGradient: "from-lime-300 to-green-400",
    },
    {
      id: 8,
      name: "James Wilson",
      role: "Business Analyst",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 28,
      content:
        "Professional, reliable, and innovative. They transformed our business processes and helped us achieve goals we didn't think were possible. Top-tier service!",
      bgGradient: "from-red-300 to-pink-400",
    },
    {
      id: 9,
      name: "Anna Martinez",
      role: "Operations Manager",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 31,
      content:
        "Exceptional quality and service! Every interaction was smooth and professional. They truly care about their clients' success and it shows in everything they do.",
      bgGradient: "from-yellow-300 to-amber-400",
    },
    {
      id: 10,
      name: "Robert Kim",
      role: "Software Engineer",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      totalReviews: 19,
      content:
        "Technical excellence combined with outstanding customer service. The solution they provided was exactly what we needed and more. Highly professional team!",
      bgGradient: "from-violet-300 to-purple-400",
    },
  ];

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover why thousands of customers trust us with their success
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={prevTestimonial}
          disabled={isAnimating}
          className="group relative overflow-hidden bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </button>

        <button
          onClick={nextTestimonial}
          disabled={isAnimating}
          className="group relative overflow-hidden bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </button>
      </div>

      {/* Testimonials Container */}
      <div className="relative">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-300 ${
            isAnimating
              ? "opacity-0 transform scale-95"
              : "opacity-100 transform scale-100"
          }`}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${currentIndex}-${index}`}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${testimonial.bgGradient} p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12" />
              </div>

              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-12 h-12 text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* User Info */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-white/90 text-sm font-medium">
                      {testimonial.role}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-300 text-yellow-300"
                        />
                      ))}
                    </div>
                    <span className="text-white/80 text-xs">
                      {testimonial.rating} star of {testimonial.totalReviews}{" "}
                      review
                    </span>
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="relative">
                  <p className="text-white/95 text-lg leading-relaxed font-medium">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                {/* Decorative Element */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-white/30 rounded-full"
                      />
                    ))}
                  </div>
                  <div className="text-white/60 text-sm">Verified Customer</div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-3 mt-12">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? "w-8 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full"
            }`}
          >
            {index === currentIndex && (
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-8 max-w-xs mx-auto">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>
            {currentIndex + 1} of {testimonials.length}
          </span>
          <span>Customer Stories</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
