import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import CartSummary from "./CartSummary";
import {Link} from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <Navbar
        className="rounded mb-4 bg-dark text-info mt-1"
        alt="100x100"
        light
        expand="md"
      >
        <Link to="/">
          <NavbarBrand className="text-white">Northwind</NavbarBrand>
        </Link>
        <NavbarToggler />
        <Collapse className="d-flex justify-content-end" navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                className="text-white"
                href="https://github.com/tayfunuludogan"
                target="_blank"
              >
                GitHub
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink>
                <Link to="/addProduct" style={{textDecoration:'none',color:'white'}}>New Product</Link>
              </NavLink>
            </NavItem>

            <NavItem >
              <NavLink><Link style={{textDecoration:'none',color:'white'}} to="/">Shop</Link></NavLink>
            </NavItem>
            
            <CartSummary
              cart={this.props.cart}
              removeFromCart={this.props.removeFromCart}
              clearCart={this.props.clearCart}
            ></CartSummary>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
