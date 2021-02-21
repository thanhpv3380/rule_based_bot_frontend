import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import routes from '../constants/route';

export default function PrivateRoute({ Component, isLayout, ...rest }) {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return (
    <Layout isLayout={isLayout}>
      <Route
        {...rest}
        render={(props) =>
          accessToken ? (
            <Component {...props} />
          ) : (
            <Redirect to={routes.LOGIN} />
          )
        }
      />
    </Layout>
  );
}
