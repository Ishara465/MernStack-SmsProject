import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Footer = () => {
  return (
    <footer className="bg-dark text-center py-3">
    <div className="container">
      {/* Navigation Links */}
      <ul className="nav justify-content-center mb-3">
        <li className="nav-item">
          <a className="nav-link text-light" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">
            About
          </a>
        </li>
      </ul>
      {/* Copyright Text */}
      <p className="text-light mb-0">&copy; 2022 Company, Inc</p>
    </div>
  </footer>
  );
};

export default Footer;
