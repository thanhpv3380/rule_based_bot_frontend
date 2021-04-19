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
  const accessToken = useSelector((state) => state.auth.accessToken);
  if (isHeader) {
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
  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to={routes.LOGIN} />
      }
    />
  );
}
