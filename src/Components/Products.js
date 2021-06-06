import React, { Component } from "react";
import {Button, Table} from 'reactstrap'

export default class Products extends Component {

  render() {
    return (
      <Table striped borderless hover responsive size="md" className="text-center">
        <thead className="bg-dark text-white">
          <tr>
            <th>Product Name</th>
            <th>Quantity Per Unit</th>
            <th>Unit Price</th>
            <th>Units In Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.quantityPerUnit}</td>
              <td>{product.unitPrice}</td>
              <td>{product.unitsInStock}</td>
              <td><Button block onClick={()=>this.props.addToCart(product)} className="btn-info btn-sm">Add To Cart</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
