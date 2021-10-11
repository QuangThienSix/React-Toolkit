import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from 'models/student';
import { Users } from 'models/users';

export interface DashboardStatistics {
  maleCount?: number;
  femaleCount?: number;
  hightMarkCount?: number;
  lowMarkCount?: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowMarkStudentList: Student[];
  rankingByCityList: RankingByCity[];
  ListUsers: Users[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    femaleCount: 0,
    hightMarkCount: 0,
    lowMarkCount: 0,
    maleCount: 0,
  },
  highestStudentList: [],
  lowMarkStudentList: [],
  rankingByCityList: [],

  ListUsers: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistice(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowMarkStudentList(state, action: PayloadAction<Student[]>) {
      state.lowMarkStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },

    setListUsers(state, action: PayloadAction<Users[]>) {
      state.ListUsers = action.payload;
    },
  },
});

// Actions
export const dashboardAction = dashboardSlice.actions;
// Selecttor
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectLowMarkStudentList = (state: RootState) => state.dashboard.lowMarkStudentList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;
export const selectDashboardListUsers = (state: RootState) => state.dashboard.ListUsers;
export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
// Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
