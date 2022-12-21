import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
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

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;
