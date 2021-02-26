import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { People, SettingsInputComponent } from '@material-ui/icons';
import useStyles from './index.style';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

const Layout = ({ children, isLayout }) => {
  const classes = useStyles();
  const agentId = useSelector((state) => state.bot.bot);
  const menu = [
    {
      heading: 'General',
      icon: <SettingsInputComponent />,
      subMenus: [
        {
          route: `/agent/${agentId}`,
          icon: <People />,
          heading: 'Dashboard',
        },
      ],
    },
    {
      heading: 'Data',
      icon: <People />,
      subMenus: [
        {
          route: `/agent/${agentId}/entities`,
          icon: <People />,
          heading: 'Entities',
        },
        {
          route: `/agent/${agentId}/intents`,
          icon: <People />,
          heading: 'Intents',
        },
        {
          route: `/agent/${agentId}/actions`,
          icon: <People />,
          heading: 'Actions',
        },
        {
          route: `/agent/${agentId}/dictionary`,
          icon: <People />,
          heading: 'Dictionary',
        },
      ],
    },
    {
      heading: 'Settings',
      icon: <SettingsInputComponent />,
      route: `/agent/${agentId}/settings`,
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
      <Header
        accessToken={accessToken}
        user={user}
        bgColor="#fff"
        displaySideBar={displaySideBar}
        handleDrawerToggle={handleDrawerToggle}
      />
      {isLayout && (
        <div>
          <Sidebar
            menu={menu}
            mobileOpen={mobileOpen}
            openSideBar={openSideBar}
            displaySideBar={displaySideBar}
            handleDrawerToggle={handleDrawerToggle}
          />
        </div>
      )}
      <Content
        displaySideBar={displaySideBar}
        handleSidebarToggle={handleSidebarToggle}
        isLayout={isLayout}
      >
        {children}
      </Content>
    </div>
  );
};

export default Layout;
