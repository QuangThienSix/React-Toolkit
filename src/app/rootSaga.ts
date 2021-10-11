import authSaga from 'features/auth/authSaga';
import CitySaga from 'features/city/citySaga';
import counterSaga from 'features/counter/countSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import studentSaga from 'features/student/studentSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), counterSaga(), dashboardSaga(), studentSaga(), CitySaga()]);
}
