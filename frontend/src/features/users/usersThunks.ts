import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  User,
  UserName,
  ValidationError
} from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './usersSlice';

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];
      keys.forEach(key => {
        const value = registerMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });
      const response = await axiosApi.post<User>('/users', formData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }

  }
);

export const fetchUser = createAsyncThunk<UserName, string>(
  'users/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/users/' + id);
    return response.data;
  }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }

  }
);

export const googleLogin = createAsyncThunk<User, string, { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/google', { credential });
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logout',
  async (_, {getState, dispatch}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete('/users/sessions',  {headers: {'Authorization': token}});
    dispatch(unsetUser());
  }
);