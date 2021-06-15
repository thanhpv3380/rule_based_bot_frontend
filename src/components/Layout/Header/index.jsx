/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  IconButton,
  Hidden,
} from '@material-ui/core';
import { ExpandMore, Launch, Menu as MenuIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useStyles from './index.style';
import actions from '../../../redux/actions';
import i18n from '../../../languages';
import logo from '../../../assets/images/logo.png';
import userImage from '../../../assets/images/user.jpg';
import { setCookie, getCookie } from '../../../utils/cookie';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Vietnamese' },
];

const MainAppBar = ({
  accessToken,
  user,
  bgColor,
  displaySideBar,
  handleDrawerToggle,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenAccount, setIsOpenAccount] = useState(null);
  const classes = useStyles({ bgColor });
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useDispatch();

  const handleOpenLanguage = (event) => setAnchorEl(event.currentTarget);
  const handleCloseLanguage = () => setAnchorEl(null);
  const handleChangeLanguage = (event, index) => {
    const language = languages[index].value;
    setCookie('next-i18next', language);
    i18n.changeLanguage(language);
    setAnchorEl(null);
  };

  const handleOpenAccount = (event) => {
    if (accessToken) setIsOpenAccount(event.currentTarget);
  };
  const handleCloseAccount = () => setIsOpenAccount(null);
  const handleLogout = () => {
    dispatch(actions.auth.logout());
  };

  const handleBackToDashboard = () => {
    history.push('/');
  };

  const renderAvatar = () => {
    const name = user ? (user.name ? user.name : 'Admin') : 'Admin';
    const avatar = user ? (user.avatar ? user.avatar : userImage) : userImage;

    if (avatar)
      return (
        <Avatar
          classavatar={classes.avatar}
          src={avatar}
          onClick={handleOpenAccount}
        />
      );

    const words = name.split(' ');
    return (
      <Avatar className={classes.avatar} onClick={handleOpenAccount}>
        {words[words.length - 1].slice(0, 1).toUpperCase()}
      </Avatar>
    );
  };

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className={classes.root}>
        {displaySideBar && (
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        )}
        <div className={classes.title}>
          <Link to="/" className={classes.brandName}>
            <img src={logo} alt="logo" height="50px" width="auto" />
          </Link>
        </div>
        <Tooltip title={t('backToDashboard')}>
          <IconButton
            className={classes.language}
            onClick={handleBackToDashboard}
          >
            <Launch />
          </IconButton>
        </Tooltip>
        <Button
          className={classes.language}
          endIcon={<ExpandMore />}
          onClick={handleOpenLanguage}
        >
          {getCookie('next-i18next') || 'en'}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseLanguage}
        >
          {languages.map((language, index) => (
            <MenuItem
              key={language.value}
              onClick={(event) => handleChangeLanguage(event, index)}
            >
              {t(language.label)}
            </MenuItem>
          ))}
        </Menu>
        <Typography className={classes.account}>
          {user ? (user.name ? user.name : 'Admin') : 'Admin'}
        </Typography>
      </Toolbar>
      <div className={classes.avatarWrapper}>
        {renderAvatar()}
        <Menu
          anchorEl={isOpenAccount}
          keepMounted
          open={Boolean(isOpenAccount)}
          onClose={handleCloseAccount}
        >
          <MenuItem
            component={Link}
            to="/settings"
            onClick={handleCloseAccount}
          >
            {t('setting')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleLogout();
            }}
          >
            {t('logout')}
          </MenuItem>
        </Menu>
      </div>
    </AppBar>
  );
};

export default MainAppBar;
