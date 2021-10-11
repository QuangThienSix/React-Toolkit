import { call, fork, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

// eslint-disable-next-line require-yield
function* handleLogin(payload: LoginPayload) {
  try {
    console.log('handleLogin: ', payload);
    localStorage.setItem('access_token', 'Thien');
    yield put(
      authActions.loginSuccess({
        user_id: 1,
        fullname: 'Quang Thien',
        address: '123 cao thắng',
        email: 'phamquangthien.it@gmail.com',
        password: 'Pasword',
        roles_id: '1',
        username: 'Thien',
        islock: true,
      })
    );
    //   redirest to admin page
    yield put(push('/admin/dashboard'));
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}

// eslint-disable-next-line require-yield
function* handleLogout() {
  localStorage.removeItem('access_token');
  yield put(push('/login'));
  //   redirest to login page
}

function* watchLogimFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}
export default function* authSaga() {
  yield fork(watchLogimFlow);
}
