import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import LayoutListGroup from '../../components/Layout/Content/LayoutListGroup';
import Home from '../Home';
import ActionDetail from './ActionDetail';

function Action() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <LayoutListGroup />
      </Grid>
      <Grid item xs={8}>
        <Route
          exact
          path="/bot/:id/actions/:actionId"
          component={ActionDetail}
        />
        <Route exact path="/bot/:id/actions" component={Home} />
      </Grid>
    </Grid>
  );
}

export default Action;
