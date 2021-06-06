import { Component } from "react";
import { Table, Button, Alert, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  totalSum() {
    let sum = 0;
    this.props.cart.forEach(
      (item) => (sum += Number(item.product.unitPrice) * Number(item.quantity))
    );
    return sum;
  }

  renderEmptyCart() {
    return (
      <Alert color="warning" className="text-center">
        Your Cart is Empty <Link to="/">Go To Shop</Link>
      </Alert>
    );
  }

  renderCart() {
    return (
      <Row>
        <Col xs="9">
          <Table
            striped
            borderless
            hover
            responsive
            className="text-center table-light"
          >
            <thead className="bg-info text-white">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.map((item) => (
                <tr key={item.product.id}>
                  <td>{item.product.productName}</td>
                  <td>{item.product.unitPrice}₺</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity * item.product.unitPrice}₺</td>
                  <td>
                    <Button
                      size="sm"
                      color="success"
                      onClick={() => this.props.addToCart(item.product)}
                      className="mr-2"
                    >
                      &#x2b;
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => this.props.removeFromCart(item.product)}
                    >
                      &#x2212;
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs="3">
          <Card color="light">
            <CardBody>
              <Alert color="success" className="text-center d-flex flex-column align-items-center justify-content-center">
                <span>Total Sum:</span>
                <strong style={{ fontSize: "2rem" }}>{this.totalSum()}₺</strong>
              </Alert>
              <Button
                color="danger"
                block
                onClick={() => this.props.clearCart()}
              >
                Clear Cart
              </Button>
              <Button color="success" block>
                Finish Shopping
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderCart()
          : this.renderEmptyCart()}
      </div>
    );
  }
}
