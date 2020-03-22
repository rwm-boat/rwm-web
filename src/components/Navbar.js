import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Navigation extends Component {
    
    render () {
        return (
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">RWM Web Interface</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/telemetry">Live Telemetry</Nav.Link>
                <Nav.Link href="/graphs">Graphs</Nav.Link>
                <Nav.Link href="/logs">Logging</Nav.Link>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
        
    }
}

export default Navigation