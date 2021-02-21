import { combineReducers } from 'redux';
import auth, { initialState as authInitialState } from './auth/reducer';
import bot, { initialState as botInitialState } from './bot/reducer';

export const initialState = {
  auth: authInitialState,
  bot: botInitialState,
};

export default combineReducers({
  auth,
  bot,
});
