/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import 'date-fns';
import useStyles from './index.style';

const CardAdvanced = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const classes = useStyles();
  const { title, children, isNoneSaveBtn } = props;
  return (
    <Box className={classes.card}>
      <Grid
        className={classes.cardHeader}
        style={{
          backgroundColor:
            title !== 'Delete Bot' ? 'rgb(73, 145, 226)' : 'rgb(241, 106, 115)',
        }}
      >
        <Typography variant="h5" className={classes.headerText}>
          {title}
        </Typography>
        {!isNoneSaveBtn && (
          <Button className={classes.buttonIconHeader}>save</Button>
        )}
      </Grid>
      <Grid className={classes.cardBody}>{children}</Grid>
    </Box>
  );
};

export default CardAdvanced;
