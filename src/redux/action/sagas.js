import { put, all, takeLatest } from 'redux-saga/effects';
import apis from '../../apis';
import actions from '../actions';

function* getActions() {
  try {
    const data = yield apis.action.getActions();
    if (data && data.status) {
      yield put(actions.action.getActionsSuccess(data.result.actions));
    }
  } catch (error) {
    yield put(actions.action.getActionsFailure());
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.action.actionTypes.GET_ACTIONS, getActions)]);
}
