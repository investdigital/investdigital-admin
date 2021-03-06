import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {

  render() {
    const { component: ComposedComponent, ...rest } = this.props;

    return (<Route {...rest} render={props => (
      this.props.authenticated ? (
        <ComposedComponent {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }}/>
      )
    )}/>);
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated 
  };
  // console.log(authenticated);
}

export default connect(mapStateToProps)(PrivateRoute);