import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
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
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import slotTypeConstant from '../../../../constants/slotType';
import MenuToggle from '../../../../components/MenuToggle';
import apis from '../../../../apis';

const listDataType = [
  {
    heading: 'TEXT',
    value: 1,
  },
  {
    heading: 'BOOLEAN',
    value: 2,
  },
  {
    heading: 'FLOAT',
    value: 3,
  },
  {
    heading: 'CATEGORY',
    value: 4,
  },
  {
    heading: 'LIST',
    value: 5,
  },
  {
    heading: 'UNFEATURIZED',
    value: 6,
  },
];

let listParameter = [];

const Parameters = ({ handleCloseModal, open }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dense = false;
  const { enqueueSnackbar } = useSnackbar();

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

  const fetchParameters = async () => {
    const data = await apis.slot.getSlots();
    if (data && data.status) {
      setParameters(data.result.slots);
      listParameter = data.result.slots;
      setPagination({
        ...pagination,
        count: data.result.slots.length,
      });
    } else {
      enqueueSnackbar(t('fetch_data_failed'), {
        variant: 'success',
      });
    }
  };

  useEffect(() => {
    fetchParameters();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;

    const tempParameters = listParameter.filter((el) => {
      const name = el.name.trim().toLowerCase();
      return name.indexOf(value.trim().toLowerCase()) >= 0;
    });
    setParameters(tempParameters);
    setPagination({
      ...pagination,
      page: 0,
      count: tempParameters.length,
    });
  };

  const handleOpenAddParameter = () => {
    setEditParameterId(null);
    setParameterData({
      dataType: 1,
    });
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

  const handleDeleteParameter = async (e, id) => {
    const data = await apis.slot.deleteSlot(id);
    if (data && data.status) {
      const newParameters = [...parameters];
      const tempParameters = newParameters.filter((el) => el.id !== id);
      setParameters(tempParameters);
      listParameter = tempParameters;
      setPagination({
        ...pagination,
        count: pagination.count - 1,
      });
    } else {
      enqueueSnackbar(t('delete_parameter_failed'), {
        variant: 'error',
      });
    }
  };

  const handleSaveParameter = async (e) => {
    e.preventDefault();
    const { id, name, dataType, slotType } = parameterData;

    const data = await apis.slot.updateSlot(id, {
      name,
      dataType,
      customData: { values: [], conditions: [] },
      slotType,
    });
    if (data && data.status) {
      const { slot } = data.result;
      const newParameters = [...parameters];
      const pos = newParameters.findIndex((el) => el.id === slot.id);
      newParameters[pos] = { ...slot };
      setParameters(newParameters);
      listParameter = newParameters;
      setEditParameterId(null);
      setParameterData(null);
    } else {
      enqueueSnackbar(t('update_parameter_failed'), {
        variant: 'error',
      });
    }
  };

  const handleAddParameter = async (e) => {
    e.preventDefault();
    const { name, dataType } = parameterData;
    const data = await apis.slot.createSlot({
      name,
      dataType,
      customData: { values: [], conditions: [] },
      slotType: slotTypeConstant.NOT_DEFAULT,
    });
    if (data && data.status) {
      const { slot } = data.result;
      const newParameters = [...parameters];
      newParameters.push(slot);
      setParameters(newParameters);
      listParameter = newParameters;
      setPagination({
        ...pagination,
        count: pagination.count + 1,
      });
      setEditParameterId(null);
      setParameterData(null);
      setIsAdd(false);
    } else {
      enqueueSnackbar(t('create_parameter_failed'), {
        variant: 'error',
      });
    }
  };

  const itemMenus = [
    {
      heading: t('edit'),
      event: handleOpenEdit,
    },
    {
      heading: t('delete'),
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
            {t('parameters')}
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
            onChange={handleSearch}
          />
        </Box>
        <List dense={dense}>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                {t('name_of_slot')}
              </Grid>
              <Grid item xs={3}>
                {t('data_type')}
              </Grid>
              <Grid item xs={3}>
                {t('value')}
              </Grid>
              <Grid item xs={3} />
            </Grid>
          </ListItem>
        </List>
        <List dense={dense}>
          {parameters
            .slice(
              pagination.page * pagination.rowsPerPage,
              (pagination.page + 1) * pagination.rowsPerPage,
            )
            .map((el) => (
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
                        <Select
                          labelId="demo-simple-select-label"
                          name="dataType"
                          fullWidth
                          value={(parameterData && parameterData.dataType) || 1}
                          onChange={handleChange}
                        >
                          {listDataType.map((ele) => (
                            <MenuItem key={ele.value} value={ele.value}>
                              {ele.heading}
                            </MenuItem>
                          ))}
                        </Select>
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
                              {t('save')}
                            </Button>
                          </Box>
                          <Box m={0.5}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={handleCancelAdd}
                            >
                              {t('cancel')}
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
                          {listDataType[(el.dataType || 1) - 1].heading}
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
                    <Select
                      labelId="demo-simple-select-label"
                      name="dataType"
                      fullWidth
                      value={(parameterData && parameterData.dataType) || 1}
                      onChange={handleChange}
                    >
                      {listDataType.map((ele) => (
                        <MenuItem key={ele.value} value={ele.value}>
                          {ele.heading}
                        </MenuItem>
                      ))}
                    </Select>
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
                          {t('add')}
                        </Button>
                      </Box>
                      <Box m={0.5}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleCancelAdd}
                        >
                          {t('cancel')}
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
        {parameters.length > pagination.rowsPerPage && (
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
            {t('cancel')}
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default Parameters;
