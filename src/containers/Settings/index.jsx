/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@material-ui/core';
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
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const role = useSelector((state) => state.bot.role);
  const botData = useSelector((state) => state.bot.bot);
  const [bot, setBot] = useState({ ...botData });

  const handleChangeBotInfo = (name, value) => {
    setBot({
      ...bot,
      [name]: value,
    });
  };

  const handleSaveBot = async () => {
    if (!bot || bot.name.trim().length <= 0) {
      enqueueSnackbar(t('name_must_have_value'), { variant: 'error' });
      return;
    }
    const botDataSave = {
      name: bot.name,
      description: bot.description,
      imageUrl: bot.imageUrl,
    };
    const data = await apis.bot.updateBot(bot.id, { ...botDataSave });
    if (data && data.status) {
      const newBot = data.result.bot;
      dispatch(actions.bot.updateBot({ ...newBot }));
      enqueueSnackbar(t('update_bot_success'), { variant: 'success' });
    } else {
      enqueueSnackbar('update_bot_failed', { variant: 'error' });
    }
  };
  if (!bot) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <CardAdvanced title={t('general_setting')} handleSave={handleSaveBot}>
          <GeneralSetting bot={bot} handleChangeBotInfo={handleChangeBotInfo} />
        </CardAdvanced>
        <CardAdvanced title={t('export_and_import')} isNoneSaveBtn="false">
          <ExportAndImport />
        </CardAdvanced>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <CardAdvanced title={t('share')} isNoneSaveBtn="true">
                <Share role={role} botId={bot.id} />
              </CardAdvanced>
            </Box>
          </Grid>
          {role === roleConstant.ROLE_OWNER && (
            <Grid item xs={12} sm={12} md={12}>
              <Box>
                <CardAdvanced title={t('delete_bot')} isNoneSaveBtn="true">
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
