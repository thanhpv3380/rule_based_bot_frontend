import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, setCookie } from '../utils/cookie';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import routes from '../constants/route';
import appRoutes from './appRoutes';
import actions from '../redux/actions';

export default () => {
  const dispatch = useDispatch();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const { accessToken, verifying } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!accessToken) {
      const path = window.location.hash
        .split('&')
        .find((el) => el.includes('access_token='));
      const pathName = window.location.pathname;
      if (path) {
        const accessTokenFromUrl = path.split('access_token=')[1];
        setCookie('accessToken', accessTokenFromUrl);
        dispatch(actions.auth.verifyToken(accessTokenFromUrl));
        window.location.href = pathName;
      } else {
        const accessTokenFromCookie = getCookie('accessToken');
        if (accessTokenFromCookie) {
          dispatch(actions.auth.verifyToken(accessTokenFromCookie));
        }
      }
    }
    setIsFirstTime(false);
  }, []);

  if (isFirstTime || verifying) {
    return <CircularProgress />;
  }

  const publicRoutes = appRoutes.filter((route) => !route.isPrivate);

  const privateRoutes = appRoutes.filter((route) => route.isPrivate);

  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map((el) => (
          <PublicRoute
            key={el.path}
            exact={el.exact}
            path={el.path}
            Component={el.component}
          />
        ))}
        <Switch>
          {privateRoutes.map((el) => (
            <PrivateRoute
              key={el.path}
              exact={el.exact}
              Component={el.component}
              path={el.path}
              isLayout={el.isLayout}
              isHeader={el.isHeader}
            />
          ))}
          <Route
            path="/"
            // eslint-disable-next-line no-return-assign
            render={() =>
              (window.location.href = `https://rbc-portal.iristech.club${routes.DASHBOARD}`)
            }
          />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};
