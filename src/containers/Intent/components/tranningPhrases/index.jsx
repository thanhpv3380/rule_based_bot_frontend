/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
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
} from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

import textDefault from '../../../../constants/textDefault';
import useStyles from './index.style';

function TranningPhrases(props) {
  const classes = useStyles();
  const {
    // userExpression,
    handleKeyDown,
    handleDelete,
    patterns,
    handleChangeSearch,
    handleChangePattern,
  } = props;
  const [userExpression, setUserExpression] = useState('');
  const test = (e) => {
    handleKeyDown(e);
    setUserExpression('');
  };
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h6">Tranning phrases</Typography>
      </Grid>
      <Grid item xs={8} container justify="flex-end">
        <TextField
          className={classes.margin}
          placeholder={textDefault.SEARCH_TRANNING_PHRASES}
          id="input-with-icon-textfield"
          onChange={handleChangeSearch}
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
          placeholder={textDefault.ADD_USER_EXPRESSION}
          size="medium"
          // name="usersay"
          defaultValue={userExpression}
          onChange={(e) => setUserExpression(e.target.value)}
          onKeyDown={(e) => test(e)}
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
                      onInput={(e) => handleChangePattern(e, index)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <DeleteIcon onClick={() => handleDelete(pattern)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default TranningPhrases;
