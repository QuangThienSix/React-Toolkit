import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse } from 'models';
import { Student } from 'models/student';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';

function* fetchStundetList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStundetListSusscess(response));
  } catch (error) {
    console.error('Failed to fetch student list', error);
    yield put(studentActions.fetchStundetListFailed());
  }
}
function* handleSearch(action: PayloadAction<ListParams>) {
  console.log('Debounce', action.payload);
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStundetList, fetchStundetList);
  yield debounce(500, studentActions.setFilterWithDeBounce.type, handleSearch);
}
