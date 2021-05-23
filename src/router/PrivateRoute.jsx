/* eslint-disable camelcase */
import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';

export default function PrivateRoute({
  Component,
  isLayout,
  isHeader,
  path,
  ...rest
}) {
  const { REACT_APP_PORTAL_DOMAIN } = process.env;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const redirect_uri = window.location.href;
  if (isHeader) {
    return (
      <Layout isLayout={isLayout}>
        <Route
          {...rest}
          render={(props) =>
            accessToken ? (
              <Component {...props} />
            ) : (
              window.location.assign(
                `${REACT_APP_PORTAL_DOMAIN}/login?redirect_uri=${redirect_uri}`,
              )
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
        accessToken ? (
          <Component {...props} />
        ) : (
          window.location.assign(
            `${REACT_APP_PORTAL_DOMAIN}/login?redirect_uri=${redirect_uri}`,
          )
        )
      }
    />
  );
}
