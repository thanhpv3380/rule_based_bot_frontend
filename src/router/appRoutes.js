import routes from '../constants/route';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Bot from '../pages/Bot';

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
    path: routes.HOME,
    component: Home,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: routes.BOT,
    component: Bot,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: false,
  },
];
