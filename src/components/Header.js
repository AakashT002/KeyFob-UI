import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from 'react-md/lib/Toolbars';
import { Button } from 'react-md';
import PropTypes from 'prop-types';
import keycloak from '../keycloak-config';
import '../assets/stylesheets/Header.css';
import keyfob_logo from '../assets/images/keyfob_logo.jpg';
import Home_logo from '../assets/images/Home_logo.jpg';
import { Avatar } from 'react-md';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  renderUsername() {
    const username = this.props.userName;
    sessionStorage.setItem('userRoles', this.props.userRoles);
    return (
      <div className="Header_username-img">
        <div className="Header__username-avatar">
          <Avatar key={username} suffix="grey">
            {username && username.length > 0
              ? username.charAt(0).toUpperCase()
              : '?'}
          </Avatar>
        </div>
        <div className="Header__username">
          <label>{username}</label>
        </div>
        <div className="Header__sign-out">
          <Button
            flat
            className="Header__sign-out-button"
            onClick={this.logout}
          >
            Logout&gt;
          </Button>
        </div>
      </div>
    );
  }

  logout() {
    sessionStorage.clear();
    keycloak.logout();
  }

  renderTitle() {
    return (
      <div className="Header__info">
        <div className="home-button">
          <Button
            flat
            primary
            className="Header_home"
            onClick={this.handleClick}
          >
            <img src={Home_logo} className="Header__home-logo" alt="logo" />
            <h4 className="Header_home-text">Home</h4>
          </Button>
        </div>
        <div className="Header__title">
          <span className="Header__title-key">
            Key
            <span className="Header__title-fob">Fob</span>
          </span>
          <img src={keyfob_logo} className="Header__title-logo" alt="logo" />
        </div>
      </div>
    );
  }

  handleClick() {
    this.props.history.push('/domains');
  }

  render() {
    return (
      <div className="Header--featured">
        <Toolbar
          actions={this.renderUsername()}
          className="Header__toolbar"
          title={this.renderTitle()}
        />
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
  userRoles: PropTypes.array,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
    userRoles: state.user.userRoles,
  };
}

export default connect(mapStateToProps)(Header);
