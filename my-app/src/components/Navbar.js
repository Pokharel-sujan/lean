import React, {Component} from 'react';
import { Navbar, Brand, Link, Nav } from 'react-bootstrap';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <Navbar className='nav-bar'>
        <NavLink exact to="/" className="lean-title" >Lean 5S</NavLink>
        <Nav className="mr-auto">
          <Nav.Link className="nav-link" href="">{this.props.name}</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;