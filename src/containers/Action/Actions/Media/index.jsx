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
  title,
  example,
  actionId,
  item,
  handleDeleteMediaItem,
  handleChangeMediaInfoItem,
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
                {title}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteMediaItem(actionId)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography gutterBottom>Send an {title} link in the chat.</Typography>{' '}
      <Typography variant="button" gutterBottom>
        {example}
      </Typography>
      <Divider />
      <form noValidate autoComplete="off">
        <Box mb={1} mt={1}>
          <TextField
            variant="outlined"
            size="small"
            label={`Enter ${title} file URL`}
            fullWidth
            name="url"
            value={
              item.media.attachment.payload.url
                ? item.media.attachment.payload.url
                : ''
            }
            onChange={(e) =>
              handleChangeMediaInfoItem(actionId, e.target.name, e.target.value)
            }
          />
        </Box>
        <Box mb={1}>
          <TextField
            label={`Enter description of ${title}`}
            variant="outlined"
            size="small"
            fullWidth
            name="text"
            value={item.media.text ? item.media.text : ''}
            onChange={(e) =>
              handleChangeMediaInfoItem(actionId, e.target.name, e.target.value)
            }
          />
        </Box>
      </form>
    </>
  );
};

export default ActionText;
