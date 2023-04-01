import React, {useState} from 'react';
import {UserName} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {selectPhotoDeleting} from "../photosSlice";
import {Card, CardContent, CardMedia, Grid, styled, Typography} from "@mui/material";
import {apiURL} from "../../../constants";
import {Link} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {deletePhoto, fetchPhotos} from "../photosThunks";
import Modal from "../../../components/UI/Modal/Modal";

interface Props {
  title: string;
  image: string;
  user: UserName;
  _id: string;
  isMainPage?: boolean;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

const PhotoItem: React.FC<Props> = ({title, image, user, _id, isMainPage}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cardImage = apiURL + '/' + image;
  const existingUser = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectPhotoDeleting);

  const deleteHandler = async () => {
    await dispatch(deletePhoto(_id));
    if (isMainPage) {
      dispatch(fetchPhotos());
    } else {
      dispatch(fetchPhotos(user._id));
    }
  }

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card style={{display: 'block', border: "1px solid #ccc", borderRadius: "4px"}}>
          <ImageCardMedia image={cardImage} title={title} onClick={handleClose}/>
          <CardContent>
            <Typography variant="h6" onClick={handleClose} style={{textDecoration: 'underline', color: 'blue'}}>{title}</Typography>
            {isMainPage && <Typography variant="h6">By user: <Link to={'/users/' + user._id}>{user.displayName}</Link></Typography>}
            {existingUser && existingUser.role === 'admin' &&
              <LoadingButton onClick={() => deleteHandler()} sx={{mt: 2}} loadingIndicator="Loading…" loading={deleteLoading ? deleteLoading === _id : false} color="error" variant="contained">Delete</LoadingButton>
            }
          </CardContent>
        </Card>
      </Grid>
      <Modal open={open} handleClose={handleClose} title={title} image={cardImage}/>
    </>

  );
};

export default PhotoItem;