import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <Navbar expand="lg" variant="light" bg="light" fixed="top" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to="/" className="text-decoration-none">
          <span style={{ color: '#5e9693' }}>Psych</span>
          <span style={{ color: '#a17249' }}>BFF</span> {/* Light brown color */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/create">Add A Disorder</Nav.Link>
            <Nav.Link as={Link} to="/intensity">Daily Log</Nav.Link>
          </Nav>
          <Nav className="d-flex flex-row">
            <Nav.Link as={Link} to="/">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default CustomNavbar;
