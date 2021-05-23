/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import {
  PhotoCamera as PhotoCameraIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../../apis';

const GeneralSetting = ({ bot, handleChangeBotInfo }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleChangeBotInfo(name, value);
  };

  const handleUploadImage = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('file', file);
    const data = await apis.upload.uploadFile({ formData });
    if (data && data.status) {
      handleChangeBotInfo('imageUrl', data.result.link);
    } else {
      enqueueSnackbar('Upload failed', {
        variant: 'error',
      });
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={handleUploadImage}
        />

        <label htmlFor="icon-button-file">
          {bot.imageUrl ? (
            <Avatar className={classes.avatar} src={bot.imageUrl} />
          ) : (
            <Avatar className={classes.avatar}>
              <PhotoCameraIcon />
            </Avatar>
          )}
        </label>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">Name</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          name="name"
          value={bot.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">Description</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          name="description"
          value={bot.description || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">Bot token</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={bot.botToken}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default GeneralSetting;
