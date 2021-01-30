import React, { Component } from 'react';
import { connect } from 'react-redux';

//Allow access to user's dashboard only if authentication is successful
const AuthGuard = (OriginalComponent) => {
  class MixedComponent extends Component {

    //Redirect user to home page when dashboard is clicked and user is not authenticated. Neither is any JWT Token in Local Storage
    checkAuth() {
      if (!this.props.isAuth && !this.props.jwtToken) {
        this.props.history.push('/');
      }
    }

    //User clicks on Dashboard then validate user
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      jwtToken: state.auth.token
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};

export default AuthGuard;
