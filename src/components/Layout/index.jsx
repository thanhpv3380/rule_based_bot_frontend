/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Home,
  Poll,
  Dns,
  Assignment,
  Category,
  Code,
  SettingsInputComponent,
  MenuBook,
  Description,
  CallSplit,
  Restore,
} from '@material-ui/icons';
import useStyles from './index.style';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

const Layout = ({ children, isLayout, isHeader }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const bot = useSelector((state) => state.bot.bot);
  const menu = [
    {
      route: `/bot/${bot.id}/dashboard`,
      icon: <Poll />,
      heading: t('dashboard'),
    },
    {
      heading: t('data'),
      icon: <Dns />,
      subMenus: [
        {
          route: `/bot/${bot.id}/entities`,
          icon: <Category />,
          heading: t('entities'),
        },
        {
          route: `/bot/${bot.id}/intents`,
          icon: <Assignment />,
          heading: t('intents'),
        },
        {
          route: `/bot/${bot.id}/actions`,
          icon: <Code />,
          heading: t('actions'),
        },
        // {
        //   route: `/bot/${bot.id}/dictionary`,
        //   icon: <MenuBook />,
        //   heading: 'Dictionary',
        // },
      ],
    },
    {
      heading: t('script'),
      icon: <Description />,
      subMenus: [
        {
          route: `/bot/${bot.id}/workflows`,
          icon: <CallSplit />,
          heading: t('workflow'),
        },
        {
          route: `/bot/${bot.id}/history`,
          icon: <Restore />,
          heading: t('history'),
        },
      ],
    },
    {
      heading: t('settings'),
      icon: <SettingsInputComponent />,
      route: `/bot/${bot.id}/settings`,
    },
  ];

  const { accessToken, user } = useSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);
  const [displaySideBar] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setOpenSideBar((open) => !open);
  };

  return (
    <div className={classes.root}>
      {isHeader && (
        <Header
          accessToken={accessToken}
          user={user}
          bgColor="#fff"
          displaySideBar={displaySideBar}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}

      {isLayout && (
        <Sidebar
          menu={menu}
          mobileOpen={mobileOpen}
          openSideBar={openSideBar}
          displaySideBar={displaySideBar}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
      <Content
        displaySideBar={displaySideBar}
        handleSidebarToggle={handleSidebarToggle}
        isLayout={isLayout}
        className={
          !isLayout
            ? classes.contentSideBar
            : openSideBar
            ? classes.contentOpenSideBar
            : classes.contentCloseSideBar
        }
      >
        {children}
      </Content>
    </div>
  );
};

export default Layout;
