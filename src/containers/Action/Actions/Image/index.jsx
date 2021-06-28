/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Image as ImageIcon,
  CloudUpload as CloudUploadIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../../../apis';

const ActionSendImage = ({
  actionId,
  item,
  handleDeleteSendImageItem,
  handleChangeMediaInfoItem,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('file', file);
      const data = await apis.upload.uploadFile({ formData });
      if (data && data.status) {
        handleChangeMediaInfoItem(actionId, 'url', data.result.link);
      } else {
        enqueueSnackbar(t('upload_failed'), {
          variant: 'error',
        });
      }
    }
  };

  return (
    <>
      <Box display="flex">
        <Box display="flex" flexGrow={1}>
          <Box display="flex">
            <Box mr={0.5}>
              <ImageIcon />
            </Box>
            <Box ml={0.5}>
              <Typography variant="button" display="block" gutterBottom>
                {t('image')}
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
      <Typography gutterBottom>
        {t('send_an_image_link_in_the_chat')}
      </Typography>{' '}
      <form noValidate autoComplete="off">
        {item.media.url && (
          <Box mb={1.5} mt={1.5}>
            <img
              src={(item.media && item.media.url) || ''}
              className={classes.prevImage}
            />
          </Box>
        )}
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
            label={t('enter_image_url')}
            fullWidth
            name="url"
            value={
              item
                ? item.media
                  ? item.media.url
                    ? item.media.url
                    : ''
                  : ''
                : ''
            }
            onChange={(e) =>
              handleChangeMediaInfoItem(actionId, e.target.name, e.target.value)
            }
          />
        </Box>
        <Box mb={1.5}>
          <TextField
            label={t('enter_description_of_image')}
            variant="outlined"
            size="small"
            fullWidth
            name="description"
            value={
              item
                ? item.media
                  ? item.media.description
                    ? item.media.description
                    : ''
                  : ''
                : ''
            }
            onChange={(e) =>
              handleChangeMediaInfoItem(actionId, e.target.name, e.target.value)
            }
          />
        </Box>
      </form>
    </>
  );
};

export default ActionSendImage;
