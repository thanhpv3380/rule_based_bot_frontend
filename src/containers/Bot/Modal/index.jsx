import React from 'react';
import { Grid, Typography, Modal, TextField, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import useStyles from './index.style';

function CreateBotModal(props) {
  const classes = useStyles();
  //   const methods = useFormContext();
  const { handleOpen, handleClose, open, onSubmit, methods } = props;
  return (
    <Grid item>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        classes={{
          containedPrimary: classes.containedPrimary,
          root: classes.buttonRoot,
        }}
      >
        {' '}
        <AddCircleOutlineIcon fontSize="small" />{' '}
        <Typography variant="h7"> &nbsp;create bot</Typography>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        // closeAfterTransition
      >
        <div className={classes.paper}>
          <Typography variant="h6">Create bot</Typography>

          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TextField
              style={{
                width: '100%',
                marginTop: '4%',
                borderRadius: 10,
              }}
              name="name"
              inputRef={methods.register}
              classes={{
                root: classes.mutiInput,
              }}
              autoFocus
              required
              id="outlined-required"
              label="name"
              variant="outlined"
            />
            <Grid
              style={{ marginTop: '1%' }}
              container
              justify="flex-end"
              spacing={2}
            >
              <Grid item>
                <Button
                  // variant="contained"
                  color="primary"
                  classes={{
                    textPrimary: classes.textPrimary,
                  }}
                  onClick={handleClose}
                >
                  cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  classes={{
                    containedPrimary: classes.containedPrimary,
                    root: classes.buttonRoot,
                  }}
                  type="submit"
                >
                  save
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </Grid>
  );
}

export default CreateBotModal;
