import {model, Schema, Types} from "mongoose";
import User from "./User";

const PhotoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  image: {
    type: String,
    required: true,
  },
});

const Photo = model('Photo', PhotoSchema);
export default Photo;