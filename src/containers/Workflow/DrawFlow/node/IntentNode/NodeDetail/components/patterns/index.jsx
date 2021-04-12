/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  InputBase,
} from "@material-ui/core";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./index.style";

const patterns = ["tối muốn đặt vé đi Đà Nẵng", "đặt vé đi Thái Nguyên"];

function Patterns(props) {
  const classes = useStyles();
  const {} = props;
  const [userExpression, setUserExpression] = useState();
  // const test = async (e) => {
  //   if (e.keyCode === 13) {
  //     await handleKeyDown(e.target.value);
  //     setUserExpression("");
  //   }
  // };
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h6">Patterns</Typography>
      </Grid>
      <Grid item xs={8} container justify="flex-end">
        <TextField
          className={classes.margin}
          placeholder="Search pattern"
          id="input-with-icon-textfield"
          // onChange={handleChangeSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            classes: { underline: classes.underlineSearch },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          className={classes.margin}
          placeholder="Add pattern"
          size="medium"
          // name="usersay"
          value={userExpression}
          onChange={(e) => setUserExpression(e.target.value)}
          // onKeyDown={test}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FormatQuoteIcon />
              </InputAdornment>
            ),
          }}
          classes={{
            root: classes.textFieldItem,
          }}
        />
      </Grid>
      <TableContainer
        component={Paper}
        classes={{ root: classes.tableContainer }}
      >
        <Table key={1} size="small" classes={{ table: classes.table }}>
          <TableBody>
            {patterns &&
              patterns.map((pattern, index) => (
                <TableRow key={index}>
                  <TableCell
                    size="medium"
                    align="left"
                    className={classes.tableCell}
                  >
                    <FormatQuoteIcon className={classes.formatQuoteIcon} />
                    <InputBase
                      className={classes.inputRow}
                      name={pattern}
                      value={pattern}
                      // onInput={(e) => handleChangePattern(e, index)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                    // onClick={() => handleDelete(pattern)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Patterns;
