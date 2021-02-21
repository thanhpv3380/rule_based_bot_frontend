import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import routes from '../constants/route';

import appRoutes from './appRoutes';

export default () => {
  const publicRoutes = appRoutes.filter((route) => !route.isPrivate);

  const privateRoutes = appRoutes.filter((route) => route.isPrivate);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          {publicRoutes.map((el) => (
            <PublicRoute
              key={el.path}
              exact={el.exact}
              path={el.path}
              component={el.component}
            />
          ))}
            <Switch>
              {privateRoutes.map((el) => ( 
                <PrivateRoute
                  key={el.path}
                  exact={el.exact}
                  component={el.component}
                  path={el.path}
                  isLayout={el.isLayout}
                />
              ))}
              <Redirect to={routes.HOME} />
            </Switch>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
