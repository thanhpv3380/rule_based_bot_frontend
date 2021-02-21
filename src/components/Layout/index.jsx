import React, { useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { People, Reddit, SettingsInputComponent } from '@material-ui/icons';
import useStyles from './index.style';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

export const AppContext = createContext();

const menu = [
  {
    heading: 'accounts',
    icon: <People />,
    subMenus: [
      {
        route: `/admin/accounts`,
        icon: <People />,
        heading: 'accounts',
      },
      {
        route: `/admin/accounts`,
        icon: <People />,
        heading: 'accounts',
      },
    ],
  },
  {
    heading: 'apps',
    icon: <SettingsInputComponent />,
    route: `/admin/apps`,
  },
  {
    heading: 'bots',
    icon: <Reddit />,
    route: `/bots`,
  },
];

const Layout = ({ children, isLayout }) => {
  const classes = useStyles();
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
        displaySideBar={displaySideBar && isLayout}
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
        displaySideBar={displaySideBar && isLayout}
        handleSidebarToggle={handleSidebarToggle}
      >
        {children}
      </Content>
    </div>
  );
};

export default Layout;
