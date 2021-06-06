import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

export default class CartSummary extends Component {
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle className="text-white" nav caret>
          Cart (<span>{this.props.cart.length}</span>)
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((item, index) => (
            <Link to="/cart">
            <DropdownItem key={item.product.id}>
              {/* <Badge
                onClick={() => {
                  this.props.removeFromCart(item.product);
                }}
                className="badge-dark mr-2"
              >
                &#10005;
              </Badge> */}
              {item.product.productName}
              <Badge className="badge-success ml-2">{item.quantity}</Badge>
            </DropdownItem>
            </Link>
          ))}
          <DropdownItem divider></DropdownItem>

          {/* <Button
            color="danger"
            className="btn-block"
            onClick={() => {
              this.props.clearCart();
            }}
          >
            Clear All Cart
          </Button> */}

          <Link className="btn btn-info text-white btn-block" to="/cart">Go To Cart</Link>

        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderEmpty() {
    return (
      <NavItem>
        <NavLink className="text-white">Cart is Empty</NavLink>
      </NavItem>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}
