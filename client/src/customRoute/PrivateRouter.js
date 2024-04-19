import React from 'react';
import {  Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component, ...rest }) => {
  const firstLogin = localStorage.getItem('firstlogin');
  return firstLogin ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
