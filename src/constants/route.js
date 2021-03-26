export default {
  HOME: '/',
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
    DETAIL_INTENT: '/bot/:id/intents/detail/:id',
  },
};
