import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse } from 'models';
import { Student } from 'models/student';
import { dashboardAction, RankingByCity } from './dashboardSlice';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statisticList = responseList.map((x) => x.pagination._totalRows);

  const [maleCount, femaleCount, hightMarkCount, lowMarkCount] = statisticList;

  yield put(
    dashboardAction.setStatistice({ maleCount, femaleCount, hightMarkCount, lowMarkCount })
  );
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardAction.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardAction.setLowMarkStudentList(data));
}

function* fetchRankingByCityList() {
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  const callList = cityList.map((city: City) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: city.code,
    })
  );

  const responseList: Array<ListResponse<Student>> = yield all(callList);

  const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data,
  }));

  yield put(dashboardAction.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    yield put(dashboardAction.fetchDataSuccess());
  } catch (error) {
    console.log('Failed to fetch dashboard data', error);
    yield put(dashboardAction.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData);
}
