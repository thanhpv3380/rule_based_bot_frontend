import React from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import useStyles from "./index.style";

const ItemInfoHeader = (
  {
    // name,
    // groupId,
    // groupItems,
    // handleSave,
    // handleChange,
  }
) => {
  const classes = useStyles();
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
          name="name"
          // value={name}
          // onChange={handleChange}
        />
        <FormControl className={classes.formControl}>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
            name="groupId"
            // value={`${groupId}`}
            // onChange={handleChange}
          >
            {/* {groupItems &&
              groupItems.map((el) => (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              ))} */}
          </Select>
        </FormControl>
        <Button size="large" variant="contained">
          Save
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ItemInfoHeader;
