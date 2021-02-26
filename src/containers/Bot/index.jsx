/* eslint-disable no-debugger */
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Box, Typography } from '@material-ui/core';
import { setCookie } from '../../utils/cookie';

import ListBot from './ListBot';
import CreateBotModal from './Modal';
import SearchBox from './SearchBox';
import apis from '../../apis';
import actions from '../../redux/actions';

const Bot = () => {
  // const classes = useStyles();
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const methods = useForm({
    defaultValues: {},
    mode: 'all',
  });

  const [open, setOpen] = React.useState(false);
  const [bots, setBots] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchBots = async () => {
    const { result } = await apis.bot.getBots('');
    setBots(result.bots);
  };

  useEffect(() => {
    fetchBots();
  }, []);

  const handleOnChange = async (e) => {
    const { value } = e.target;
    const { result } = await apis.bot.getBots(value);
    setBots(result.bots);
  };

  const onSubmit = async (data) => {
    const bot = {
      name: data.name,
    };
    const response = await apis.bot.createBot(bot);
    if (response && response.status === 1) {
      history.push('/');
    }
  };

  const handleOnClick = (data) => {
    setCookie('agent-id', data.id);
    dispatch(actions.bot.changeBot(data.id));
    history.push(`/agent/${data.id}/dashboard`);
  };

  return (
    <Box>
      <Typography variant="h5">CHATBOT LIST</Typography>
      <Grid container justify="space-between">
        <SearchBox handleOnChange={handleOnChange} />
        <FormProvider {...methods}>
          <CreateBotModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onSubmit={onSubmit}
            methods={methods}
          />
        </FormProvider>
      </Grid>
      <ListBot handleOnClick={handleOnClick} bots={bots} />
    </Box>
  );
};

export default Bot;
