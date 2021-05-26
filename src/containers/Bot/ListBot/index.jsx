import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  TablePagination,
} from '@material-ui/core';
import useStyles from './index.style';
import imageConstant from '../../../constants/images';

const ListBot = ({
  keySearch,
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
          items
            .filter((el) => el.name.indexOf(keySearch.trim()) >= 0)
            .slice(
              pagination.page * pagination.rowsPerPage,
              pagination.page * pagination.rowsPerPage + pagination.rowsPerPage,
            )
            .map((item) => {
              return (
                <Grid
                  key={item.id}
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={3}
                  onClick={() => handleView(item.id)}
                >
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        square
                        image={item.imageUrl || imageConstant.botImage}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.name || ''}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
      {items &&
        items.filter((el) => el.name.indexOf(keySearch.trim()) >= 0).length >
          pagination.rowsPerPage && (
          <TablePagination
            rowsPerPageOptions={[6]}
            component="div"
            count={
              items.filter((el) => el.name.indexOf(keySearch.trim()) >= 0)
                .length
            }
            page={pagination.page}
            rowsPerPage={pagination.rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
    </div>
  );
};

export default ListBot;
