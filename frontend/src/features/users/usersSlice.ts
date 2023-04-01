import {GlobalError, User, UserName, ValidationError} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {fetchUser, googleLogin, login, logout, register} from './usersThunks';

interface UsersState {
  user: User | null;
  username: UserName | null;
  fetchUsernameLoading: boolean;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  logoutLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  username: null,
  fetchUsernameLoading: false,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerError = null;
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.fetchUsernameLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, {payload: username}) => {
      state.fetchUsernameLoading = false;
      state.username = username;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.fetchUsernameLoading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(googleLogin.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectUsername = (state: RootState) => state.users.username;
export const selectUsernameFetching = (state: RootState) => state.users.fetchUsernameLoading;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogoutLoading = (state: RootState) => state.users.logoutLoading;