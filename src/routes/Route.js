import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/Default';
import AuthLayout from '../pages/_layouts/Auth';

import { useAuth } from  '../hooks/auth'; 

export default function RouteWrapper({
  component: Component, 
  isPrivate,
  ...rest
}) {

  const { user } = useAuth();

  const typeUser = localStorage.getItem('@CFP:type')
  
  const signed = !!user;

  if (!signed && isPrivate) {
    return <Redirect to ="/" />
  }

  if (signed && !isPrivate) {
    if(typeUser === "0" || typeUser === "1" ) return <Redirect to ="/dashboard" />;
    if(typeUser === "2") return <Redirect to ="/classes" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route {...rest} render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )} />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};