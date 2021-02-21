import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Modal,
  Button,
} from '@material-ui/core';

import ListBot from './ListBot';
import CreateBotModal from './Modal';
import SearchBox from './SearchBox';
import apis from '../../apis';
function Bot() {
  // const classes = useStyles();
  // const { t } = useTranslation();
  const history = useHistory();
  const methods = useForm({
    defaultValues: {},
    mode: "all",
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
    const { result } = await apis.bot.getbots("");
    console.log(result.bots);
    setBots(result.bots);
  };

  React.useEffect(() => {
    fetchBots();
  }, []);

  const handleOnChange = async (e) => {
    const { value } = e.target;
    const { result } = await apis.bot.getbots(value);
    setBots(result.bots);
  }
  const onSubmit = async (data) => {
    const bot = {
      name: data.name
    } 
    const response = await apis.bot.createBot(bot);
    if(response.status === 1) {
      history.push('/');
    }
  };

  return (
    <Box>
      <Typography variant="h5">CHATBOT LIST</Typography>
      <Grid container justify="space-between">
        <SearchBox handleOnChange={handleOnChange}/>
        {/* <FormProvider {...methods}> */}
          <CreateBotModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onSubmit={onSubmit}
            methods={methods}
          />
        {/* </FormProvider> */}
      </Grid>
      <ListBot bots={bots}/>
    </Box>
  );
}

export default Bot;
