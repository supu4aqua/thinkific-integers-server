import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Dashboard extends Component {
  async componentDidMount() {

    this.props.getSecret()
  }

  render() {
    return (
      <div>
        
        <br/>
        User's current integer: <h3>{this.props.secret}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    secret: state.dash.current_integer
  }
}

export default connect(mapStateToProps, actions)(Dashboard);