import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectPhotos, selectPhotosFetching} from "../photosSlice";
import {fetchPhotos} from "../photosThunks";
import {Alert, Button, CircularProgress, Grid, Typography} from "@mui/material";
import PhotoItem from "./PhotoItem";
import {Link, useParams} from "react-router-dom";
import {selectUser, selectUsername, selectUsernameFetching} from "../../users/usersSlice";
import {fetchUser} from "../../users/usersThunks";

const PhotosByUser = () => {
  const id = (useParams()).id as string;
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const loading = useAppSelector(selectPhotosFetching);
  const user = useAppSelector(selectUsername);
  const usernameLoading = useAppSelector(selectUsernameFetching);
  const existingUser = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchPhotos(id));
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  return (
    <>
      {(loading || usernameLoading) ? <CircularProgress/> : <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">
              {existingUser && user?._id === existingUser._id ? 'My' : `${user?.displayName}'s`} photos
            </Typography>
          </Grid>
          {existingUser && user?._id === existingUser._id &&
            <Grid item>
              <Button color="primary" variant="contained" component={Link} to="/new-photo">Add new photo</Button>
            </Grid>
          }
        </Grid>
        {photos.length === 0 && <Alert sx={{mt: 3}} severity="warning" variant="filled">Here are no photos yet, please add some!</Alert>}
        <Grid item container spacing={2}>
          {photos.map(photo => (
            <PhotoItem key={photo._id} _id={photo._id} title={photo.title} image={photo.image} user={photo.user}/>
          ))}
        </Grid>
      </Grid>}
    </>
  );
};

export default PhotosByUser;