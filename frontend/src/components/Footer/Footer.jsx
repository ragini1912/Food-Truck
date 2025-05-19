import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container" style={{ backgroundColor: "#E5B979" }}>
      <div className="footer-content">
        {/* Newsletter Section */}
        <div className="newsletter-section">
          <p className="newsletter-text">
            Fusce fells semper sed tristique etm velit nes vitae tempor. Aliquam
            suscipit male ksuada viverra etiam facilis vitae magnis.
          </p>
          <div className="subscribe-form">
            <input
              type="email"
              placeholder="Subscribe to email"
              className="email-input"
            />
            <button className="signup-btn">SIGNUP</button>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="quick-links">
          <h3 className="section-title">Quick Links</h3>
          <ul className="links-list">
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/catering">CATERING</a>
            </li>
            <li>
              <a href="/find-truck">FIND A TRUCK</a>
            </li>
            <li>
              <a href="/news">LATEST NEWS</a>
            </li>
            <li>
              <a href="/contact">CONTACT</a>
            </li>
            <li>
              <a href="/trucks">FIND TRUCKS</a>
            </li>
            <li>
              <a href="/schedule">SCHEDULE</a>
            </li>
            <li>
              <a href="/book-catering">BOOK CATERING</a>
            </li>
            <li>
              <a href="/vendors">TRUCK VENDORS</a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h3 className="section-title">Get in Touch</h3>
          <div className="contact-image">
            <div className="contact-info">
              <p className="contact-text">For booking & Quote</p>
              <p className="contact-phone">+1 (234) 005 9876</p>
            </div>
          </div>
          <p className="contact-email">food-truck@mydomain.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="scrolling-background"></div>
      </div>
    </footer>
  );
};

export default Footer;