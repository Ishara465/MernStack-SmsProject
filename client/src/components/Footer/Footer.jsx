import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Footer Column 1 */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a dedicated team providing excellent service and user experience.
              Stay connected with us for updates and offers.
            </p>
          </div>

          {/* Footer Column 2 */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/services" className="text-white">Services</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>

          {/* Footer Column 3 */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex">
              <a href="https://facebook.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook" style={{ fontSize: '24px' }}></i>
              </a>
              <a href="https://twitter.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter" style={{ fontSize: '24px' }}></i>
              </a>
              <a href="https://instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram" style={{ fontSize: '24px' }}></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
