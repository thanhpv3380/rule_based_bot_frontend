import { put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import apis from '../../apis';
import actions from '../actions';
import { setCookie } from '../../utils/cookie';
import { responseCodes } from '../../enums';

function* loginSaga({ email, password }) {
  try {
    const A_WEEK = 7 * 24 * 60 * 60 * 1000;
    const data = yield apis.auth.login(email, password);
    if (!data.status) {
      if (
        data.code === responseCodes.USER_NOT_FOUND ||
        data.code === responseCodes.WRONG_PASSWORD
      ) {
        yield put(actions.auth.loginFailure(data.code));
      } else {
        yield put(actions.auth.loginFailure(responseCodes.SERVER_ERROR));
      }
      return;
    }
    const { accessToken, user } = data.result;
    setCookie('accessToken', accessToken, A_WEEK);
    yield put(actions.auth.loginSuccess(accessToken, user));
  } catch (error) {
    yield put(actions.auth.loginFailure('Lỗi không xác định'));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.auth.actionTypes.LOGIN, loginSaga),
    takeEvery(actions.auth.actionTypes.VERIFY_TOKEN, verifyTokenSaga),
  ]);
}
