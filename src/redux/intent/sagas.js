import { put, all, takeLatest } from 'redux-saga/effects';
import apis from '../../apis';
import actions from '../actions';

function* getIntents() {
  try {
    const data = yield apis.intent.getIntents();
    if (data && data.status) {
      yield put(actions.intent.getIntentsSuccess(data.result));
    }
  } catch (error) {
    yield put(actions.intent.getIntentsFailure());
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.intent.actionTypes.GET_INTENTS, getIntents)]);
}
