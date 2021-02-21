import React from 'react';
import { Avatar, Grid, Paper, Typography, Card } from '@material-ui/core';
import useStyles from './index.style';

function ListBot(props) {
  const classes = useStyles();
  const { bots } = props;
  return (
    <div>
      {/*{bots?.map((bot) => {
        return (
        <Paper className={classes.root} elevation={5}>
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
               <Grid container className={classes.gridBody} spacing={10} item>
                <Grid item>
                  <Typography>intent: 3</Typography>
                </Grid>
                <Grid item>
                  <Typography>action: 4</Typography>
                </Grid>
                <Grid item>
                  <Typography>entity: 5</Typography>
                </Grid>
              </Grid> 
            </Grid>
          </Grid>
        </Paper>
      )})} */}

      <Grid container spacing={3}>
        {bots?.map((bot) => {
          return (
            <Grid item xs={4}>
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
