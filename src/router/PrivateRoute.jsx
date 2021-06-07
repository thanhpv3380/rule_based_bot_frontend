import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Layout from '../components/Layout';
import actions from '../redux/actions';

export default function PrivateRoute({
  Component,
  isLayout,
  isHeader,
  path,
  ...rest
}) {
  const { REACT_APP_PORTAL_DOMAIN } = process.env;
  const dispatch = useDispatch();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { bot, isProcessing } = useSelector((state) => state.bot);
  const url = window.location.href;

  useEffect(() => {
    if (!bot) {
      const listEleUrl = url.split('/');
      const pos = listEleUrl.indexOf('bot');
      if (pos >= 0) {
        dispatch(actions.bot.getBot(listEleUrl[pos + 1]));
      } else {
        window.location.href = `${REACT_APP_PORTAL_DOMAIN}/dashboard`;
      }
      setIsFirstTime(false);
    }
  }, []);

  if (!accessToken) {
    window.location.href = `${REACT_APP_PORTAL_DOMAIN}/login?redirect_uri=${url}`;
  }

  if (bot) {
    if (isLayout) {
      return (
        <Layout isLayout={isLayout} isHeader={isHeader}>
          <Route {...rest} render={(props) => <Component {...props} />} />
        </Layout>
      );
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  if (isProcessing || isFirstTime) {
    return <CircularProgress />;
  }

  if (!bot) {
    window.location.href = `${REACT_APP_PORTAL_DOMAIN}/dashboard`;
  }
}
