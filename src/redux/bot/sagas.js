import { put, all, takeEvery } from 'redux-saga/effects';
import apis from '../../apis';
import actions from '../actions';
import { setCookie } from '../../utils/cookie';

function* getBotSaga({ botId }) {
  try {
    let data = yield apis.bot.getBotById(botId);
    if (!data || !data.status) throw new Error();
    const { bot } = data.result;

    if (!bot) {
      yield put(actions.bot.removeBot());
    } else {
      setCookie('bot-id', botId);
      data = yield apis.bot.getRoleInBot(botId);
      if (!data || !data.status) throw new Error();
      const { role } = data.result;
      yield put(actions.bot.updateRole(role));
      yield put(actions.bot.updateBot(bot));
    }
  } catch (error) {
    yield put(actions.bot.removeBot());
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.bot.actionTypes.GET_BOT, getBotSaga)]);
}
