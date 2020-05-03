import React, { Component, Fragment } from 'react';

import Donation from '../donation';

export default class DonationList extends Component {
  render() {
    const { donations, handleCalculation } = this.props;

    return (
      <Fragment>
        {donations &&
          donations.length > 0 &&
          donations.map((donation, index, donations) => {
            return (
              <Donation
                key={donation.project._id}
                donation={donation}
                index={index}
                deleteDonation={this.props.deleteDonation}
                length={donations.length}
                handleCalculation={handleCalculation}
              />
            );
          })}
      </Fragment>
    );
  }
}
