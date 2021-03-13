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

const ItemInfoHeader = ({ name, groupItems, groupActionId, handleSave }) => {
  const classes = useStyles();
  const [input, setInput] = useState();
  const [groupSelected, setGroupSelected] = useState(null);

  useEffect(() => {
    setInput(name);
  }, [name]);

  useEffect(() => {
    setGroupSelected(groupActionId);
  }, [groupActionId]);

  return (
    <AppBar position="static">
      <Toolbar>
        <TextField
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
            <MenuItem value={null}>
              <em>Not in Group</em>
            </MenuItem>
            {groupItems &&
              groupItems.map((el) => (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          size="large"
          variant="contained"
          onClick={() => handleSave(input, groupSelected)}
        >
          Save
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ItemInfoHeader;
