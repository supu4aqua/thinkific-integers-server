import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
  //Bind this
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  //Sign out user
  signOut() {
    this.props.signOut();
  }

  render() {
    return (
      /*Create NavigaryionBar/Header */ 
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        <Link className="navbar-brand" to="/">Thinkific-Users</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          {/* Display SignIn and SignUp button when user is not authenticated */}
          <ul className="nav navbar-nav ml-auto">
            { !this.props.isAuth ?
              [<li className="nav-item" key="signup">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>,
              <li className="nav-item" key="signin">
                <Link className="nav-link" to="/signin">Sign In</Link>
              </li>] : null }
             {/* Display SignOut button only if user is authenticated */}
            { this.props.isAuth ?
              <li className="nav-item">
                <Link className="nav-link" to="/signout" onClick={this.signOut}>Sign Out</Link>
              </li> : null }
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, actions)(Header);