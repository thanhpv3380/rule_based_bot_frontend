import { put, all, takeLatest } from 'redux-saga/effects';
import apis from '../../apis';
import actions from '../actions';

function* getRoleInBot({ botId }) {
  try {
    console.log(botId);
    const data = yield apis.bot.getRoleInBot(botId);
    if (!data || !data.status) throw new Error();
    const { role } = data.result;
    yield put(actions.bot.updateRole(role));
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.bot.actionTypes.GET_ROLE, getRoleInBot)]);
}
