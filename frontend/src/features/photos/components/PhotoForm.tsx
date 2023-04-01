import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectCreatePhotoError, selectPhotoCreating} from "../photosSlice";
import {selectUser} from "../../users/usersSlice";
import {PhotoMutation} from "../../../types";
import {createPhoto} from "../photosThunks";
import {Grid, TextField, Typography} from '@mui/material';
import FileInput from "../../../components/UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";

const PhotoForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreatePhotoError);
  const user = useAppSelector(selectUser);
  const creating = useAppSelector(selectPhotoCreating);
  const [state, setState] = useState<PhotoMutation>({
    title: '',
    image: null
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  }

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createPhoto(state)).unwrap();
    navigate('/users/' + user?._id);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };
  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">New photo</Typography>
        </Grid>

        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title" required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image" onChange={fileInputChangeHandler}
            name="image" required
            error={Boolean(getFieldError('image'))}
            helperText={getFieldError('image')}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton loadingIndicator="Loading…" loading={creating} type="submit" color="primary" variant="contained">Create</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default PhotoForm;