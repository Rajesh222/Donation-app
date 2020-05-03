import React, { Component } from 'react';
import { Card, Image, Row, Col, Container, Overlay } from 'react-bootstrap';

import './donation.scss';

export default class Donation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      raisedAmount: this.props.donation.raisedAmount,
      monthly: this.props.donation.monthly,
      oneTime: this.props.donation.oneTime,
      donation: this.props.donation,
      show: false,
    };
    this.target = React.createRef();
  }

  handleOptionChange = (e) => {
    const { donation } = this.state;
    const { handleCalculation } = this.props;
    const value = e.target.value;
    let monthly, oneTime;
    if (value === 'monthly') {
      oneTime = false;
      monthly = true;
    } else {
      monthly = false;
      oneTime = true;
    }
    this.setState(
      {
        oneTime,
        monthly,
      },
      () => {
        donation.monthly = this.state.monthly;
        donation.oneTime = this.state.oneTime;
        donation.raisedAmount = this.state.raisedAmount;
        this.setState({ donation }, () => {
          handleCalculation(donation);
        });
      }
    );
  };
  handleDelete = () => {
    this.setState({ show: true });
  };
  deleteDonation = () => {
    const { deleteDonation, donation } = this.props;
    deleteDonation(donation);
    this.setState({ show: false });
  };
  handleInput = (e) => {
    const { donation } = this.state;
    const { handleCalculation } = this.props;
    this.setState(
      { isEdit: !this.state.isEdit, raisedAmount: e.target.value },
      () => {
        donation.monthly = this.state.monthly;
        donation.oneTime = this.state.oneTime;
        donation.raisedAmount = this.state.raisedAmount;
        this.setState({ donation }, () => {
          handleCalculation(donation);
        });
      }
    );
  };
  handleAmount = () => {
    this.setState({ isEdit: true });
  };
  hadleChange = (e) => {
    this.setState({ raisedAmount: e.target.value });
  };
  render() {
    const { index, length } = this.props;
    const first = index === 0 ? 'first' : '';
    const last = index === length - 1 ? 'last' : '';
    const {
      isEdit,
      donation,
      monthly,
      oneTime,
      raisedAmount,
      show,
    } = this.state;

    const overLay = (
      <Overlay target={this.target.current} show={show} placement="left">
        {({
          placement,
          scheduleUpdate,
          arrowProps,
          outOfBoundaries,
          show: _show,
          ...props
        }) => (
          <div
            {...props}
            style={{
              backgroundColor: '#F9F9F9',
              padding: '20px 10px',
              color: '#000',
              borderRadius: 10,
              ...props.style,
            }}
          >
            <h6 className="moving-project">Moving to following project</h6>
            <h6 className="delete" onClick={this.deleteDonation}>
              Delete
            </h6>
          </div>
        )}
      </Overlay>
    );
    return (
      <div>
        <Card className={`donation-card ${first} ${last}`}>
          <Card.Body>
            <Container>
              <Row>
                <Col md={2} xs={3}>
                  <Image
                    src="assets/download.jpg"
                    fluid
                    style={{ borderRadius: 15 }}
                  />
                </Col>
                <Col md={8} xs={7}>
                  <h6>{donation.project.title}</h6>
                  <p>{donation.project.type}</p>
                </Col>
                <Col md={{ span: 1, offset: 1 }} xs={{ span: 1 }}>
                  <div
                    className="delete-button"
                    ref={this.target}
                    onClick={this.handleDelete}
                  >
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  {overLay}
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <label className="donation-container">
                    Monthly
                    <input
                      type="radio"
                      checked={monthly}
                      value="monthly"
                      onChange={this.handleOptionChange}
                    />
                    <span className="checkmark"></span>
                  </label>
                </Col>
                <Col md={4}>
                  <label className="donation-container">
                    One-time
                    <input
                      type="radio"
                      checked={oneTime}
                      value="oneTime"
                      onChange={this.handleOptionChange}
                    />
                    <span className="checkmark"></span>
                  </label>
                </Col>

                <Col md={{ span: 3, offset: 1 }}>
                  {isEdit ? (
                    <input
                      type="number"
                      value={raisedAmount}
                      className="amount-text"
                      onChange={this.hadleChange}
                      onBlur={this.handleInput}
                    ></input>
                  ) : (
                    <div className="amount" onClick={this.handleAmount}>
                      $ {raisedAmount}
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
