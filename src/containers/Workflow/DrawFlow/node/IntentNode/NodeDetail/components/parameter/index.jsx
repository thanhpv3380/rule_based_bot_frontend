/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import TableRowComponent from "./TableRow";
import useStyles from "./index.style";

const parameters = [
  {
    required: false,
    openModal: false,
    isEdit: true,
    parameterName: "bank_name",
    entity: {
      name: "@sys.bank.vi",
    },
    response: {},
  },
  {
    required: false,
    openModal: false,
    isEdit: true,
    parameterName: "bank_name",
    entity: {
      name: "@sys.bank.vi",
    },
    response: {},
  },
];

function Parameter(props) {
  const classes = useStyles();
  const { setOpen } = props;

  const [entities, setEntities] = useState([]);
  const [isCreate, setIsCreate] = useState(false);

  const handleCloseCreate = () => {
    setIsCreate(false);
  };

  // const handleAcceptAdd = async (data) => {
  //   const status = await handleAcceptAddParameter(data);
  //   if (status) {
  //     setIsCreate(false);
  //   }
  //   return status;
  // };

  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h6">Parameters</Typography>
      </Grid>
      <Grid item xs={8} container justify="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsCreate(true);
          }}
          disabled={isCreate}
        >
          Create
        </Button>
      </Grid>
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Required</TableCell>
              <TableCell align="left">Parameter name</TableCell>
              <TableCell align="left">Entity</TableCell>
              <TableCell align="center">Response</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {intent.parameters &&
              intent.parameters.map((parameter, position) => (
                <TableRowComponent
                  key={position}
                  position={position}
                  actions={actions}
                  entities={entities}
                  parameterData={parameter}
                  handleDelete={handleDelete}
                  handleChangeCheckBox={handleChangeCheckBox}
                  handleAccept={handleAcceptEdit}
                />
              ))} */}
            {parameters.map((parameter, position) => (
              <TableRowComponent
                setOpen={setOpen}
                key={position}
                position={position}
                parameterData={parameter}
              />
            ))}
            {isCreate && (
              <TableRowComponent
                actions={actions}
                entities={entities}
                handleDelete={handleDelete}
                handleCloseEdit={handleCloseCreate}
                handleAccept={handleAcceptAdd}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Parameter;
