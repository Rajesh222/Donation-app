import React, { Component, Fragment } from 'react';
import { Navbar, Form, Nav, FormControl } from 'react-bootstrap';
import { ChatSquare, Bell, Search } from 'react-bootstrap-icons';

import './header.scss';

export default class Header extends Component {
  render() {
    const { count } = this.props;
    return (
      <Fragment>
        <Navbar bg="light" expand="lg" className="my-nav-bar">
          <Navbar.Brand href="#" id="brand-name">
            H
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link href="#" className="header-link">
              Discover
            </Nav.Link>
            <Nav.Link href="#" className="header-link">
              Simple Guide
            </Nav.Link>
            <Form inline>
              <Search></Search>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2 search-header"
              />
            </Form>
            <div className="user-details">
              <ChatSquare className="chat" />
              <Bell className="chat" />

              <div className="user">
                <img
                  src="assets/user.jpg"
                  height="30"
                  width="30"
                  alt="profile"
                />
                <div className="header-link your-list">Your List</div>
                <div className="count">{count}</div>
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}
