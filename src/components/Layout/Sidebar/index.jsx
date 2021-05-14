import React, { useState, useEffect } from 'react';
import { useLocation, matchPath, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Hidden,
  Tooltip,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import useStyles from './index.style';

const Sidebar = ({
  menu,
  displaySideBar,
  openSideBar,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const [expandMenu, setExpandMenu] = useState();
  const [menuActive, setMenuActive] = useState();

  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();

  const isActiveRoute = (route) => {
    const listNameUrl = location.pathname.split('/');
    return route.indexOf(listNameUrl[3]) >= 0;
  };

  useEffect(() => {
    menu.find((key, index) => {
      if (key.subMenus) {
        const indexActive =
          key.subMenus &&
          key.subMenus.findIndex((el) => isActiveRoute(el.route));

        if (indexActive >= 0) {
          setMenuActive(index);
          setExpandMenu(index);
          return true;
        }
      }
      if (key.route) {
        const checkActive = isActiveRoute(key.route);
        if (checkActive) {
          setMenuActive(index);
          setExpandMenu(index);
          return true;
        }
      }
      return false;
    });
  }, []);

  console.log({ menuActive, expandMenu });
  const handleCollapseMenu = (index) => {
    if (expandMenu === index) setExpandMenu('');
    else {
      setExpandMenu(index);
    }
  };

  const renderCollapseMenuItem = (item, index, mobile) => {
    return (
      <>
        <ListItem
          button
          onClick={() => handleCollapseMenu(index)}
          className={clsx(classes.menuItem, {
            [classes.backgroundPrimary]: menuActive === index,
          })}
        >
          <ListItemIcon
            className={clsx(classes.menuIcon, {
              [classes.primary]: menuActive === index,
            })}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={t(item.heading)}
            className={clsx(classes.menuTitle, {
              [classes.hide]: !mobile && !openSideBar,
              [classes.primary]: menuActive === index,
            })}
          />
          {expandMenu === index ? (
            <ExpandLess
              className={clsx(classes.menuIcon, {
                [classes.hide]: !mobile && !openSideBar,
                [classes.primary]: menuActive === index,
              })}
            />
          ) : (
            <ExpandMore
              className={clsx(classes.menuIcon, {
                [classes.hide]: !mobile && !openSideBar,
                [classes.primary]: menuActive === index,
              })}
            />
          )}
        </ListItem>
        {!mobile && !openSideBar && (
          <div className={classes.placementRightTop}>
            <List component="div" disablePadding className={classes.subMenu}>
              {item.subMenus.map((subMenu) => {
                const isSubmenuActive =
                  menuActive === index && isActiveRoute(subMenu.route);
                return (
                  <Link
                    className={classes.link}
                    key={uuid()}
                    to={subMenu.route}
                    onClick={() => setExpandMenu(index)}
                  >
                    <ListItem
                      className={clsx(classes.nested, classes.menuItem, {
                        [classes.backgroundPrimary]: isSubmenuActive,
                      })}
                    >
                      <ListItemIcon
                        className={clsx(classes.menuIcon, {
                          [classes.primary]: isSubmenuActive,
                        })}
                      >
                        {subMenu.icon}
                      </ListItemIcon>
                      <ListItemText
                        className={clsx(classes.menuTitle, {
                          [classes.primary]: isSubmenuActive,
                        })}
                        primary={t(subMenu.heading)}
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </div>
        )}
        <Collapse
          in={(mobile || openSideBar) && expandMenu === index}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {item.subMenus.map((subMenu) => {
              const isSubmenuActive =
                menuActive === index && isActiveRoute(subMenu.route);
              return (
                <Link
                  className={classes.link}
                  key={uuid()}
                  to={subMenu.route}
                  onClick={() => setExpandMenu(index)}
                >
                  <ListItem
                    className={clsx(classes.nested, classes.menuItem, {
                      [classes.backgroundPrimary]: isSubmenuActive,
                    })}
                  >
                    <ListItemIcon
                      className={clsx(classes.menuIcon, {
                        [classes.primary]: isSubmenuActive,
                      })}
                    >
                      {subMenu.icon}
                    </ListItemIcon>
                    <ListItemText
                      className={clsx(classes.menuTitle, {
                        [classes.primary]: isSubmenuActive,
                      })}
                      primary={t(subMenu.heading)}
                    />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  };

  const ItemWithTooltip = ({ children, title, mobile }) => {
    if (!mobile && !openSideBar)
      return <Tooltip title={title}>{children}</Tooltip>;
    return children;
  };

  const renderMenuItem = (item, index, mobile) => {
    return (
      <ItemWithTooltip title={t(item.heading)} mobile={mobile}>
        <Link
          className={classes.link}
          key={uuid()}
          to={item.route}
          onClick={() => setExpandMenu(index)}
        >
          <ListItem
            key={uuid()}
            className={clsx(classes.menuItem, {
              [classes.backgroundPrimary]: menuActive === index,
            })}
          >
            <ListItemIcon
              className={clsx(classes.menuIcon, {
                [classes.primary]: menuActive === index,
              })}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={t(item.heading)}
              className={clsx(classes.menuTitle, {
                [classes.hide]: !mobile && !openSideBar,
                [classes.primary]: menuActive === index,
              })}
            />
          </ListItem>
        </Link>
      </ItemWithTooltip>
    );
  };

  const renderSidebarWindow = () => {
    return (
      <Hidden smDown implementation="css">
        <Drawer
          open={openSideBar}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: openSideBar,
            [classes.drawerClose]: !openSideBar,
          })}
          variant="permanent"
          classes={{
            paper: clsx(classes.drawer, {
              [classes.drawerOpen]: openSideBar,
              [classes.drawerClose]: !openSideBar,
            }),
          }}
        >
          <Toolbar />
          <div>
            <List>
              {menu.map((item, index) => {
                return (
                  <div key={uuid()} className={classes.menuSubmenu}>
                    {item.subMenus
                      ? renderCollapseMenuItem(item, index)
                      : renderMenuItem(item, index)}
                  </div>
                );
              })}
            </List>
          </div>
        </Drawer>
      </Hidden>
    );
  };

  const renderSidebarMobile = () => {
    return (
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.drawerMobile}>
            <List>
              {menu.map((item, index) => {
                return (
                  <div key={uuid()}>
                    {item.subMenus
                      ? renderCollapseMenuItem(item, index, true)
                      : renderMenuItem(item, index, true)}
                  </div>
                );
              })}
            </List>
          </div>
        </Drawer>
      </Hidden>
    );
  };

  return (
    <>
      {displaySideBar && renderSidebarWindow()}
      {displaySideBar && renderSidebarMobile()}
    </>
  );
};

export default Sidebar;
