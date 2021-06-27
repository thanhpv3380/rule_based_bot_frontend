/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  TablePagination,
} from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './index.style';

function Patterns(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    // userExpression,
    handleKeyDown,
    handleDelete,
    patterns,
    handleChangeSearch,
    handleChangePattern,
  } = props;
  const [userExpression, setUserExpression] = useState();

  const [listPattern, setListPattern] = useState({
    data: patterns,
    start: 0,
    end: 5,
  });

  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    count: 100,
  });

  useEffect(() => {
    setListPattern({
      ...listPattern,
      data: patterns,
    });
  }, [patterns]);

  useEffect(() => {
    const start = pagination.page * pagination.rowsPerPage;
    const end = start + pagination.rowsPerPage;
    setListPattern({
      ...listPattern,
      start,
      end,
    });
  }, [pagination.page]);

  const handleChangePage = async (event, newPage) => {
    const start = pagination.page * pagination.rowsPerPage;
    const end = start + pagination.rowsPerPage;
    setPagination({
      ...pagination,
      page: newPage,
      start,
      end,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      ...pagination,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const addPattern = async (e) => {
    if (e.keyCode === 13) {
      await handleKeyDown(e.target.value);
      setUserExpression('');
    }
  };
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h6">{t('patterns')}</Typography>
      </Grid>
      <Grid item xs={8} container justify="flex-end">
        <TextField
          className={classes.margin}
          placeholder={t('search_pattern')}
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
          placeholder={t('add_usersay')}
          size="medium"
          // name="usersay"
          value={userExpression}
          onChange={(e) => setUserExpression(e.target.value)}
          onKeyDown={addPattern}
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
            {listPattern &&
              listPattern.data &&
              listPattern.data
                .slice(listPattern.start, listPattern.end)
                .map((pattern, index) => (
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
      <TablePagination
        component="div"
        rowsPerPageOptions={[5]}
        count={(patterns && patterns.length) || 1}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Grid>
  );
}

export default Patterns;
