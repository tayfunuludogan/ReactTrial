import { Container, Row, Col,Button } from "reactstrap";
import CategoryList from "./Components/CategoryList";
import Navigation from "./Components/Navigation";
import Products from "./Components/Products";
import React, { Component, Fragment } from "react";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import Cart from "./Components/Cart";
import NotFound from "./Components/NotFound";
import AddProduct from "./Components/AddProduct";

export default class App extends Component {
  state = {
    currentCategory: {},
    products: [],
    cart: [],
    categories: []

  };

  componentDidMount() {
    this.getCategories();
    this.getProducts();
  }

  getCategories = async () => {
    var response = await fetch("http://localhost:3000/categories");
    var responseBody = await response.json();
    this.setState({ categories: responseBody });
  }; 

  changeCategory = async (category) => {
    if (category) {
      await this.setState({ currentCategory: category });
    } else {
      await this.setState({ currentCategory: {} });
    }
    this.getProducts();
  };

  getProducts = async () => {
    let endpoint = "http://localhost:3000/products";
    if (this.state.currentCategory.id != null) {
      endpoint += `?categoryId=${this.state.currentCategory.id}`;
    }

    if (this.state.currentCategory === Object) {
      alertify.notify("The product has been added to cart.", "success", 2);
    }
    var response = await fetch(endpoint);
    var responseBody = await response.json();
    this.setState({ products: responseBody });
  };

  getLastProductId= async()=>{
    await this.getProducts();
    let newArray = this.state.products.sort((a, b) => (a.id > b.id) ? 1 : -1)
    let newId = newArray[newArray.length-1].id + 1;
    return newId;
  }

  addProduct = async (product) => {
    let endpoint = "http://localhost:3000/products";
    var response = await fetch(endpoint, { method: "POST" ,headers:{'Content-type':'application/json'},body:JSON.stringify(product)});
    return response.status;
  };


  addToCart = (product) => {
    let newCart = this.state.cart;
    let addedItem = newCart.find((x) => x.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success("The product has been added to cart.", 1);
    // alertify.notify("The product has been added to cart.","success",2)
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart;
    let removedItem = newCart.find((x) => x.product.id === product.id);
    if (removedItem.quantity > 1) {
      removedItem.quantity -= 1;
    } else {
      newCart = newCart.filter((x) => x.product.id !== product.id);
    }
    alertify.error("The product has been deleted from cart.", 1);
    this.setState({ cart: newCart });
  };

  clearCart = () => {
    alertify.confirm(
      "Warning",
      "Are you sure you want to clear the cart?",
      () => {
        this.setState({ cart: [] });
      },
      () => {
        alertify.error("Canceled");
      }
    );
  };

  render() {
    return (
      <Container>
        <Navigation
          cart={this.state.cart}
          removeFromCart={this.removeFromCart}
          clearCart={this.clearCart}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <Row>
                  <Col xs="3">
                    <CategoryList
                      {...props}
                      categories={this.state.categories}
                      currentCategory={this.state.currentCategory}
                      changeCategory={this.changeCategory}
                    />
                  </Col>
                  <Col xs="9">
                    <Products
                      {...props}
                      products={this.state.products}
                      addToCart={this.addToCart}
                    />
                  </Col>
                </Row>
              </Fragment>
            )}
          ></Route>
          <Route
            path="/cart"
            render={(props) => (
              <Cart
                {...props}
                cart={this.state.cart}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
                clearCart={this.clearCart}
              />
            )}
          ></Route>
          <Route path="/addProduct" render={(props)=>(

            <AddProduct
            {...props}
            categories={this.state.categories}
            addProduct = {this.addProduct}
            newProductId = {this.getLastProductId}
            />
          )}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Container>
    );
  }
}
