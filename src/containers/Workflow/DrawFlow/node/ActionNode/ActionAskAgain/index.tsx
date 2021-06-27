import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import {
  Box,
  TextField,
  Typography,
  Grid,
  FormControl,
  Collapse,
  Divider,
} from '@material-ui/core';
import { Loop as LoopIcon, ExpandLess, ExpandMore } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './index.style';
import {
  ActionsResponse,
  ActionAskAgainResponse,
} from '../ActionNodeWidget.type';

export interface ActionAskAgainProps {
  actions: ActionsResponse[];
  actionAskAgain: ActionAskAgainResponse;
  handleChange: Function;
  handleOpenAAADetail: Function;
}

const ActionAskAgain = (props: ActionAskAgainProps) => {
  const { t } = useTranslation();
  const { actions, handleChange, actionAskAgain, handleOpenAAADetail } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const handleToggle = () => {
    setIsFirst(false);
    setOpen((prev) => !prev);
  };

  const findActionById = (actionId) => {
    if (actions) {
      const action = actions.find((el) => el.id === actionId);
      return action;
    }
    return null;
  };

  useEffect(() => {
    if (!isFirst) handleOpenAAADetail(open);
  }, [open]);

  return (
    <Box mt={2} className={classes.root}>
      <Box className={classes.buttonShow} onClick={handleToggle}>
        <Box display="flex" alignItems="center">
          <LoopIcon />
          <Typography variant="body1" className={classes.textIcon}>
            {t('setting_ask_again')}
          </Typography>
        </Box>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider className={classes.divider} />
        <Grid className={classes.actionAABox}>
          <FormControl fullWidth className={classes.formControl}>
            <Typography>{t('action_ask_again')}</Typography>

            <Autocomplete
              size="small"
              options={actions || []}
              value={
                actionAskAgain && findActionById(actionAskAgain.actionAskAgain)
              }
              onChange={(
                e: React.ChangeEvent<{}>,
                value: any,
                reason: string,
              ) => {
                handleChange('actionAskAgain', (value && value.id) || null);
              }}
              getOptionSelected={(option, value) => option.id === value}
              getOptionLabel={(option) => option.name}
              name="actionAskAgain"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  classes={{
                    root: classes.textInput,
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Typography>{t('number_of_loop')}</Typography>
            <TextField
              size="small"
              name="numberOfLoop"
              type="number"
              classes={{
                root: classes.mutiInput,
              }}
              variant="outlined"
              value={(actionAskAgain && actionAskAgain.numberOfLoop) || ''}
              onChange={(e) => {
                const { value } = e.target;
                handleChange('numberOfLoop', value);
              }}
            />
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <Typography>{t('action_break')}</Typography>
            <Autocomplete
              size="small"
              options={actions || []}
              value={
                actionAskAgain && findActionById(actionAskAgain.actionFail)
              }
              onChange={(
                e: React.ChangeEvent<{}>,
                value: any,
                reason: string,
              ) => {
                handleChange('actionFail', (value && value.id) || null);
              }}
              getOptionSelected={(option, value) => option.id === value}
              getOptionLabel={(option) => option.name}
              name="actionFail"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  classes={{
                    root: classes.textInput,
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
      </Collapse>
    </Box>
  );
};

export default ActionAskAgain;
