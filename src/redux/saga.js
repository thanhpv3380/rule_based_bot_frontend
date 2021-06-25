import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import botSagas from './bot/sagas';
import actionSagas from './action/sagas';
import intentSagas from './intent/sagas';

function* rootSaga() {
  yield all([authSagas(), botSagas(), actionSagas(), intentSagas()]);
}

export default rootSaga;
