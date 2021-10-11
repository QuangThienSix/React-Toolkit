import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Users } from 'models/users';

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: Users;
}

export interface LoginPayload {
  username: string;
  password: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },

    loginSuccess(state, action: PayloadAction<Users>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Action
export const authActions = authSlice.actions;

// Selecttors

export const selecttorsIsLoggedIn = (state: { auth: { isLoggedIn: any } }) => state.auth.isLoggedIn;
export const selecttorsIslogging = (state: { auth: { logging: any } }) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
