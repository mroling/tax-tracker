import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Alert } from 'reactstrap';

class Clientlist extends Component {

  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  state = {
    products: [],
    visible: false,
    product: {
      name: 'Client name',
      price: 'Transaction amount',
      date: 'Date of Payment'
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = _ => {
  fetch('http://localhost:4000/tax')
    .then(response => response.json())
    .then(response => this.setState({ products: response.data}))
    .catch(err => console.error(err))

  }

  addProduct = _ => {
    const { product } = this.state;
    fetch(`http://localhost:4000/tax/add?name=${product.name}&price=${product.price}&date=${product.date}`)
    .then(this.getProducts)
    .then(this.alertSwitch)
    .catch(err => console.error(err))

  }

  alertSwitch = () => {
    this.setState({visible: true})
  }

  renderProduct = ({ product_id, name }) => <div key={product_id}>{name}</div>
  renderPrice = ({ product_id, price }) => <div key={product_id}>{price}</div>
  renderDate = ({ product_id, date }) => <div key={product_id}>{date}</div>


  render() {
    const { products, product } = this.state;

    return (

      <div className="App">

          <Container>


          <Row>
            <Col>Client Name</Col>
            <Col>Amount Paid</Col>
            <Col>Date of Payment</Col>
          </Row>


          <Row>
            <Col>{products.map(this.renderProduct)}</Col>
            <Col>{products.map(this.renderPrice)}</Col>
            <Col>{products.map(this.renderDate)}</Col>
          </Row>

          </Container>

        <div>
          <input
            value ={product.name}
            onChange={e => this.setState({ product: {...product, name:e.target.value}})} />
          <input
            value ={product.price}
            onChange={e => this.setState({ product: {...product, price:e.target.value}})} />
          <input
            value ={product.date}
            onChange={e => this.setState({ product: {...product, date:e.target.value}})} />


          <Button onClick ={this.addProduct}>Add txn </Button>

          <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
            Transaction added to database!
          </Alert>

        </div>



      </div>
    );
  }
}

export default Clientlist;
