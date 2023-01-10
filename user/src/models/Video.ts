import mongoose from "mongoose";

export enum Genre {
  horror = "horror",
  comedy = "comedy",
  thriller = "thriller",
  scifi = "sci-fi",
}
interface VideoDoc extends mongoose.Document {
  name: string;
  released: string;
  video: string;
  description: string;
  genre: Genre;
}

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
    genre: {
      enum: Object.keys(Genre),
    },
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

const Video = mongoose.model<VideoDoc>("Video", VideoSchema);

export default Video;
