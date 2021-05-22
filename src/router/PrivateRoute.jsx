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
  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log(accessToken, 'accessToken');
  if (!accessToken) {
    window.location.href = `https://rbc-portal.iristech.club/login?redirectUri=http://localhost:8080${routes.DASHBOARD}`;
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
