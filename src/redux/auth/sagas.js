import { put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import apis from '../../apis';
import actions from '../actions';
import { getCookie, setCookie, removeCookie } from '../../utils/cookie';
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
    if (user) {
      setCookie('accessToken', accessToken, A_WEEK);
      yield put(actions.auth.loginSuccess(accessToken, user));
    } else {
      yield put(actions.auth.loginFailure('Lỗi access token'));
    }
  } catch (error) {
    yield put(actions.auth.loginFailure('Lỗi không xác định'));
  }
}

function* logoutSaga() {
  try {
    const accessToken = getCookie('accessToken');
    const data = yield apis.auth.logout(accessToken);
    if (data && data.status) {
      removeCookie();
      yield put(actions.auth.logoutSuccess());
    }
  } catch (error) {
    console.log(error);
  }
}

function* verifyTokenSaga({ accessToken }) {
  try {
    const data = yield apis.auth.verify(accessToken);
    if (!data.status) throw new Error();
    const { user } = data.result;
    if (user) {
      console.log({ user });
      yield put(actions.auth.verifyTokenSuccess(accessToken, user));
    } else {
      yield put(actions.auth.verifyTokenFailure());
    }
  } catch (error) {
    yield put(actions.auth.verifyTokenFailure());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.auth.actionTypes.LOGIN, loginSaga),
    takeLatest(actions.auth.actionTypes.LOGOUT, logoutSaga),
    takeEvery(actions.auth.actionTypes.VERIFY_TOKEN, verifyTokenSaga),
  ]);
}
