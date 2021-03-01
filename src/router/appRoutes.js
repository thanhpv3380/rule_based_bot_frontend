import routes from '../constants/route';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Bot from '../pages/Bot';
import Dictionary from '../pages/Dictionary';
import Action from '../pages/Action';

export default [
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
    restricted: true,
    isPrivate: false,
    isLayout: false,
    isLayoutListGroup: false,
  },
  {
    path: routes.DASHBOARD,
    component: Bot,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: false,
    isLayoutListGroup: false,
  },
  {
    path: routes.DASHBOARD_BOT,
    component: Home,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isLayoutListGroup: false,
  },
  {
    path: routes.DICTIONARY_BOT,
    component: Dictionary,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isLayoutListGroup: false,
  },
  {
    path: routes.ACTION_BOT,
    component: Action,
    exact: false,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isLayoutListGroup: true,
  },
];
