/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@material-ui/core';
import { getCookie } from '../../utils/cookie';
import CardAdvanced from './CardAdvanced';
import GeneralSetting from './GeneralSetting';
import Share from './Share';
import DeleteBot from './Delete';
import ExportAndImport from './ExportAndImport';
import apis from '../../apis';
import roleConstant from '../../constants/role';
import actions from '../../redux/actions';

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const botId = useSelector((state) => state.bot.bot) || getCookie('bot-id');
  const role = useSelector((state) => state.bot.role);
  const [bot, setBot] = useState({});
  const fetchBotById = async () => {
    const data = await apis.bot.getBotById(botId);
    if (data && data.status) {
      setBot(data.result.bot);
    }
  };

  useEffect(() => {
    fetchBotById();
    if (!role) {
      dispatch(actions.bot.getRole(botId));
    }
  }, [botId]);

  const handleChangeBotInfo = (name, value) => {
    setBot({
      ...bot,
      [name]: value,
    });
  };

  const handleSaveBot = async () => {
    if (!bot || bot.name.trim().length <= 0) {
      enqueueSnackbar('Name must have value', { variant: 'error' });
      return;
    }
    const botData = {
      name: bot.name,
      description: bot.description,
      imageUrl: bot.imageUrl,
    };
    const data = await apis.bot.updateBot(botId, { ...botData });
    if (data && data.status) {
      enqueueSnackbar('Update bot success', { variant: 'success' });
    } else {
      enqueueSnackbar('Update bot failed', { variant: 'error' });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <CardAdvanced title="General Setting" handleSave={handleSaveBot}>
          <GeneralSetting bot={bot} handleChangeBotInfo={handleChangeBotInfo} />
        </CardAdvanced>
        <CardAdvanced title="Export and Import" isNoneSaveBtn="false">
          <ExportAndImport />
        </CardAdvanced>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <CardAdvanced title="Share" isNoneSaveBtn="true">
                <Share role={role} />
              </CardAdvanced>
            </Box>
          </Grid>
          {role === roleConstant.ROLE_OWNER && (
            <Grid item xs={12} sm={12} md={12}>
              <Box>
                <CardAdvanced title="Delete Bot" isNoneSaveBtn="true">
                  <DeleteBot bot={bot} />
                </CardAdvanced>
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
