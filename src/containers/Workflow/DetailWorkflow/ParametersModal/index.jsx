import React, { useState, useEffect } from 'react';
import {
  Modal,
  TextField,
  Box,
  Typography,
  Button,
  InputAdornment,
  List,
  Grid,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TablePagination,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import textDefault from '../../../../constants/textDefault';
import MenuToggle from '../../../../components/MenuToggle';

const Parameters = ({ handleCloseModal, open }) => {
  const classes = useStyles();
  const dense = false;
  const [parameters, setParameters] = useState([]);
  const [editParameterId, setEditParameterId] = useState();
  const [isAdd, setIsAdd] = useState(false);
  const [parameterData, setParameterData] = useState();

  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    count: 100,
  });

  const handleChangePage = (event, newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      ...pagination,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const fetchParameters = () => {
    setParameters([
      {
        id: '1',
        name: 'test',
        dataType: 'Number',
        value: '',
      },
    ]);
  };

  useEffect(() => {
    fetchParameters();
  }, []);

  const handleOpenAddParameter = () => {
    setEditParameterId(null);
    setIsAdd(true);
  };

  const handleCancelAdd = () => {
    setEditParameterId(null);
    setParameterData(null);
    setIsAdd(false);
  };

  const handleOpenEdit = (e, id) => {
    const tempParameter = parameters.find((el) => el.id === id);
    setIsAdd(false);
    setParameterData(tempParameter);
    setEditParameterId(id);
  };

  const handleChange = (e) => {
    setParameterData({
      ...parameterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteParameter = (e, id) => {
    console.log(id);
  };

  const handleSaveParameter = (e) => {
    e.preventDefault();
    const { name, dataType } = parameterData;
    setEditParameterId(null);
    setParameterData(null);
    console.log({ name, dataType });
  };

  const handleAddParameter = (e) => {
    e.preventDefault();
    const { name, dataType } = parameterData;
    setEditParameterId(null);
    setParameterData(null);
    setIsAdd(false);
    console.log({ name, dataType });
  };

  const itemMenus = [
    {
      heading: 'Edit',
      event: handleOpenEdit,
    },
    {
      heading: 'Delete',
      event: handleDeleteParameter,
      // isHidden: groupItem.children.length > 0,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Parameters
          </Typography>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            size="large"
            placeholder="Search Parameter"
            name="search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <List dense={dense}>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                {textDefault.NAME_OF_SLOT}
              </Grid>
              <Grid item xs={3}>
                {textDefault.DATA_TYPE}
              </Grid>
              <Grid item xs={3}>
                {textDefault.VALUE}
              </Grid>
              <Grid item xs={3} />
            </Grid>
          </ListItem>
        </List>
        <List dense={dense}>
          {parameters.map((el) => (
            <ListItem>
              {el.id === editParameterId ? (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <TextField
                        className={classes.input}
                        name="name"
                        value={parameterData && parameterData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        className={classes.input}
                        name="dataType"
                        value={parameterData && parameterData.dataType}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={3}>
                      <Box display="flex">
                        <Box m={0.5}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleSaveParameter}
                          >
                            Save
                          </Button>
                        </Box>
                        <Box m={0.5}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleCancelAdd}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <ListItemText>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        {el.name}
                      </Grid>
                      <Grid item xs={3}>
                        {el.dataType}
                      </Grid>
                      <Grid item xs={3}>
                        {el.value}
                      </Grid>
                      <Grid item xs={3} />
                    </Grid>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <MenuToggle
                      id={el.id}
                      icon={<MoreVertIcon />}
                      menus={itemMenus}
                    />
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
          {isAdd && (
            <ListItem>
              <ListItemText>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <TextField
                      className={classes.input}
                      name="name"
                      value={parameterData && parameterData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      className={classes.input}
                      name="dataType"
                      value={parameterData && parameterData.dataType}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3} />
                  <Grid item xs={3}>
                    <Box display="flex">
                      <Box m={0.5}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleAddParameter}
                        >
                          Add
                        </Button>
                      </Box>
                      <Box m={0.5}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleCancelAdd}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          )}
        </List>
        {!isAdd && (
          <Button
            fullWidth
            color="primary"
            className={classes.btnAdd}
            onClick={handleOpenAddParameter}
          >
            <AddIcon />
          </Button>
        )}
        {parameters.length < pagination.count && (
          <TablePagination
            component="div"
            rowsPerPageOptions={[5]}
            count={pagination.count}
            page={pagination.page}
            onChangePage={handleChangePage}
            rowsPerPage={pagination.rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}

        <Box textAlign="right">
          <Button size="large" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default Parameters;
