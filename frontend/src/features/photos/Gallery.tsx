import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPhotos, selectPhotosFetching} from "./photosSlice";
import {fetchPhotos} from "./photosThunks";
import {CircularProgress, Grid, Typography} from "@mui/material";
import PhotoItem from "./components/PhotoItem";

const Gallery = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const loading = useAppSelector(selectPhotosFetching);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          All Photos
        </Typography>
      </Grid>
      {loading ? <CircularProgress/> : <Grid item container spacing={2}>
        {photos.map(photo => (
          <PhotoItem key={photo._id} _id={photo._id} title={photo.title} image={photo.image} user={photo.user} isMainPage/>
        ))}
      </Grid>}
    </Grid>
  );
};

export default Gallery;