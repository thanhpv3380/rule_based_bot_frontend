import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Grid,
  TablePagination,
  Typography,
  Collapse,
  IconButton,
  FormControlLabel,
  Paper,
  Checkbox,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { subDays } from 'date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Image as ImageIcon, ExpandLess, ExpandMore } from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../apis';

const History = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [conversations, setConversations] = useState([]);
  const { id } = useParams();
  const [dateSelected, setDateSelected] = useState({
    startDate: subDays(new Date(), 7),
    endDate: new Date(),
  });
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    count: 100,
  });

  const handleChangePage = async (event, newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  const handleOpenFilter = () => {
    setOpen(!open);
  };

  const fetchConversations = async () => {
    const data = await apis.conversation.getAllConversationByBotId();
    if (data && data.status) {
      setConversations(data.result.conversations);
    } else {
      enqueueSnackbar((data && data.message) || 'Fetch data failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleOpenChat = (conversationsId) => {
    history.push(`/bot/${id}/history/${conversationsId}`);
  };

  return (
    <>
      <Box className={classes.card}>
        <Grid
          className={classes.cardHeader}
          style={{
            backgroundColor: 'rgb(73, 145, 226)',
          }}
        >
          <Box className={classes.header}>
            <Typography variant="h5">Conversation</Typography>
            <Box className={classes.rightHeader}>
              <Box className={classes.dateRangePicker}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    open={openStartDate}
                    onClick={() => setOpenStartDate(true)}
                    onClose={() => setOpenStartDate(false)}
                    maxDate={new Date()}
                    className={classes.dateStart}
                    margin="normal"
                    format="MM/dd/yyyy"
                    value={dateSelected.startDate}
                    onChange={(date) => {
                      setDateSelected({
                        ...dateSelected,
                        startDate: date,
                      });
                    }}
                    allowKeyboardControl
                    KeyboardButtonProps={{
                      disabled: true,
                      style: { display: 'none' },
                    }}
                  />
                  <Box className={classes.dividerDateRange}>-</Box>
                  <KeyboardDatePicker
                    open={openEndDate}
                    onClick={() => setOpenEndDate(true)}
                    onClose={() => setOpenEndDate(false)}
                    maxDate={new Date()}
                    className={classes.dateEnd}
                    margin="normal"
                    format="MM/dd/yyyy"
                    value={dateSelected.endDate}
                    onChange={(date) => {
                      setDateSelected({
                        ...dateSelected,
                        endDate: date,
                      });
                    }}
                    allowKeyboardControl
                    KeyboardButtonProps={{
                      disabled: true,
                      style: { display: 'none' },
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
              <IconButton aria-label="collapse" onClick={handleOpenFilter}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Paper className={classes.collapse}>
            <FormControlLabel
              control={
                <Checkbox checked={false} name="checkedB" color="primary" />
              }
              label="Bot doesn't understand"
            />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Autocomplete
                  options={[]}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.email}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      placeholder="Intent"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={[]}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.email}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      placeholder="Action"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
        <Grid className={classes.cardBody}>
          <List>
            {conversations.map((el) => (
              <ListItem
                className={classes.row}
                onClick={() => handleOpenChat(el.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={el.sessionId} secondary={el.createdAt} />
              </ListItem>
            ))}
          </List>
          <TablePagination
            component="div"
            rowsPerPageOptions={[10]}
            count={pagination.count}
            page={pagination.page}
            onChangePage={handleChangePage}
            rowsPerPage={pagination.rowsPerPage}
          />
        </Grid>
      </Box>
    </>
  );
};
export default History;
