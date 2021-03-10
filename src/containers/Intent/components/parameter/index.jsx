/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Paper,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Modal,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';
// import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import useStyles from './index.style';
import apis from '../../../../apis';

function Parameter(props) {
  const classes = useStyles();
  const methods = useFormContext();
  // const { control } = methods;
  const { intent, handleChange, handleDelete, handleAddParameter } = props;

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [entities, setEntities] = useState([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const fetchEntities = async () => {
    const { results } = await apis.entity.getEntities();
    setEntities(results.entities);
  };

  useEffect(() => {
    // fetchEntities();
  }, []);

  const handleSubmitAddParameter = async () => {
    const status = await handleAddParameter();
    if (status) {
      handleCloseModal();
    }
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h6">Parameters</Typography>
      </Grid>
      <Grid item xs={8} container justify="flex-end">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Create
        </Button>
        <Modal
          className={classes.modal}
          open={openModal}
          onClose={handleCloseModal}
          // closeAfterTransition
        >
          <div className={classes.paper}>
            <Typography variant="h6">Add parameter</Typography>

            <form onSubmit={methods.handleSubmit(handleSubmitAddParameter)}>
              <TextField
                className={classes.textFieldModal}
                name="name"
                inputRef={methods.register}
                classes={{
                  root: classes.mutiInput,
                }}
                autoFocus
                // required
                label="name"
                variant="outlined"
              />
              <br />

              <FormControl
                control={methods.control}
                name="entity"
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel>entity</InputLabel>
                <Controller
                  name="entity"
                  as={
                    <Select
                      label="entity"
                      displayEmpty
                      name="entity"
                      // value={groupSelect.name}
                      // onChange={(e) => handleChangeGroup(e)}
                    >
                      {entities &&
                        entities.map((entity) => (
                          <MenuItem name={entity.name} value={entity}>
                            {entity.name}
                          </MenuItem>
                        ))}
                    </Select>
                  }
                  control={methods.control}
                />
              </FormControl>

              <Grid container justify="flex-end" spacing={2}>
                <Grid item>
                  <Button
                    // variant="contained"
                    color="primary"
                    classes={{
                      textPrimary: classes.textPrimary,
                    }}
                    onClick={handleCloseModal}
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow className={classes.tableRowHeader}>
              <TableCell align="left" />
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Entity</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {intent &&
              intent.parameters &&
              intent.parameters.map((parameter, item) => (
                <TableRow key={parameter.name}>
                  <TableCell align="left">{item + 1}</TableCell>
                  <TableCell align="left">{parameter.name}</TableCell>
                  <TableCell align="left">{parameter.entity}</TableCell>
                  <TableCell align="left">
                    <BorderColorOutlinedIcon
                      className={classes.iconTableCell}
                      onClick={handleOpenModalEdit}
                    />
                    <DeleteOutlineOutlinedIcon
                      onClick={() => handleDelete(parameter)}
                    />
                    <Modal
                      className={classes.modal}
                      open={openModalEdit}
                      onClose={handleCloseModalEdit}
                    >
                      <div className={classes.paper}>
                        <Typography variant="h6">Edit parameter</Typography>

                        <TextField
                          name={parameter.name}
                          className={classes.textFieldModal}
                          classes={{
                            root: classes.mutiInput,
                          }}
                          autoFocus
                          // required
                          label="name"
                          variant="outlined"
                          value={parameter.calories}
                          onChange={(e) => handleChange(e, 'name')}
                        />
                        <br />
                        <FormControl
                          fullWidth
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel>entity</InputLabel>
                          <Select
                            name={parameter.name}
                            label="entity"
                            displayEmpty
                            value={parameter.name}
                            onChange={(e) => handleChange(e, 'entity')}
                          >
                            <MenuItem name="Not in group" value="number">
                              number
                            </MenuItem>
                            <MenuItem name="Not in group" value="email">
                              email
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Parameter;
