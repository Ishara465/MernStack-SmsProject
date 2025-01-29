import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavigationBar = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Student Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left-aligned links */}
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Managements" id="nav-dropdown">
              <NavDropdown.Item href="/student">Student Management</NavDropdown.Item>
              <NavDropdown.Item href="/tutor">Tutor Management</NavDropdown.Item>
              <NavDropdown.Item href="/classMng">Class Management</NavDropdown.Item>       
            </NavDropdown>

            <NavDropdown title="Others" id="nav-dropdown">
              <NavDropdown.Item href="/attendanceMg">Student Attendance</NavDropdown.Item>
              <NavDropdown.Item href="/eventMng">Event And Announcement</NavDropdown.Item>
              <NavDropdown.Item href="/classFee">Class Fee</NavDropdown.Item>            
            </NavDropdown>
          </Nav>

          {/* Right-aligned LogOut button */}
          <Nav className="ms-auto">
            <Nav.Link href="/login" style={{fontWeight:"bold",color:"white", fontSize:"20px"}}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default NavigationBar;
