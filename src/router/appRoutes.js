import routes from '../constants/route';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Bot from '../pages/Bot';
import Dictionary from '../pages/Dictionary';
import Action from '../pages/Action';
import Intent from '../pages/Intent';
import Entity from '../pages/Entity';
import Workflow from '../pages/Workflow';
import DrawFlow from '../pages/DrawFlow';
import Settings from '../pages/settting';

export default [
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
    restricted: true,
    isPrivate: false,
    isLayout: false,
    isHeader: false,
  },
  {
    path: routes.DASHBOARD,
    component: Bot,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: false,
    isHeader: true,
  },
  {
    path: routes.DASHBOARD_BOT,
    component: Dashboard,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isHeader: true,
  },
  {
    path: routes.DICTIONARY_BOT,
    component: Dictionary,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isHeader: true,
  },
  {
    path: routes.ACTION_BOT.ACTION,
    component: Action,
    exact: false,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isHeader: true,
  },
  {
    path: routes.INTENT_BOT.INTENT,
    component: Intent,
    exact: false,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isHeader: true,
  },
  {
    path: routes.ENTITY_BOT.ENTITY,
    component: Entity,
    exact: false,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isHeader: true,
  },
  {
    path: routes.WORKFLOW_BOT.WORKFLOW,
    component: Workflow,
    exact: false,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isHeader: true,
  },
  {
    path: routes.WORKFLOW_BOT.DRAW_FLOW,
    component: DrawFlow,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: false,
    isHeader: false,
  },
  {
    path: routes.SETTINGS,
    component: Settings,
    exact: true,
    restricted: false,
    isPrivate: true,
    isLayout: true,
    isHeader: true,
  },
];
