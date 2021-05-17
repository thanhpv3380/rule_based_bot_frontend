/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';

import CardAdvanced from './CardAdvanced';
import GeneralSetting from './GeneralSetting';
import Share from './Share';
import DeleteBot from './Delete';
import apis from '../../apis';

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const botId = useSelector((state) => state.bot.bot) || getCookie('bot-id');
  const [bot, setBot] = useState({});

  const fetchBotById = async () => {
    const data = await apis.bot.getBotById(botId);
    if (data.status) {
      setBot(data.result.bot);
    }
  };

  useEffect(() => {
    fetchBotById();
  }, [botId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <CardAdvanced title="General Setting">
          <GeneralSetting bot={bot} />
        </CardAdvanced>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <CardAdvanced title="Share" isNoneSaveBtn="true">
                <Share />
              </CardAdvanced>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <CardAdvanced title="Delete Bot" isNoneSaveBtn="true">
                <DeleteBot />
              </CardAdvanced>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;