import {Photo, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createPhoto, deletePhoto, fetchPhotos} from "./photosThunks";

interface PhotosState {
  items: Photo[];
  fetchLoading: boolean;
  createLoading: boolean;
  createPhotoError: ValidationError | null;
  deleteLoading: string | false;
}

const initialState: PhotosState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  createPhotoError: null,
  deleteLoading: false,
};

const photosSlice = createSlice(({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, {payload: photos}) => {
      state.fetchLoading = false;
      state.items = photos;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createPhoto.pending, (state) => {
      state.createPhotoError = null;
      state.createLoading = true;
    });
    builder.addCase(createPhoto.fulfilled, (state, ) => {
      state.createLoading = false;
    });
    builder.addCase(createPhoto.rejected, (state, {payload: error}) => {
      state.createPhotoError = error || null;
      state.createLoading = false;
    });

    builder.addCase(deletePhoto.pending, (state, {meta: {arg: id}}) => {
      state.deleteLoading = id;
    });
    builder.addCase(deletePhoto.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
}));

export const photosReducer = photosSlice.reducer;

export const selectPhotos = (state: RootState) => state.photos.items;
export const selectPhotosFetching = (state: RootState) => state.photos.fetchLoading;
export const selectPhotoCreating = (state: RootState) => state.photos.createLoading;
export const selectCreatePhotoError = (state: RootState) => state.photos.createPhotoError;
export const selectPhotoDeleting = (state: RootState) => state.photos.deleteLoading;
