/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
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
import 'date-fns';
import useStyles from './index.style';

const GeneralSetting = ({ bot }) => {
  //   const { t } = useTranslation();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
        />

        <label htmlFor="icon-button-file">
          <Avatar className={classes.avatar}>
            <PhotoCameraIcon />
          </Avatar>
        </label>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">Name</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField fullWidth value={bot.name} />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">Description</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField fullWidth />
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
