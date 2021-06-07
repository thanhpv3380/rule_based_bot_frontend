import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import actions from '../../redux/actions';
import useStyles from './index.style';
import { validateEmail } from '../../utils/string';
import { responseCodes } from '../../enums';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { loginCode, isLoggingIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggingIn) return;
    switch (loginCode) {
      case responseCodes.USER_NOT_FOUND:
        enqueueSnackbar('Account not exists', { variant: 'error' });
        break;
      case responseCodes.WRONG_PASSWORD:
        enqueueSnackbar('Password not match', { variant: 'error' });
        break;
      case responseCodes.SERVER_ERROR:
        enqueueSnackbar('Server error', { variant: 'error' });
        break;
      default:
    }
  }, [isLoggingIn]);

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
    if (emailError.length > 0) {
      setEmailError('');
    }
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
    if (passwordError.length > 0) {
      setPasswordError('');
    }
  };

  const validateLogin = () => {
    if (email.length === 0) {
      setEmailError('Email is required');
      return false;
    }
    if (!validateEmail(email)) {
      setEmailError('Email invalid');
      return false;
    }
    if (password.length === 0) {
      setPasswordError('Password is required');
      return false;
    }
    return true;
  };
  const handleLogin = () => {
    if (!validateLogin()) return;
    dispatch(actions.auth.login(email, password));
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6" className={classes.title}>
          RULE BASED CHATBOT
        </Typography>
        <div className={classes.form} onSubmit={handleLogin}>
          <TextField
            id="outlined-email-input"
            placeholder="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            fullWidth
            error={emailError.length > 0}
            helperText={emailError}
            value={email}
            onChange={onEmailChanged}
            onKeyPress={onKeyPress}
          />
          <TextField
            id="outlined-password-input"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            fullWidth
            error={passwordError.length > 0}
            helperText={passwordError}
            value={password}
            onChange={onPasswordChanged}
            onKeyPress={onKeyPress}
          />
        </div>
        <div className={classes.buttons}>
          <Button color="primary" variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
