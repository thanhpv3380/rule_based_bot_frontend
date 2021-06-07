export default {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DICTIONARY_BOT: '/bot/:id/dictionary',
  DASHBOARD_BOT: '/bot/:id/dashboard',
  ACTION_BOT: {
    ACTION: '/bot/:id/actions',
    CREATE_ACTION: '/bot/:id/actions/create',
    DETAIL_ACTION: '/bot/:id/actions/detail/:actionId',
  },
  INTENT_BOT: {
    INTENT: '/bot/:id/intents',
    CREATE_INTENT: '/bot/:id/intents/create',
    DETAIL_INTENT: '/bot/:id/intents/detail/:intentId',
  },
  ENTITY_BOT: {
    ENTITY: '/bot/:id/entities',
    CREATE_ENTITY: '/bot/:id/entities/create',
    DETAIL_ENTITY: '/bot/:id/entities/detail/:entityId',
  },
  WORKFLOW_BOT: {
    WORKFLOW: '/bot/:id/workflows',
    CREATE_WORKFLOW: '/bot/:id/workflows/create',
    DETAIL_WORKFLOW: '/bot/:id/workflows/detail/:workflowId',
    DRAW_FLOW: '/bot/:id/draw-workflows/:workflowId',
  },
  HISTORY: '/bot/:id/history',
  HISTORY_CHAT: '/bot/:id/history/:conversationsId',
  SETTINGS: '/bot/:id/settings',
};
