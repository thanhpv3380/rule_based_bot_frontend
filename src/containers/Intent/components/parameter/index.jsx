/* eslint-disable react/no-array-index-key */
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
} from '@material-ui/core';
import TableRowComponent from './TableRow';
import useStyles from './index.style';
import apis from '../../../../apis';

function Parameter(props) {
  const classes = useStyles();
  const {
    intent,
    actions,
    handleDelete,
    handleChangeCheckBox,
    handleAcceptEdit,
    handleAcceptAddParameter,
  } = props;

  const [entities, setEntities] = useState([]);
  const [isCreate, setIsCreate] = useState(false);

  const handleCloseCreate = () => {
    setIsCreate(false);
  };

  const fetchEntities = async () => {
    const data = await apis.entity.getEntities();
    if (data.status) {
      setEntities(data.result.entities);
    }
  };

  const handleAcceptAdd = (data) => {
    handleAcceptAddParameter(data);
    setIsCreate(false);
  };

  useEffect(() => {
    fetchEntities();
  }, []);

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
            {intent.parameters &&
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
