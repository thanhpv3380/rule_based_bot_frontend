import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Modal,
  TextField,
  Button,
  Box,
} from '@material-ui/core';
import useStyles from './index.style';

function CreateBotModal({ openModal, handleToggleModal, handleCreate }) {
  const classes = useStyles();

  const [botData, setBotData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setBotData({
      ...botData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setBotData({
      name: '',
      description: '',
    });
  }, [openModal]);

  return (
    <Grid item>
      <Modal
        open={openModal}
        onClose={handleToggleModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Create bot
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Words will be converted to lowercase
          </Typography>
          <TextField
            id="standard-password-input"
            label="Name"
            fullWidth
            required
            className={classes.input}
            name="name"
            value={botData.name}
            onChange={handleChange}
          />
          <TextField
            id="standard-password-input"
            label="Description"
            fullWidth
            required
            className={classes.input}
            name="description"
            value={botData.description}
            onChange={handleChange}
          />
          <div className={classes.btnBox}>
            <Box display="flex" justifyContent="flex-end">
              <Button color="primary" onClick={handleToggleModal}>
                Cancel
              </Button>
              <Button color="primary" onClick={() => handleCreate(botData)}>
                Save
              </Button>
            </Box>
          </div>
        </div>
      </Modal>
    </Grid>
  );
}

export default CreateBotModal;
