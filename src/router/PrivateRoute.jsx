/* eslint-disable camelcase */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import routes from '../constants/route';

export default function PrivateRoute({
  Component,
  isLayout,
  isHeader,
  ...rest
}) {
  // const portal_domain = '';
  const { REACT_APP_PORTAL_DOMAIN } = process.env;
  const accessToken = useSelector((state) => state.auth.accessToken);
  if (!accessToken) {
    const redirect_uri = window.location.href;
    window.location.href = `${REACT_APP_PORTAL_DOMAIN}/login?redirect_uri=${redirect_uri}`;
  }
  if (isHeader) {
    return (
      <Layout isLayout={isLayout}>
        <Route
          {...rest}
          render={(props) => accessToken && <Component {...props} />}
        />
      </Layout>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to={routes.LOGIN} />
      }
    />
  );
}
// `https://rbc-portal.iristech.club/login?redirectUri=http://localhost:8080${routes.DASHBOARD}`
