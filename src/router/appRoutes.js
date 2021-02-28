import routes from '../constants/route';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Bot from '../pages/Bot';
import Dictionary from '../pages/Dictionary';

export default [
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
    restricted: true,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: routes.DASHBOARD,
    component: Bot,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: false,
  },
  {
    path: routes.DASHBOARD_BOT,
    component: Home,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: routes.DICTIONARY,
    component: Dictionary,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
];
