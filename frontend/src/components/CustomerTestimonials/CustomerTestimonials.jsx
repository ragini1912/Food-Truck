import React, { useEffect, useRef, useState } from "react";
import "./CustomerTestimonials.css";
import kellyImage from "../../assets/images/review-1.png";
import martaImage from "../../assets/images/review-2.png";
import johnImage from "../../assets/images/review-3.png";

const CustomerTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Kelly Mitter",
      title: "Cake Designer",
      rating: "5 star of 20 review",
      image: kellyImage,
      quote:
        "Luctus ipsum dolor sit amet, adipiscing elit. In luctus molestie dui, eu rhoncus orci feugiat at. Pellentesque fringilla diam at nisi malesuada fermentum.",
    },
    {
      id: 2,
      name: "Marta May",
      title: "CEO, Foxdiesel",
      rating: "5 star of 20 review",
      image: martaImage,
      quote:
        "Donec ipsum dolor sit amet, adipiscing elit. In luctus molestie dui, eu rhoncus orci feugiat at. Pellentesque fringilla diam at nisi malesuada fermentum.",
    },
    {
      id: 3,
      name: "John Morris",
      title: "Food Reviewer",
      rating: "5 star of 20 review",
      image: johnImage,
      quote:
        "Lorem ipsum dolor sit amet, adipiscing elit. In luctus molestie dui, eu rhoncus orci feugiat at. Pellentesque fringilla diam at nisi malesuada fermentum.",
    },
    {
      id: 4,
      name: "Kelly Mitter",
      title: "Cake Designer",
      rating: "5 star of 20 review",
      image: kellyImage,
      quote:
        "Luctus ipsum dolor sit amet, adipiscing elit. In luctus molestie dui, eu rhoncus orci feugiat at. Pellentesque fringilla diam at nisi malesuada fermentum.",
    },
    {
      id: 5,
      name: "Marta May",
      title: "CEO, Foxdiesel",
      rating: "5 star of 20 review",
      image: martaImage,
      quote:
        "Donec ipsum dolor sit amet, adipiscing elit. In luctus molestie dui, eu rhoncus orci feugiat at. Pellentesque fringilla diam at nisi malesuada fermentum.",
    },
    {
      id: 6,
      name: "John Morris",
      title: "Food Reviewer",
      rating: "5 star of 20 review",
      image: johnImage,
      quote:
        "Lorem ipsum dolor sit amet, adipiscing elit. In luctus molestie dui, eu rhoncus orci feugiat at. Pellentesque fringilla diam at nisi malesuada fermentum.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prev) => (prev + 1) % testimonials.length),
      3000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, testimonials.length]);

  const handlePrev = () => {
    resetTimeout();
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    resetTimeout();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="testimonials-container">
      <div className="testimonials-header">
        <h1>
          Wonderful Words from Our <br />
          <span>Delighted</span> Customers
        </h1>
      </div>

      <div className="testimonials-wrapper">
        <div className="testimonials-slider">
          <div
            className="testimonials-slider-inner"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div className="testimonial-slide" key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="customer-info">
                    <div className="customer-image">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="customer-details">
                      <h3>{testimonial.name}</h3>
                      <p className="customer-title">{testimonial.title}</p>
                      <p className="customer-rating">{testimonial.rating}</p>
                    </div>
                  </div>
                  <div className="customer-quote">
                    <p>{testimonial.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonial-controls">
          <button onClick={handlePrev} className="nav-btn">
            {"<"}
          </button>
          <button onClick={handleNext} className="nav-btn">
            {">"}
          </button>
        </div>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CustomerTestimonials;
