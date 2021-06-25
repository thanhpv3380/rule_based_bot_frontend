import { combineReducers } from 'redux';
import auth, { initialState as authInitialState } from './auth/reducer';
import bot, { initialState as botInitialState } from './bot/reducer';
import action, { initialState as actionInitialState } from './action/reducer';
import intent, { initialState as intentInitialState } from './intent/reducer';

export const initialState = {
  auth: authInitialState,
  bot: botInitialState,
  action: actionInitialState,
  intent: intentInitialState,
};

export default combineReducers({
  auth,
  bot,
  action,
  intent,
});
