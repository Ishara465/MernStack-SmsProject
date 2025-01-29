import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import StudentManagment from "./components/StudentManagment/student";
import Tutor from "./components/Tutor/Tutor";
import ClassManagement from "./components/ClassManagement/ClassManagement";
import EventManagement from "./components/EventManagement/EventManagement";
import ClassFee from "./components/ClassFee/ClassFee";
import AttedanceManagement from "./components/AttendanceManagement/AttedanceManagement";
import Register from "./components/Register&Login/Register";
import Login from "./components/Register&Login/Login";

function App() {
  const location = useLocation(); // Get current path
  const hideNavAndFooter = location.pathname === "/" || location.pathname === "/login";

  return (
    <div>
      {!hideNavAndFooter && <NavigationBar />} {/* Hide Navbar on Register & Login */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<StudentManagment />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/classMng" element={<ClassManagement />} />
        <Route path="/eventMng" element={<EventManagement />} />
        <Route path="/classFee" element={<ClassFee />} />
        <Route path="/attendanceMg" element={<AttedanceManagement />} />
      </Routes>
      {!hideNavAndFooter && <Footer />} {/* Hide Footer on Register & Login */}
    </div>
  );
}

// Wrap App with BrowserRouter in index.js
export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
