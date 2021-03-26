import routes from '../constants/route';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Bot from '../pages/Bot';
import Dictionary from '../pages/Dictionary';
import Action from '../pages/Action';
import Intent from '../pages/Intent';
import Entity from '../pages/Entity';

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
    path: routes.DICTIONARY_BOT,
    component: Dictionary,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: routes.ACTION_BOT.ACTION,
    component: Action,
    exact: false,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: routes.INTENT_BOT.INTENT,
    component: Intent,
    exact: false,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: routes.ENTITY_BOT.ENTITY,
    component: Entity,
    exact: false,
    restricted: false,
    isPrivate: true,
    isLayout: true,
  },
];
