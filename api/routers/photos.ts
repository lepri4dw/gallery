import express from "express";
import Photo from "../models/Photo";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";

const photosRouter = express.Router();

photosRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.user) {
      const photos = await Photo.find({ user: req.query.user }).populate({path: 'user', select: 'displayName'});
      return res.send(photos);
    }

    const photos = await Photo.find().populate({path: 'user', select: 'displayName'});
    return res.send(photos);
  } catch (e) {
    return next(e);
  }
});

photosRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const photo = await Photo.create({
      title: req.body.title,
      user: user._id,
      image: req.file ? req.file.filename : null,
    });

    return res.send(photo);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

photosRouter.delete('/:id', auth, async (req, res, next) => {
  try {
     const user = (req as RequestWithUser).user;
     const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).send({error: 'Not Found!'});
    }

    if ((user._id.toString() !== photo.user.toString()) && user.role !== 'admin') {
      return res.status(403).send({'message': 'Unauthorized'});
    }

    await Photo.deleteOne({ _id: req.params.id});
    return res.send({message: 'Deleted'});
  } catch (e) {
    return next(e);
  }
});

export default photosRouter;