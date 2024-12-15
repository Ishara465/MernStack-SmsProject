import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavigationBar = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Student Management System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Managements" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1" href="/student">Student Management</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2" href="/tutor">Tutor Management</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2" href="/classMng">Class Management</NavDropdown.Item>       
            </NavDropdown>

            <NavDropdown title="Others" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">Student Attendance</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2" href="/eventMng">Event And Announcement</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Class Fee</NavDropdown.Item>            
            </NavDropdown>
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
