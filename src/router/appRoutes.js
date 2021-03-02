import routes from '../constants/route';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Dashboards from '../pages/Bot';
import Intent from '../pages/Intent';
import IntentDetail from '../pages/IntentDetail';
import NewIntent from '../pages/NewIntent';

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
    path: routes.DASHBOARDS,
    component: Dashboards,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: false,
  },
  {
    path: routes.INTENT,
    component: Intent,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: routes.INTENT_DETAIL,
    component: IntentDetail,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: routes.INTENT_CREATE,
    component: NewIntent,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
];
