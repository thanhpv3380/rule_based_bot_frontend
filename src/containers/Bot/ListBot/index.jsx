import React from 'react';
import { Avatar, Grid, Typography, Card } from '@material-ui/core';
import useStyles from './index.style';

function ListBot(props) {
  const classes = useStyles();
  const { bots, handleOnClick } = props;
  return (
    <div>
      <Grid container spacing={3}>
        {bots &&
          bots.map((bot) => {
            return (
              <Grid item xs={4} onClick={() => handleOnClick(bot)}>
                <Card className={classes.root} elevation={4}>
                  <Grid container spacing={3}>
                    <Grid item>
                      <Avatar className={classes.rounded} variant="rounded" />
                    </Grid>
                    <Grid item>
                      <Grid xs>
                        <Typography variant="h6" gutterBottom>
                          {bot.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default ListBot;
