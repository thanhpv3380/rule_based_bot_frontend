/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Box,
  IconButton,
  TextField,
  Divider,
  Button,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Mail as MailIcon,
  CloudUpload as CloudUploadIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../../../apis';

const ActionSendImage = ({
  actionId,
  item,
  handleDeleteSendImageItem,
  handleChangeSendImageInfoItem,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpload = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('file', file);
    const data = await apis.upload.uploadFile({ formData });
    if (data && data.status) {
      handleChangeSendImageInfoItem(actionId, 'url', data.result.link);
    } else {
      enqueueSnackbar('Upload failed', {
        variant: 'error',
      });
    }
  };

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
                Image
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteSendImageItem(actionId)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      <form noValidate autoComplete="off">
        <Box mb={1.5} mt={1.5}>
          <img
            src={(item.image && item.image.url) || ''}
            className={classes.prevImage}
          />
        </Box>
        <Box mb={1.5} display="flex">
          <div className={classes.uploadBtn}>
            <input
              accept="image/*"
              className={classes.inputUpload}
              id={`contained-button-file-${actionId}`}
              multiple
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor={`contained-button-file-${actionId}`}>
              <Button
                variant="contained"
                color="default"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </label>
          </div>
          <TextField
            variant="outlined"
            size="small"
            label="Enter image URL"
            fullWidth
            name="url"
            value={
              item
                ? item.image
                  ? item.image.url
                    ? item.image.url
                    : ''
                  : ''
                : ''
            }
            onChange={(e) =>
              handleChangeSendImageInfoItem(
                actionId,
                e.target.name,
                e.target.value,
              )
            }
          />
        </Box>
        <Box mb={1.5}>
          <TextField
            label="Enter description of image"
            variant="outlined"
            size="small"
            fullWidth
            name="description"
            value={
              item
                ? item.image
                  ? item.image.description
                    ? item.image.description
                    : ''
                  : ''
                : ''
            }
            onChange={(e) =>
              handleChangeSendImageInfoItem(
                actionId,
                e.target.name,
                e.target.value,
              )
            }
          />
        </Box>
      </form>
    </>
  );
};

export default ActionSendImage;
