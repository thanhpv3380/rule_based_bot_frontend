import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  TextField,
  Button,
  Chip,
} from '@material-ui/core';
import useStyles from './index.style';
import textDefault from '../../../../constants/textDefault';

const DefineSynonyms = ({ items, handleChange, handleAdd, handleDelete }) => {
  const classes = useStyles();
  const dense = false;
  const [output, setOutput] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [input, setInput] = useState([]);

  console.log(items);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setInput([...input, currentInput]);
      setCurrentInput('');
    }
  };

  const handleAddSynonym = (e) => {
    e.preventDefault();
    handleAdd({ output, input: [...input] });
    setOutput('');
    setInput([]);
    setCurrentInput('');
  };

  const handleDeleteSynonymInput = (pos) => {
    setInput([...input.slice(0, pos), ...input.slice(pos + 1, input.length)]);
  };

  return (
    <div className={classes.root}>
      <List dense={dense} className={classes.list}>
        <ListItem>
          <ListItemText>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  id="standard-required"
                  className={classes.input}
                  placeholder={textDefault.ENTER_VALUE}
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                {input.map((el, index) => (
                  <Chip
                    variant="outlined"
                    size="small"
                    label={el}
                    onDelete={() => handleDeleteSynonymInput(index)}
                  />
                ))}
                <TextField
                  id="standard-required"
                  className={classes.input}
                  placeholder={textDefault.ENTER_SYNONYMS}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              <Grid item xs={2}>
                <Button color="primary" fullWidth onClick={handleAddSynonym}>
                  {textDefault.ADD}
                </Button>
              </Grid>
            </Grid>
          </ListItemText>
        </ListItem>
      </List>
      <List dense={dense} className={classes.list}>
        {items.map((item) => (
          <ListItem>
            <ListItemText>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <TextField
                    id="standard-required"
                    className={classes.input}
                    placeholder={textDefault.ENTER_VALUE}
                    value={item.output}
                  />
                </Grid>
                <Grid item xs={5}>
                  {item.input && item.input.map((el) => <span>{el}, </span>)}
                </Grid>
                <Grid item xs={2}>
                  <Button color="primary" fullWidth onClick={handleAddSynonym}>
                    {textDefault.ADD}
                  </Button>
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
