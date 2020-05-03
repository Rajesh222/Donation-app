import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CartCalculation from '../cart-calculation';

import './total-donation.scss';

export default class TotalDonation extends Component {
  render() {
    const { user, monthlyPaymentAmount, dueTodayAmount } = this.props;
    const raisedAmount = () => {
      let initialValue = 0;
      let sum =
        user &&
        user.donations &&
        user.donations.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.raisedAmount),
          initialValue
        );
      return sum;
    };
    const percentage = (raisedAmount() / user.goal) * 100;
    const remaining = user.goal - raisedAmount();

    return (
      <div>
        <Card className="total-donation-card">
          <Card.Body>
            <Row>
              <Col md={2} xs={4}>
                <CircularProgressbar
                  value={percentage}
                  styles={buildStyles({
                    pathColor: '#82cf8f',
                  })}
                />
              </Col>
              <Col md={8} xs={8}>
                <Card.Title>$ {remaining}</Card.Title>
                <p> of Zokat will remain</p>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <a className="link" href="#">
                  Add More Projects
                </a>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <CartCalculation
          user={user}
          monthlyPaymentAmount={monthlyPaymentAmount}
          dueTodayAmount={dueTodayAmount}
          handleContinue={this.props.handleContinue}
        />
      </div>
    );
  }
}
