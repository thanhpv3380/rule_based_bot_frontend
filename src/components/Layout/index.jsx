/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
} from '@material-ui/icons';
import { getCookie } from '../../utils/cookie';
import actions from '../../redux/actions';
import useStyles from './index.style';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

const Layout = ({ children, isLayout }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const botId = useSelector((state) => state.bot.bot);
  const menu = [
    {
      heading: 'General',
      icon: <Home />,
      subMenus: [
        {
          route: `/bot/${botId}/dashboard`,
          icon: <Poll />,
          heading: 'Dashboard',
        },
      ],
    },
    {
      heading: 'Data',
      icon: <Dns />,
      subMenus: [
        {
          route: `/bot/${botId}/entities`,
          icon: <Category />,
          heading: 'Entities',
        },
        {
          route: `/bot/${botId}/intents`,
          icon: <Assignment />,
          heading: 'Intents',
        },
        {
          route: `/bot/${botId}/actions`,
          icon: <Code />,
          heading: 'Actions',
        },
        {
          route: `/bot/${botId}/dictionary`,
          icon: <MenuBook />,
          heading: 'Dictionary',
        },
      ],
    },
    {
      heading: 'Script',
      icon: <Description />,
      subMenus: [
        {
          route: `/bot/${botId}/workflows`,
          icon: <CallSplit />,
          heading: 'Workflow',
        },
      ],
    },
    {
      heading: 'Settings',
      icon: <SettingsInputComponent />,
      route: `/bot/${botId}/settings`,
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

  useEffect(() => {
    if (!botId) {
      const id = getCookie('bot-id');
      dispatch(actions.bot.changeBot(id));
    }
  }, []);

  return (
    <div className={classes.root}>
      <Header
        accessToken={accessToken}
        user={user}
        bgColor="#fff"
        displaySideBar={displaySideBar}
        handleDrawerToggle={handleDrawerToggle}
      />
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
