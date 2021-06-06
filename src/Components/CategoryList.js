import React, { Component } from "react";
import { Button, ButtonGroup, ListGroup, ListGroupItem } from "reactstrap";


export default class CategoryList extends Component {
 
  

  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem action onClick={()=>this.props.changeCategory({})} active={this.props.currentCategory.id==null?true:false} href="#" tag="a" >All Products</ListGroupItem>
          {this.props.categories.map((category) => (
            <ListGroupItem
              key={category.id}
              onClick={() => this.props.changeCategory(category)}
              active={category.id === this.props.currentCategory.id?true:false}
              action
              tag="a"
              href="#"
            >
            {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
