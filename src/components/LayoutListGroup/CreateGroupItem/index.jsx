import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  TextField,
  IconButton,
} from '@material-ui/core';
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons';
import useStyles from './index.style';

const GroupItem = ({ handleCreateGroup, handleToggleCreateGroup }) => {
  const classes = useStyles();
  const [nameGroup, setNameGroup] = useState('');
  return (
    <div className={classes.root}>
      <Accordion expanded={false}>
        <AccordionSummary
          classes={{
            expanded: classes.container,
          }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Name Group"
            size="small"
            value={nameGroup}
            onChange={(e) => setNameGroup(e.target.value)}
          />
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => handleCreateGroup(nameGroup)}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={handleToggleCreateGroup}
          >
            <CloseIcon />
          </IconButton>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};

export default GroupItem;
