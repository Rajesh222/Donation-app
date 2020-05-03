import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

import './cart-calculation.scss';

export default class CartCalculation extends Component {
  render() {
    const { monthlyPaymentAmount, dueTodayAmount } = this.props;
    return (
      <div>
        <Card className="cart-calculation">
          <Card.Body>
            <Row>
              <Col md={5}>
                <Card.Title> $ {dueTodayAmount}</Card.Title>
                <p> Total due today</p>
              </Col>
              <Col md={7}>
                <Card.Title> $ {monthlyPaymentAmount}</Card.Title>
                <p> Including monthly payment</p>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <Button
                  onClick={this.props.handleContinue}
                  className="continue-button"
                  variant="success"
                  block
                >
                  Continue
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
