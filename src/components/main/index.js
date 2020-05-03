import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import ReactLoading from 'react-loading';
import TotalDonation from '../total-donation';
import DonationList from '../donation-list';
import ProjectList from '../project-list';
import Header from '../header';
import { MONTHLY, ONE_TIME, DEFAULT_DONATION } from '../constants';
import { dueToday, monthlyPayment } from '../../utils/calculation';
import { BASE_URL } from '../../config';

import './main.scss';
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      loader: false,
      user: [],
    };
  }

  fetchProjects = async () => {
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.get(`${BASE_URL}/projects`);

      resp &&
        resp.data &&
        this.setState({ projects: resp.data.projects, loader: false });
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };
  fetchUser = async () => {
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.get(`${BASE_URL}/user`);

      resp &&
        resp.data &&
        this.setState({ user: resp.data.user, loader: false });
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };
  componentDidMount() {
    this.fetchProjects();
    this.fetchUser();
  }
  handleCalculation = (donation) => {
    const {
      user: { donations },
    } = this.state;
    const index = donations.findIndex(
      (item) => item.project._id === donation.project._id
    );

    if (index !== -1) {
      donations[index] = donation;
    }
    this.setState({ user: this.state.user }, () => {});
  };

  donate = async (project) => {
    const { user, projects } = this.state;

    const filterProject = projects.filter((item) => item._id !== project._id);

    const newDonation = {
      monthly: MONTHLY,
      oneTime: ONE_TIME,
      owner: user._id,
      project: project,
      raisedAmount: DEFAULT_DONATION,
    };

    user.donations.push(newDonation);
    this.setState({ user, projects: filterProject });
  };
  deleteDonation = async (donation) => {
    const { user } = this.state;

    const filterDonation = user.donations.filter(
      (item) => item.project._id !== donation.project._id
    );
    user.donations = filterDonation;

    this.setState({ user });

    // try {
    //   this.setState({
    //     loader: true,
    //   });
    //   const resp = await Axios.delete(
    //     `${BASE_URL}/user/${user._id}/donation/${donation._id}`
    //   );

    //   if (resp && resp.data) {
    //     this.fetchUser();
    //     this.setState({ loader: false });
    //   }
    // } catch (error) {
    //   this.setState({
    //     loader: false,
    //   });
    // }
  };

  handleContinue = async () => {
    const { user } = this.state;

    try {
      this.setState({
        loader: true,
      });

      // const resp = await Axios.all(
      //   user.donations.map((donation) => {
      //     return Axios.post(`${BASE_URL}/user/${user._id}/donation`, donation);
      //   })
      // );

      const resp = await Axios.post(
        `${BASE_URL}/user/${user._id}/donation`,
        user.donations
      );

      if (resp) {
        this.fetchUser();
        this.setState({ loader: false });
      }
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };
  render() {
    const {
      user: { donations },
      projects,
      user,
      loader,
    } = this.state;

    const dueTodayAmount = dueToday(user);
    const monthlyPaymentAmount = monthlyPayment(user);

    const project_ids = [];
    user &&
      donations &&
      donations.forEach((element) => {
        project_ids.push(element.project._id);
      });

    const filteredProject = projects.filter((project) => {
      return project_ids && !project_ids.includes(project._id);
    });
    const displayProject = filteredProject.filter((project, index) => {
      return index < 3;
    });
    const loading = () => (
      <ReactLoading
        type="spin"
        className="loading"
        color="#82cf8f"
        height={'10%'}
        width={'10%'}
      />
    );
    return (
      <div>
        <Header count={donations && donations.length} />

        <Container className="main">
          {loader ? (
            loading()
          ) : (
            <Fragment>
              <Row>
                <Col md={12}>
                  <h1>Donation List</h1>
                </Col>
              </Row>

              <Row>
                <Col md={7}>
                  <DonationList
                    donations={donations}
                    deleteDonation={this.deleteDonation}
                    handleCalculation={this.handleCalculation}
                  />
                </Col>
                <Col md={5}>
                  <TotalDonation
                    user={user}
                    monthlyPaymentAmount={monthlyPaymentAmount}
                    dueTodayAmount={dueTodayAmount}
                    handleContinue={this.handleContinue}
                  />
                  <div className="charge-text">
                    {`You have choosen to make a monthly recurring donation. Your
                    credit card will be charged $ ${dueTodayAmount} today. Starting next
                    month, Your credit card will be charged $ ${monthlyPaymentAmount} each month...`}
                  </div>
                  <div className="read-more">Read More</div>
                </Col>
              </Row>
              <Row>
                <ProjectList donate={this.donate} projects={displayProject} />
              </Row>
            </Fragment>
          )}
        </Container>
      </div>
    );
  }
}
