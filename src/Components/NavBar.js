import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <Navbar className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/records/bp">
          Fitness Records
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/records/bp">
              Bench Press Records
            </Nav.Link>
            <Nav.Link as={NavLink} to="/records/cardio">
              Cardio Records
            </Nav.Link>
            <Nav.Link as={NavLink} to="/records/squat">
              Squat Records
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
