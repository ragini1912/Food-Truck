import React, { useState, useEffect, useRef } from "react";
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
      quote: `Luctus ipsum dolor sit amet, adipiscing elit. In luctus
molestie dui, eu rhoncus orci feugiat at. Pellentesque
fringilla diam at nisi malesuada fermentum. Morbi
elementum bibendum enim non sollicitudin morbi
elementum.`,
    },
    {
      id: 2,
      name: "Marta May",
      title: "CEO, Foxdiesel",
      rating: "5 star of 20 review",
      image: martaImage,
      quote: `Donec ipsum dolor sit amet, adipiscing elit. In luctus
molestie dui, eu rhoncus orci feugiat at. Pellentesque
fringilla diam at nisi malesuada fermentum. Morbi
elementum bibendum enim non sollicitudin morbi
elementum.`,
    },
    {
      id: 3,
      name: "John Morris",
      title: "Food Reviewer",
      rating: "5 star of 20 review",
      image: johnImage,
      quote: `Lorem ipsum dolor sit amet, adipiscing elit. In luctus
molestie dui, eu rhoncus orci feugiat at. Pellentesque
fringilla diam at nisi malesuada fermentum. Morbi
elementum bibendum enim non sollicitudin morbi
elementum.`,
    },
    {
      id: 4,
      name: "Emily Rhodes",
      title: "Blogger",
      rating: "5 star of 15 review",
      image: kellyImage,
      quote: `Luctus ipsum dolor sit amet, adipiscing elit. In luctus
molestie dui, eu rhoncus orci feugiat at. Pellentesque
fringilla diam at nisi malesuada fermentum. Morbi
elementum bibendum enim non sollicitudin morbi
elementum.`,
    },
    {
      id: 5,
      name: "David Stone",
      title: "Chef",
      rating: "5 star of 40 review",
      image: johnImage,
      quote: `Donec ipsum dolor sit amet, adipiscing elit. In luctus
molestie dui, eu rhoncus orci feugiat at. Pellentesque
fringilla diam at nisi malesuada fermentum. Morbi
elementum bibendum enim non sollicitudin morbi
elementum.`,
    },
    {
      id: 6,
      name: "Alice Ray",
      title: "Food Critic",
      rating: "5 star of 12 review",
      image: martaImage,
      quote: `Lorem ipsum dolor sit amet, adipiscing elit. In luctus
molestie dui, eu rhoncus orci feugiat at. Pellentesque
fringilla diam at nisi malesuada fermentum. Morbi
elementum bibendum enim non sollicitudin morbi
elementum.`,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);
  const isHovering = useRef(false);
  const startX = useRef(null);

  useEffect(() => {
    setCardsPerView(1);
    const handleResize = () => setCardsPerView(1);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (!isHovering.current) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(
          (prev) => (prev + 1) % Math.ceil(testimonials.length / cardsPerView)
        );
      }, 4000);
    }
    return () => resetTimeout();
  }, [currentIndex, cardsPerView, testimonials.length]);

  const handlePrev = () => {
    resetTimeout();
    setCurrentIndex((prev) =>
      prev === 0 ? Math.ceil(testimonials.length / cardsPerView) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    resetTimeout();
    setCurrentIndex(
      (prev) => (prev + 1) % Math.ceil(testimonials.length / cardsPerView)
    );
  };

  const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!startX.current) return;
    const deltaX = startX.current - e.changedTouches[0].clientX;
    if (deltaX > 50) handleNext();
    else if (deltaX < -50) handlePrev();
    startX.current = null;
  };

  return (
    <div className="testimonials-container">
      <div className="testimonials-header">
        <h1>
          Wonderful Words from Our <br />
          <span>Delighted</span> Customers
        </h1>
      </div>
      <div
        className="testimonials-slider-wrapper"
        ref={containerRef}
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="testimonials-slider-inner"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            width: `${(testimonials.length / cardsPerView) * 100}%`,
          }}
        >
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <div className="customer-info">
                <div className="customer-image">
                  <img src={t.image} alt={t.name} />
                </div>
                <div className="customer-details">
                  <h3>{t.name}</h3>
                  <p className="customer-title">{t.title}</p>
                  <p className="customer-rating">{t.rating}</p>
                </div>
              </div>
              <div className="customer-quote">
                <p>{t.quote}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-controls">
          <button onClick={handlePrev} className="nav-btn left">
            {"<"}
          </button>
          <button onClick={handleNext} className="nav-btn right">
            {">"}
          </button>
        </div>
        <div className="testimonial-dots">
          {Array.from({
            length: Math.ceil(testimonials.length / cardsPerView),
          }).map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
