import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import useStyles from './index.style';
import textDefault from '../../../../constants/textDefault';

const DefineSynonyms = ({ items, handleChange, handleAdd, handleDelete }) => {
  const classes = useStyles();
  const dense = false;
  const [text, setText] = useState('');

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        {textDefault.ENTER_TO_INPUT_OTHER_ENTITY}
      </Typography>
      <List dense={dense} className={classes.list}>
        <ListItem>
          <ListItemText>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  id="standard-required"
                  className={classes.input}
                  fullWidth
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="primary"
                  fullWidth
                  onClick={() => handleAdd(text)}
                >
                  {textDefault.ADD}
                </Button>
              </Grid>
            </Grid>
          </ListItemText>
        </ListItem>
      </List>
      <List dense={dense} className={classes.list}>
        {items &&
          items.map((item, index) => (
            <ListItem>
              <ListItemText>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <TextField
                      id="standard-required"
                      className={classes.input}
                      fullWidth
                      value={item.text}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default DefineSynonyms;
