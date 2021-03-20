/* eslint-disable react/jsx-boolean-value */
import React, { useEffect, useState } from 'react';
import { Modal, Typography, TextField, Button, Box } from '@material-ui/core';
import useStyles from './index.style';

function DictionaryAction({
  openModal,
  handleToggleModal,
  dictionaryUpdate,
  handleAction,
}) {
  const classes = useStyles();
  const [dictionary, setDictionary] = useState({
    id: null,
    acronym: '',
    original: '',
  });

  const handleChange = (e) => {
    setDictionary({
      ...dictionary,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrevAction = async () => {
    await handleAction(dictionary);
    setDictionary({
      id: null,
      acronym: '',
      original: '',
    });
  };

  useEffect(() => {
    if (dictionaryUpdate) {
      setDictionary({ ...dictionaryUpdate });
    }
  }, [dictionaryUpdate]);

  return (
    <Modal
      open={openModal}
      onClose={handleToggleModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Add Acronym
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Words will be converted to lowercase
        </Typography>
        <TextField
          id="standard-password-input"
          label="Acronym"
          fullWidth
          required
          className={classes.input}
          name="acronym"
          value={dictionary.acronym}
          onChange={handleChange}
          disabled={dictionary.id}
        />
        <TextField
          id="standard-read-only-input"
          label="Original word"
          fullWidth
          required
          name="original"
          value={dictionary.original}
          onChange={handleChange}
        />
        <div className={classes.btnBox}>
          <Box display="flex" justifyContent="flex-end">
            <Button color="primary" onClick={handleToggleModal}>
              Cancel
            </Button>
            <Button color="primary" onClick={handlePrevAction}>
              {dictionary.id ? 'Update' : 'Create'}
            </Button>
          </Box>
        </div>
      </div>
    </Modal>
  );
}

export default DictionaryAction;
