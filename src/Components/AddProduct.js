import { Component } from "react";
import $ from "jquery";
import alertify from "alertifyjs";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";

export default class AddProduct extends Component {
  state = {
    product: {
      id: "",
      categoryId: 0,
      productName: "",
      quantityPerUnit: "",
      unitPrice: "",
      unitsInStock: "",
    },
  };

  onAddProduct = async () => {
    
    this.state.product.id = await this.props.newProductId();
    this.state.product.productName = $("#productName").val();
    this.state.product.categoryId = $("#categoryId").val();
    this.state.product.quantityPerUnit = $("#quantityPerUnit").val();
    this.state.product.unitPrice = $("#unitPrice").val();
    this.state.product.unitsInStock = $("#unitsInStock").val();

    var status = await this.props.addProduct(this.state.product);
    console.log(status);
    if (status === 201) {
      alertify.success("The product has been added.", 1);
    }else{
      alertify.error("The product couldn't added", 1);
    }

  };

  onChangeToProduct = async(event)=>{
    let name = event.target.id;
    let value = event.target.value;
    // await this.setState({product:{[name]:value}})
    // console.log(this.state.product);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <h3>New Product</h3>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col xs="6">
                <FormGroup>
                  <Label for="productName">Product Name</Label>
                  <Input
                    id="productName"
                    type="text"
                    placeholder="Product Name"
                    onChange={this.onChangeToProduct}
                    
                  ></Input>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="categoryId">Category</Label>
                  <Input id="categoryId" type="select" placeholder="Category" onChange={this.onChangeToProduct}>
                    <option value="-1" disabled selected>
                      Select a Category
                    </option>
                    {this.props.categories.map((item) => (
                      <option value={item.id}>{item.categoryName}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col xs="4">
                <Label for="unitPrice">Unit Price</Label>
                <Input
                  id="unitPrice"
                  type="text"
                  placeholder="Unit Price"
                  onChange={this.onChangeToProduct}
                ></Input>
              </Col>
              <Col xs="4">
                <Label>Quantity Per Unit</Label>
                <Input
                  id="quantityPerUnit"
                  type="text"
                  placeholder="Quantity Per Unit"
                  onChange={this.onChangeToProduct}
                ></Input>
              </Col>
              <Col xs="4">
                <Label>Units In Stock</Label>
                <Input
                  id="unitsInStock"
                  type="text"
                  placeholder="Units In Stock"
                  onChange={this.onChangeToProduct}
                ></Input>
              </Col>
            </Row>

            <Button
              color="success"
              className="mt-4"
              block
              onClick={this.onAddProduct}
            >
              Save
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
