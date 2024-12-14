import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home/Home";
import StudentManagment from "./components/StudentManagment/student";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Tutor from "./components/Tutor/Tutor";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* NavigationBar should be outside Routes */}
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<StudentManagment />} />
          <Route path="/tutor" element={<Tutor/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
