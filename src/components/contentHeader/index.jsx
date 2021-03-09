import React from 'react';
import {
  Grid,
  TextField,
  Paper,
  InputAdornment,
  Button,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import useStyles from './index.style';

function ContentHeader(props) {
  const classes = useStyles();
  const {
    groups,
    item,
    handleChangeGroup,
    groupSelect,
    handleOnChangeName,
    handleSubmit,
  } = props;

  return (
    <Paper className={classes.paper} elevation={5}>
      <Grid container spacing={1} className={classes.root}>
        <Grid item container xs={9} spacing={1}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              size="medium"
              className={classes.inputItem}
              // margin="dense"
              placeholder="Enter name"
              value={item ? item.name : ''}
              onChange={handleOnChangeName}
              classes={{
                root: classes.textFieldRoot,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <InfoOutlinedIcon />
                  </InputAdornment>
                ),
                // classes: { underline: classes.underline },
              }}
            />
          </Grid>
          <Grid item xs={4} container justify="flex-end">
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                displayEmpty
                value={groupSelect}
                onChange={(e) => handleChangeGroup(e)}
              >
                {groups &&
                  groups.map((group) => {
                    return <MenuItem value={group}>{group.name}</MenuItem>;
                  })}
                {/* <MenuItem value={groupDefault} key={0}>
                  {groupDefault.name}
                </MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={classes.buttonItem}
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ContentHeader;
