import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: Component,
  isAuthenticated: string,
  location: Object
};

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: Props) =>
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />}
  />;

export default connect(state => ({ isAuthenticated: state.main.user.authState }))(PrivateRoute);
