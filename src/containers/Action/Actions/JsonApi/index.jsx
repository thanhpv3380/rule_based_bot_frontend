/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  VpnLock as VpnLockIcon,
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { format } from 'json-string-formatter';
import useStyles from './index.style';
import textDefault from '../../../../constants/textDefault';

const ActionJsonApi = ({
  actionId,
  item,
  handleDeleteJsonApi,
  handleChange,
  handleAddHeaderItem,
  handleChangeHeaderItem,
  handleDeleteHeaderItem,
  handleAddBodyItem,
  handleChangeBodyItem,
  handleDeleteBodyItem,
}) => {
  const dense = false;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [response, setResponse] = useState();

  const handleTestApi = async (e) => {
    setResponse('');
    e.preventDefault();
    const headerObj = {};
    const body = {};
    item.api.headers.forEach((el) => {
      headerObj[el.title] = el.value;
    });
    item.api.body.forEach((el) => {
      body[el.title] = el.value;
    });
    try {
      const res = await axios({
        method: item.api.method,
        url: item.api.url || '',
        headers: headerObj,
        data: body,
      });
      setResponse(res.data);
    } catch (error) {
      enqueueSnackbar('There is some error happen. Try it again', {
        variant: 'error',
      });
    }
  };
  return (
    <div>
      <Box display="flex" mb={1}>
        <Box display="flex" flexGrow={1}>
          <Box display="flex">
            <Box mr={0.5}>
              <VpnLockIcon />
            </Box>
            <Box ml={0.5}>
              <Typography variant="button" display="block" gutterBottom>
                Json Api
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteJsonApi(actionId)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box mb={2}>
        <Typography display="block" gutterBottom>
          Create integrations with your own server or other 3rd party systems.
        </Typography>
        {/* <Typography display="block" gutterBottom>
        Hint: Use syntax {`{para_name}`} to show value of parameter.
      </Typography> */}
      </Box>
      <TextField
        fullWidth
        size="large"
        className={classes.margin}
        variant="outlined"
        defaultValue="Enter url"
        name="url"
        value={item.api.url}
        onChange={(e) => handleChange(actionId, 'url', e.target.value)}
        InputProps={{
          startAdornment: (
            <Box>
              <FormControl className={classes.formControl}>
                <Select
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={item.api.method}
                  onChange={(e) =>
                    handleChange(actionId, 'method', e.target.value)
                  }
                  name="method"
                >
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                </Select>
              </FormControl>
              <Divider className={classes.divider} orientation="vertical" />
            </Box>
          ),
          endAdornment: (
            <Button color="primary" onClick={handleTestApi}>
              Test
            </Button>
          ),
        }}
      />
      <Box mt={2}>
        <Typography display="block" gutterBottom>
          API Headers
        </Typography>
        <List dense={dense}>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                {textDefault.TITLE}
              </Grid>
              <Grid item xs={5}>
                {textDefault.ACTIONS.VALUE}
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </ListItem>
        </List>
        <List dense={dense}>
          {item &&
            item.api &&
            item.api.headers &&
            item.api.headers.map((el, index) => (
              <ListItem key={index}>
                <Grid container spacing={3}>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      className={classes.input}
                      value={el.title}
                      onChange={(e) =>
                        handleChangeHeaderItem(
                          actionId,
                          index,
                          'title',
                          e.target.value,
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      className={classes.input}
                      value={el.value}
                      onChange={(e) =>
                        handleChangeHeaderItem(
                          actionId,
                          index,
                          'value',
                          e.target.value,
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => handleDeleteHeaderItem(actionId, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
        </List>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleAddHeaderItem(actionId)}
          className={classes.btnAdd}
        >
          <AddIcon />
        </Button>
      </Box>
      <Box mt={3}>
        <Typography display="block" gutterBottom>
          API Body
        </Typography>
        <List dense={dense}>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                {textDefault.TITLE}
              </Grid>
              <Grid item xs={5}>
                {textDefault.ACTIONS.VALUE}
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </ListItem>
        </List>
        <List dense={dense}>
          {item &&
            item.api &&
            item.api.body &&
            item.api.body.map((el, index) => (
              <ListItem key={index}>
                <Grid container spacing={3}>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      className={classes.input}
                      value={el.title}
                      onChange={(e) =>
                        handleChangeBodyItem(
                          actionId,
                          index,
                          'title',
                          e.target.value,
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      className={classes.input}
                      value={el.value}
                      onChange={(e) =>
                        handleChangeBodyItem(
                          actionId,
                          index,
                          'value',
                          e.target.value,
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => handleDeleteBodyItem(actionId, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
        </List>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleAddBodyItem(actionId)}
          className={classes.btnAdd}
        >
          <AddIcon />
        </Button>
      </Box>
      <Box mt={3}>
        <Typography display="block" gutterBottom>
          Response
        </Typography>
        {response && (
          <div className={classes.responseBox}>
            <pre className={classes.preBox}>
              {format(JSON.stringify(response))}
            </pre>
          </div>
        )}
      </Box>
      <Box>
        <Typography
          display="block"
          gutterBottom
          className={classes.responseHint}
        >
          Set the value of the parameter corresponding to the json properties
          you want to retrieve. Note, in "Value of Properties" column, the text
          that appears in red means that the property of response json is
          invalid.
        </Typography>
        <List dense={dense}>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                {textDefault.ACTIONS.NAME_OF_SLOT}
              </Grid>
              <Grid item xs={4}>
                {textDefault.ACTIONS.VALUE_OF_PROPERTIES}
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </ListItem>
        </List>
        <List dense={dense}>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-1"
                  value={10}
                  fullWidth
                  size="medium"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-2"
                  value={10}
                  fullWidth
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Box display="flex">
                  <Box m={0.5}>
                    <Button variant="outlined" color="primary">
                      Add
                    </Button>
                  </Box>
                  <Box m={0.5}>
                    <Button variant="outlined" color="primary">
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default ActionJsonApi;
