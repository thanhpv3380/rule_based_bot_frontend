/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Typography,
  Box,
  IconButton,
  TextField,
  Divider,
} from '@material-ui/core';
import { Delete as DeleteIcon, Mail as MailIcon } from '@material-ui/icons';
import useStyles from './index.style';

const ActionText = ({
  actionId,
  item,
  handleDeleteSendMailItem,
  handleChangeMailInfoItem,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box display="flex">
        <Box display="flex" flexGrow={1}>
          <Box display="flex">
            <Box mr={0.5}>
              <MailIcon />
            </Box>
            <Box ml={0.5}>
              <Typography variant="button" display="block" gutterBottom>
                Send Mail
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteSendMailItem(actionId)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      <form noValidate autoComplete="off">
        <Box mb={1} mt={1}>
          <TextField
            variant="outlined"
            size="small"
            label="Enter Address Email"
            fullWidth
            name="to"
            value={
              item ? (item.mail ? (item.mail.to ? item.mail.to : '') : '') : ''
            }
            onChange={(e) =>
              handleChangeMailInfoItem(actionId, e.target.name, e.target.value)
            }
          />
        </Box>
        <Box mb={1}>
          <TextField
            label="Enter Title Email"
            variant="outlined"
            size="small"
            fullWidth
            name="title"
            value={
              item
                ? item.mail
                  ? item.mail.title
                    ? item.mail.title
                    : ''
                  : ''
                : ''
            }
            onChange={(e) =>
              handleChangeMailInfoItem(actionId, e.target.name, e.target.value)
            }
          />
        </Box>
        <Box mb={1}>
          <TextField
            label="Enter Body Email"
            variant="outlined"
            size="small"
            fullWidth
            name="body"
            value={
              item
                ? item.mail
                  ? item.mail.body
                    ? item.mail.body
                    : ''
                  : ''
                : ''
            }
            onChange={(e) =>
              handleChangeMailInfoItem(actionId, e.target.name, e.target.value)
            }
          />
        </Box>
      </form>
    </>
  );
};

export default ActionText;
