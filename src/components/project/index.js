import React, { Component, Fragment } from 'react';
import { Card, Image, Col, ProgressBar, Button } from 'react-bootstrap';
import { Heart } from 'react-bootstrap-icons';

import './project.scss';
export default class Project extends Component {
  handleClick = () => {
    const { donate, project } = this.props;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    donate(project);
  };
  daysLeft(endDate) {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const differenceMs = Math.abs(new Date() - new Date(endDate));

    return Math.round(differenceMs / ONE_DAY);
  }
  render() {
    const {
      imgSrc,
      location,
      donationBudget,
      raisedDonation,
      title,
      type,
      endDate,
    } = this.props.project;
    const progress = (raisedDonation / donationBudget) * 100;

    return (
      <Fragment>
        <Col md={4}>
          <Card className="project">
            <Image className="project-image" src={imgSrc} fluid />
            <Card.Body className="project-body">
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                {type} {location}
              </Card.Text>
              <Card.Text>
                {`$ ${raisedDonation} raised of $ ${donationBudget}`}
              </Card.Text>
              <ProgressBar className="project-progress-bar" now={progress} />
              <p>{this.daysLeft(endDate)} days left</p>
              <Button
                variant="success"
                className="donate btn-lg"
                onClick={this.handleClick}
              >
                Donate
              </Button>
              <Heart className="project-heart" />
            </Card.Body>
          </Card>
        </Col>
      </Fragment>
    );
  }
}
