import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Grid,
  Button,
  Modal,
  FormControl,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Loop as LoopIcon, ExpandLess, ExpandMore } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './index.style';
import {
  ActionsResponse,
  ActionAskAgainResponse,
} from '../ActionNodeWidget.type';
import textDefault from '../../../../../../constants/textDefault';

export interface ActionAskAgainProps {
  actions: ActionsResponse[];
  actionAskAgain: ActionAskAgainResponse;
  handleChange: Function;
}

const ActionAskAgain = (props: ActionAskAgainProps) => {
  const { actions, handleChange, actionAskAgain } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box mt={2} className={classes.root}>
      <Box className={classes.buttonShow} onClick={handleToggle}>
        <Box display="flex" alignItems="center">
          <LoopIcon />
          <Typography variant="body1" className={classes.textIcon}>
            Setting ask again
          </Typography>
        </Box>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider className={classes.divider} />
        <Grid className={classes.actionAABox}>
          <FormControl fullWidth className={classes.formControl}>
            <Typography>{textDefault.ACTION_ASK_AGAIN}</Typography>

            <Autocomplete
              size="small"
              options={actions || []}
              value={actionAskAgain.actionAskAgain || null}
              onChange={(
                e: React.ChangeEvent<{}>,
                value: any,
                reason: string,
              ) => {
                handleChange('actionAskAgain', (value && value.id) || null);
              }}
              getOptionSelected={(option, value) => option.id === value.id}
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
            <Typography>{textDefault.NUMBER_OF_LOOP}</Typography>
            <TextField
              size="small"
              name="numberOfLoop"
              type="number"
              classes={{
                root: classes.mutiInput,
              }}
              variant="outlined"
              value={actionAskAgain.numberOfLoop || ''}
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
            <Typography>{textDefault.ACTION_BREAK}</Typography>
            <Autocomplete
              size="small"
              options={actions || []}
              value={actionAskAgain.actionFail || null}
              onChange={(
                e: React.ChangeEvent<{}>,
                value: any,
                reason: string,
              ) => {
                handleChange('actionFail', (value && value.id) || null);
              }}
              getOptionSelected={(option, value) => option.id === value.id}
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
