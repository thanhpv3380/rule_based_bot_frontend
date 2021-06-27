/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  TextField,
  Button,
  Chip,
  IconButton,
  Box,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import useStyles from './index.style';

const DefineSynonyms = ({ items, handleChange, handleAdd, handleDelete }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dense = false;
  const [output, setOutput] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [input, setInput] = useState([]);
  const [rowEdit, setRowEdit] = useState();
  const [outputEdit, setOutputEdit] = useState('');
  const [currentInputEdit, setCurrentInputEdit] = useState('');
  const [inputEdit, setInputEdit] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setInput([...input, currentInput]);
      setCurrentInput('');
    }
  };

  const handleKeyPressEdit = (e) => {
    if (e.key === 'Enter') {
      setInputEdit([...inputEdit, currentInputEdit]);
      setCurrentInputEdit('');
    }
  };
  const handleAddSynonym = (e) => {
    e.preventDefault();
    handleAdd({ output, input: [...input] });
    setOutput('');
    setInput([]);
    setCurrentInput('');
  };

  const handleChangeSynonym = (index) => {
    handleChange(index, { output: outputEdit, input: [...inputEdit] });
    setOutputEdit('');
    setInputEdit([]);
    setCurrentInputEdit('');
    setRowEdit();
  };

  const handleDeleteSynonymInput = (pos) => {
    setInput([...input.slice(0, pos), ...input.slice(pos + 1, input.length)]);
  };

  const handleDeleteSynonymInputEdit = (pos) => {
    setInputEdit([
      ...inputEdit.slice(0, pos),
      ...inputEdit.slice(pos + 1, inputEdit.length),
    ]);
  };

  const handleClickRow = (pos) => {
    setOutputEdit(items[pos].output);
    setInputEdit([...items[pos].input]);
    setCurrentInputEdit('');
    setRowEdit(pos);
  };

  const handleFocus = () => {
    setRowEdit();
  };

  return (
    <div className={classes.root}>
      <List dense={dense} className={classes.list}>
        <ListItem>
          <ListItemText>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  id="standard-required"
                  className={classes.input}
                  placeholder={t('enter_value')}
                  value={output}
                  onFocus={handleFocus}
                  onChange={(e) => setOutput(e.target.value)}
                />
              </Grid>
              <Grid item xs={7}>
                <Box display="flex">
                  {input.map((el, index) => (
                    <Chip
                      size="small"
                      label={el}
                      onDelete={() => handleDeleteSynonymInput(index)}
                    />
                  ))}
                  <TextField
                    id="standard-required"
                    className={classes.input}
                    placeholder={t('enter_synonyms')}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={handleFocus}
                  />
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Button color="primary" fullWidth onClick={handleAddSynonym}>
                  {t('add')}
                </Button>
              </Grid>
            </Grid>
          </ListItemText>
        </ListItem>
      </List>
      <List dense={dense} className={classes.list}>
        {items.map((item, index) =>
          index !== rowEdit ? (
            <ListItem>
              <ListItemText>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <span onClick={() => handleClickRow(index)}>
                      {item.output}
                    </span>
                  </Grid>
                  <Grid item xs={7}>
                    {item.input &&
                      item.input.map((el, ind) => (
                        <span onClick={() => handleClickRow(index)}>
                          {el}
                          {ind !== item.input.length - 1 && ', '}
                        </span>
                      ))}
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          ) : (
            <ListItem>
              <ListItemText>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      id="standard-required"
                      className={classes.input}
                      placeholder={t('enter_value')}
                      value={outputEdit}
                      onChange={(e) => setOutputEdit(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Box display="flex">
                      {inputEdit.map((elEdit, ind) => (
                        <Chip
                          size="small"
                          color="primary"
                          label={elEdit}
                          onDelete={() => handleDeleteSynonymInputEdit(ind)}
                        />
                      ))}
                      <TextField
                        id="standard-required"
                        className={classes.input}
                        placeholder={t('enter_synonyms')}
                        value={currentInputEdit}
                        onChange={(e) => setCurrentInputEdit(e.target.value)}
                        onKeyPress={handleKeyPressEdit}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      color="primary"
                      fullWidth
                      onClick={() => handleChangeSynonym(index)}
                    >
                      {t('edit')}
                    </Button>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          ),
        )}
      </List>
    </div>
  );
};

export default DefineSynonyms;
