import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography } from '@material-ui/core';
import { getCookie, setCookie } from '../../utils/cookie';

import ListBot from './ListBot';
import CreateBotModal from './Modal';
import SearchBox from '../../components/SearchBox';
import apis from '../../apis';
import actions from '../../redux/actions';
import { text } from '../../enums';

function Bot() {
  // const classes = useStyles();
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!accessToken) {
      const accessTokenFromCookie = getCookie('accessToken');
      if (accessTokenFromCookie) {
        dispatch(actions.auth.verifyToken(accessTokenFromCookie));
      }
    }
  }, []);
  const history = useHistory();
  const methods = useForm({
    defaultValues: {},
    mode: 'all',
  });

  const [open, setOpen] = React.useState(false);
  const [bots, setBots] = React.useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchBots = async () => {
    const { result } = await apis.bot.getbots('', accessToken);
    setBots(result.bots);
  };

  useEffect(() => {
    fetchBots();
  }, []);

  const handleOnChange = async (e) => {
    const { value } = e.target;
    const { result } = await apis.bot.getbots(value, accessToken);
    setBots(result.bots);
  };
  const onSubmit = async (data) => {
    const bot = {
      name: data.name,
    };
    const response = await apis.bot.createBot(bot, accessToken);
    if (response && response.status === 1) {
      history.push('/');
    }
  };

  const handleOnClick = (data) => {
    setCookie('agent-id', data.id);
    history.push('/');
  };

  return (
    <Box>
      <Typography variant="h5">CHATBOT LIST</Typography>
      <Grid container justify="space-between">
        <Grid item xs={6}>
          <SearchBox
            handleOnChange={handleOnChange}
            placeholder={text.SEARCH}
            isStartPositionIcon
          />
        </Grid>
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
}

export default Bot;
