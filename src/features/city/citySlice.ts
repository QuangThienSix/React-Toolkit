import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CityState {
  list: City[];
  loading: boolean;
}
const initialState: CityState = {
  list: [],
  loading: false,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

// Action
export const cityActions = citySlice.actions;

// selector
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (citylist) =>
  citylist.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);
export const selectCityOptins = createSelector(selectCityList, (citylist) =>
  citylist.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
