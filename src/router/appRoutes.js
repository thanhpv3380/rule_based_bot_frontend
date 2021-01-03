import Login from '../pages/Login';
import Home from '../pages/Home';
import Action from '../pages/Action';

import routes from '../constants/route';

export default [
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.HOME,
    component: Home,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.ACTION,
    component: Action,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
];
