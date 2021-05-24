/* eslint-disable camelcase */
import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { setCookie } from '../utils/cookie';

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
  const listElementUrl = redirect_uri.split('/');
  const pos = listElementUrl.findIndex((el) => el === 'bot');
  if (pos >= 0) {
    if (listElementUrl[pos + 1]) {
      setCookie('bot-id', listElementUrl[pos + 1]);
    }
  }
<<<<<<< HEAD
  console.log('ttt');
=======
>>>>>>> task/flow
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
