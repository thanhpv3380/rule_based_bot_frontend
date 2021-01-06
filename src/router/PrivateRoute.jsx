import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from '../constants/route';

export default function PrivateRoute({ Component, ...rest }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log({ ...rest });
  return (
    <Route
      {...rest}
      render={(props) =>
        !accessToken ? <Component {...props} /> : <Redirect to={routes.LOGIN} />
      }
    />
  );
}
