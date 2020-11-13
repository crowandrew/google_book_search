import React from "react";
import { Navbar, Nav } from "react-bootstrap";


export default function NavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>React - Google Book Search</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Save Book List</Nav.Link>
          <Nav.Link href="/search">Search</Nav.Link>
        </Nav>
        {props.children}
      </Navbar.Collapse>
    </Navbar>
  );
}
