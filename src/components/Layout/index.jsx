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
    heading: 'data',
    icon: <People />,
    subMenus: [
      {
        route: `/admin/accounts`,
        icon: <People />,
        heading: 'accounts',
      },
      {
        route: `/intents`,
        icon: <People />,
        heading: 'intent',
      },
    ],
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
