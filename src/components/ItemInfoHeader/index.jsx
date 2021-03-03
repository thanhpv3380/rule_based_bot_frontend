import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core';
import useStyles from './index.style';

const ItemInfoHeader = ({ name, listGroup, handleCreate }) => {
  const classes = useStyles();
  const [input, setInput] = useState();
  const [groupSelected, setGroupSelected] = useState();

  useEffect(() => {
    setInput(name);
  }, [name]);

  return (
    <AppBar position="static">
      <Toolbar>
        <TextField
          id="outlined-basic"
          variant="outlined"
          color="secondary"
          placeholder="Type name..."
          size="small"
          classes={{
            root: classes.textField,
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <FormControl className={classes.formControl}>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
            value={groupSelected}
            onChange={(e) => setGroupSelected(e.target.value)}
          >
            <MenuItem value="">
              <em>Not in Group</em>
            </MenuItem>
            {listGroup &&
              listGroup.map((el) => (
                <MenuItem value={el.id}>{el.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button size="large" variant="contained" onClick={handleCreate}>
          Save
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ItemInfoHeader;
