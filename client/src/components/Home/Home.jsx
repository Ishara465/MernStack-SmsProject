import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header text-center py-5">
        <h1 className="display-4 text-white">Welcome to Student Management System</h1>
        <p className="lead text-white">
          Manage student information, track performance, and simplify administrative tasks.
        </p>
        <Link to="/student" className="btn btn-primary btn-lg mt-3">Start Managing Students</Link>
      </header>

      {/* Features Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Our Features</h2>
        <div className="row">
          {/* Feature 1 */}
          <div className="col-md-4">
            <div className="card shadow-lg mb-4">
              <img
                src="/images/card/2.jpg"
                className="card-img-top"
                alt="Enrollment"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Student Enrollment</h5>
                <p className="card-text">
                  Easily enroll new students, track their progress, and manage their records.
                </p>
                <Link to="/student" className="btn btn-info">Learn More</Link>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="col-md-4">
            <div className="card shadow-lg mb-4">
              <img
                src="/images/card/3.jpg"
                className="card-img-top"
                alt="Course Management"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Course Management</h5>
                <p className="card-text">
                  Organize courses, assign teachers, and manage course materials with ease.
                </p>
                <Link to="/student" className="btn btn-info">Learn More</Link>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="col-md-4">
            <div className="card shadow-lg mb-4">
              <img
                src="/images/card/1.jpg"
                className="card-img-top"
                alt="Performance Tracking"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Student Performance</h5>
                <p className="card-text">
                  Track student progress and performance with detailed reports and analytics.
                </p>
                <Link to="/student" className="btn btn-info">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Home;
