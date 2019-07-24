import React from 'react';
import { connect } from 'react-redux';

import history from './history';
import { signout } from './actions'

class Logout extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.signout()
    history.push('/login')
  }

  render() {
    return (
      <div>
        <h3>Logging out...</h3>
      </div>
    )
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  signout
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);