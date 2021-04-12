/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TableCell,
  TableRow,
  Modal,
  TextField,
  FormControl,
  Checkbox,
} from "@material-ui/core";
// import { useSnackbar } from 'notistack';
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteIcon from "@material-ui/icons/Delete";
// import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
// import CreateIcon from '@material-ui/icons/Create';
import EditIcon from "@material-ui/icons/Edit";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
// import SettingsIcon from '@material-ui/icons/Settings';
import useStyles from "./index.style";

function TableRowCustom(props) {
  const classes = useStyles();
  const {
    position,
    entities,
    parameterData,
    actions,
    handleDelete,
    handleChangeCheckBox,
    handleAccept,
    handleCloseEdit,
    setOpen,
  } = props;

  const parameterDefault = {
    required: false,
    openModal: false,
    isEdit: true,
    parameterName: "",
    entity: "",
    response: {},
  };

  // const { enqueueSnackbar } = useSnackbar();
  const [testOpen, setTestOpen] = useState(false);
  const [parameter, setParameter] = useState(
    parameterData
      ? { ...parameterData, openModal: false, isEdit: false }
      : parameterDefault
  );

  const [actionBreak, setActionBreak] = useState(
    parameterData
      ? parameterData.response
        ? parameterData.response.actionBreak
          ? parameterData.response.actionBreak
          : ""
        : ""
      : ""
  );
  const [actionAskAgain, setActionAskAgain] = useState(
    parameterData
      ? parameterData.response
        ? parameterData.response.actionAskAgain
          ? parameterData.response.actionAskAgain
          : ""
        : ""
      : ""
  );
  const [numberOfLoop, setNumberOfLoop] = useState(
    parameterData
      ? parameterData.response
        ? parameterData.response.numberOfLoop
          ? parameterData.response.numberOfLoop
          : 1
        : 1
      : 1
  );

  const handleClickAccept = async () => {
    const status = await handleAccept(parameter, position);
    if (status) {
      setParameter({ ...parameter, isEdit: false });
    }
  };

  const handleChangeName = (e) => {
    const { value } = e.target;
    const regex = new RegExp("^[a-zA-Z_]+$");
    if (!regex.test(value)) {
      enqueueSnackbar("Parameter name includes only letters and _", {
        variant: "error",
      });
    } else {
      const newParameter = { ...parameter };
      newParameter.parameterName = value;
      setParameter(newParameter);
    }
  };

  const handleOpenModal = () => {
    if (parameter.required) {
      const newParameter = { ...parameter };
      newParameter.openModal = true;
      setParameter(newParameter);
    } else {
      enqueueSnackbar("Parameter must be required", {
        variant: "error",
      });
    }
  };

  const handleCloseModal = () => {
    const newParameter = { ...parameter };
    setActionBreak(
      newParameter.response
        ? newParameter.response.actionBreak
          ? newParameter.response.actionBreak
          : null
        : null
    );
    setActionAskAgain(
      newParameter.response
        ? newParameter.response.actionAskAgain
          ? newParameter.response.actionAskAgain
          : null
        : null
    );
    newParameter.openModal = false;
    setParameter(newParameter);
  };

  const handleOpenEdit = () => {
    const newParameter = { ...parameter };
    newParameter.isEdit = true;
    setParameter(newParameter);
  };

  const handleClickCheckBox = () => {
    const newParameter = { ...parameter };
    newParameter.required = !parameter.required;
    setParameter(newParameter);
    if (parameterData) {
      handleChangeCheckBox(position);
    }
  };

  const handleClickCloseEdit = () => {
    if (parameterData) {
      setParameter({ ...parameterData, openModal: false, isEdit: false });
    } else {
      handleCloseEdit();
    }
  };

  const handleChangeEntity = (value) => {
    setParameter({ ...parameter, entity: value });
  };

  const handleSubmit = () => {
    const newParameter = { ...parameter };

    const newResponse = {
      numberOfLoop,
      actionAskAgain,
      actionBreak,
    };
    newParameter.response = newResponse;
    newParameter.openModal = false;
    setParameter(newParameter);
    if (parameterData) {
      handleAccept(newParameter, position);
    }
  };

  const handleNumberOfLoop = (e) => {
    const { value } = e.target;
    setNumberOfLoop(value);
  };

  return (
    <TableRow>
      <TableCell align="center">
        <Checkbox
          checked={
            parameterData
              ? parameterData.required
              : parameter && parameter.required
          }
          onChange={handleClickCheckBox}
        />
      </TableCell>

      <TableCell align="left" className={classes.tableCell}>
        {parameter && parameter.isEdit ? (
          <TextField
            onChange={handleChangeName}
            value={parameter.parameterName}
          />
        ) : (
          <Typography>{parameter && parameter.parameterName}</Typography>
        )}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {parameter && parameter.isEdit ? (
          <Autocomplete
            options={entities}
            onChange={(event, newValue) => {
              handleChangeEntity(newValue);
            }}
            getOptionLabel={(option) => option.name}
            value={parameter.entity || {}}
            renderInput={(params) => <TextField {...params} />}
          />
        ) : (
          <Typography>
            {parameter && parameter.entity && parameter.entity.name}
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        <SettingsOutlinedIcon
          // onClick={() => handleOpenModal(position)}
          onClick={() => setTestOpen(true)}
          // onClick={() => setOpen(false)}
        />
        <Modal
          className={classes.modal}
          // open={parameter && parameter.openModal}
          // onClose={() => handleCloseModal(position)}
          open={testOpen}
          onClose={() => {
            setTestOpen(false);
            // setOpen(true);
          }}
        >
          <div className={classes.paper}>
            <form onSubmit={handleSubmit}>
              <Grid>
                <Typography variant="h6">Setting response</Typography>
                <FormControl fullWidth className={classes.formControl}>
                  <Typography>Action ask again</Typography>

                  <Autocomplete
                    size="medium"
                    options={[]}
                    // getOptionSelected={(option, value) =>
                    //   option.id === value.id
                    // }
                    // getOptionLabel={(option) => option.name}
                    name="actionAskAgain"
                    onChange={(e, value) => {
                      // setActionAskAgain(value);
                    }}
                    // value={actionAskAgain || {}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        classes={{
                          root: classes.textInput,
                        }}
                      />
                    )}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Typography>Number of loop</Typography>
                  <TextField
                    // onChange={handleNumberOfLoop}
                    name="numberOfLoop"
                    type="number"
                    // defaultValue={numberOfLoop}
                    classes={{
                      root: classes.mutiInput,
                    }}
                    variant="outlined"
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <Typography>Action break</Typography>
                  <Autocomplete
                    size="medium"
                    options={[]}
                    // getOptionSelected={(option, value) =>
                    //   option.id === value.id
                    // }
                    // getOptionLabel={(option) => option.name}
                    name="actionBreak"
                    onChange={(e, value) => {
                      // setActionBreak(value);
                    }}
                    // value={actionBreak || {}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        classes={{
                          root: classes.textInput,
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid
                container
                justify="flex-end"
                className={classes.formControl}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  classes={{ containedPrimary: classes.borderRadius }}
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
            </form>
          </div>
        </Modal>
      </TableCell>

      {parameter && parameter.isEdit ? (
        <TableCell align="left">
          <DoneIcon onClick={handleClickAccept} />
          <CloseIcon
            className={classes.iconTableCell}
            onClick={handleClickCloseEdit}
          />
        </TableCell>
      ) : (
        <TableCell align="left">
          <DeleteIcon
            style={{ marginLeft: 9 }}
            onClick={() => handleDelete(position)}
          />
          <EditIcon
            className={classes.iconTableCell}
            onClick={handleOpenEdit}
          />
        </TableCell>
      )}
    </TableRow>
  );
}

export default TableRowCustom;
