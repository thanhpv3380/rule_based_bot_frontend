import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import botSagas from './bot/sagas';

function* rootSaga() {
  yield all([authSagas(), botSagas()]);
}

export default rootSaga;
