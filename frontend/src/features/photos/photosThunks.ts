import {createAsyncThunk} from "@reduxjs/toolkit";
import {Photo, PhotoMutation, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const fetchPhotos = createAsyncThunk<Photo[], string | undefined>(
  'photos/fetchAll',
  async (userId) => {
    if (userId) {
      const response = await axiosApi.get('/photos?user=' + userId);
      return response.data;
    }

    const response = await axiosApi.get('/photos');
    return response.data;
  }
);

export const createPhoto = createAsyncThunk<void, PhotoMutation, {rejectValue: ValidationError}>(
  'photos/create',
  async (photoMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];

      keys.forEach(key => {
        const value = photoMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.post('/photos', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const deletePhoto = createAsyncThunk<void, string>(
  'photos/delete',
  async (id) => {
    await axiosApi.delete('/photos/' + id);
  }
);