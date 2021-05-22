import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Redirect,
  useLocation,
  useParams,
} from 'react-router-dom';
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
      const path = window.location.href;
      if (path && path.includes('/dashboard#access_token=')) {
        // eslint-disable-next-line prefer-destructuring
        const accessTokenFromUrl = path.split('#')[1].split('access_token=')[1];
        setCookie('accessToken', accessTokenFromUrl);
        dispatch(actions.auth.verifyToken(accessTokenFromUrl));
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
          <Redirect to={routes.DASHBOARD} />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};
