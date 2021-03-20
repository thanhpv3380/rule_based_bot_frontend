/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
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
  Menu,
  MenuItem,
  TableHead,
} from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
// import { FlashOnRounded, FreeBreakfastOutlined } from '@material-ui/icons';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import textDefault from '../../../../constants/textDefault';
import useStyles from './index.style';
import apis from '../../../../apis';

function TranningPhrases(props) {
  const classes = useStyles();
  const {
    userExpression,
    handleKeyDown,
    handleDelete,
    patterns,
    handleChangeSearch,
    handleChangePattern,
    handleMouseUpUsersay,
    handleClickEntity,
    handleCloseMenuEntity,
  } = props;

  const [entities, setEntities] = useState();

  const fetchEntities = async () => {
    const { results } = await apis.entity.getEntities();
    setEntities(results.entities);
  };

  useEffect(() => {
    fetchEntities();
  }, []);

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
          name="usersay"
          value={userExpression}
          onKeyDown={(e) => handleKeyDown(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FormatQuoteIcon />
              </InputAdornment>
            ),
            // classes: { underline: classes.underline },
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
        <Table size="small" classes={{ table: classes.table }}>
          <TableBody>
            {patterns &&
              patterns.map((el) => (
                <TableRow>
                  {/* <TableCell> */}
                  <TableCell size="medium" align="left">
                    <Grid container xs={12}>
                      <Grid item xs={11} fullWidth>
                        <div
                          contentEditable="true"
                          style={{
                            fontSize: '1.08em',
                            fontFamily: 'inherit',
                            outline: '0px solid transparent',
                          }}
                          onMouseUp={(e) => handleMouseUpUsersay(e, el)}
                          onInput={(e) => handleChangePattern(e, el)}
                        >
                          {el.parameters &&
                            el.parameters.map((item, index) => {
                              if (item.isEntity) {
                                return (
                                  <span
                                    name={index}
                                    style={{
                                      backgroundColor: `#${Math.floor(
                                        Math.random() * 16777215,
                                      ).toString(16)}`,
                                    }}
                                    // className={classes.test}
                                  >
                                    {item.value}
                                  </span>
                                );
                              }
                              return <span name={index}>{item.value}</span>;
                            })}
                          <Menu
                            anchorEl={el.anchorEl}
                            keepMounted
                            open={Boolean(el.anchorEl)}
                            onClose={() => {
                              handleCloseMenuEntity(el);
                            }}
                            classes={{ paper: classes.muiMenuPaper }}
                          >
                            {entities &&
                              entities.map((entity) => (
                                <MenuItem
                                  onClick={(e) =>
                                    handleClickEntity(e, el, entity)
                                  }
                                >
                                  {entity.name}
                                </MenuItem>
                              ))}
                          </Menu>
                        </div>
                      </Grid>

                      <Grid item xs={1} container justify="flex-end">
                        <DeleteIcon onClick={() => handleDelete(el.id)} />
                      </Grid>

                      {el.openTable && (
                        <TableContainer elevation={0} component={Paper}>
                          <Table className={classes.table}>
                            <TableHead>
                              <TableRow className={classes.tableRowHeader}>
                                <TableCell align="left">
                                  Parameter Name
                                </TableCell>
                                <TableCell align="left">Entity</TableCell>
                                <TableCell align="left">Value </TableCell>
                                <TableCell align="left" />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {el.parameters &&
                                el.parameters.map((item) => {
                                  if (item.isEntity) {
                                    return (
                                      <TableRow>
                                        <TableCell align="left">
                                          {item.name}
                                          {/* <TextField
                                            // onChange={handleChange}
                                            // value={item.name}
                                            className={classes.inputItem}
                                          /> */}
                                        </TableCell>
                                        <TableCell align="left">
                                          {item.entity.name}
                                        </TableCell>
                                        <TableCell align="left">
                                          {item.value}
                                        </TableCell>
                                        <TableCell align="left">
                                          <BorderColorOutlinedIcon />
                                          <DeleteOutlineOutlinedIcon />
                                        </TableCell>
                                      </TableRow>
                                    );
                                  }
                                  return ' ';
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </Grid>
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
