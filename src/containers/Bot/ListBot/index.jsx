import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  TablePagination,
} from '@material-ui/core';
import useStyles from './index.style';
import imageConstant from '../../../constants/images';

const ListBot = ({
  items,
  handleView,
  pagination,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {items &&
          items.map((item) => {
            return (
              <Grid
                key={item.id}
                item
                xs={4}
                onClick={() => handleView(item.id)}
              >
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={item.image || imageConstant.botImage}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name || ''}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.description || ''}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[6]}
        component="div"
        count={pagination.count}
        page={pagination.page}
        rowsPerPage={pagination.rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ListBot;
