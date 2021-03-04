import React from 'react';
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
} from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchBox from '../../../../components/SearchBox';
import { text } from '../../../../enums';
import useStyles from './index.style';

function TranningPhrases(props) {
  const classes = useStyles();
  const { intent, handleKeyDown, handleDelete } = props;
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h6">Tranning phrases</Typography>
      </Grid>
      <Grid item xs={8} container justify="flex-end">
        <SearchBox
          placeholder={text.SEARCH_TRANNING_PHRASES}
          isStartPositionIcon={false}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          className={classes.margin}
          placeholder={text.ADD_USER_EXPRESSION}
          size="medium"
          name="usersay"
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
      <TableContainer component={Paper}>
        <Table
          size="small"
          aria-label="a dense table"
          classes={{ table: classes.table }}
        >
          <TableBody>
            {intent &&
              intent.patterns &&
              intent.patterns.map((pattern) => (
                <TableRow key={pattern}>
                  <TableCell size="medium" align="left">
                    <TextField
                      fullWidth
                      className={classes.margin}
                      name={pattern}
                      size="medium"
                      defaultValue={pattern}
                      // onChange={handleOnChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FormatQuoteIcon />
                          </InputAdornment>
                        ),
                        classes: { underline: classes.underline },
                      }}
                      classes={
                        {
                          // root: classes.textFieldItem,
                        }
                      }
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
