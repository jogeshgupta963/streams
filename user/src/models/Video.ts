import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    released: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: [
      {
        enum: ["horror", "comedy", "thriller", "sci-fi"],
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Video = mongoose.model("Video", VideoSchema);

export default Video;
