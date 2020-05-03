import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Project from '../project';
import './project-list.scss';

export default class ProjectList extends Component {
  render() {
    const { projects } = this.props;
    return (
      <Container className="project-list">
        <Row>
          <Col md={8}>
            <h1>You may also like these projects</h1>
          </Col>
          <Col md={{ span: 2, offset: 2 }} xs={{ span: 6, offset: 6 }}>
            <Button className="discover-all"> Discover All</Button>
          </Col>
        </Row>

        <Row>
          {projects &&
            projects.length > 0 &&
            projects.map((project, index) => {
              return (
                <Project
                  key={project._id}
                  project={project}
                  index={index}
                  donate={this.props.donate}
                />
              );
            })}
        </Row>
      </Container>
    );
  }
}
