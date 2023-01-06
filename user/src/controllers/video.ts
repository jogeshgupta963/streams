import { Request, Response } from "express";
import Video from "../models/Video";
import Wishlist from "../models/Wishlist";

async function getAllVideos(req: Request, res: Response) {
  const videos = await Video.find({});
  res.status(200).json({
    status: true,
    data: videos,
  });
}
async function getVideoById(req: Request, res: Response) {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.status(400).json({
      success: false,
      data: "Video not found",
    });
  }
  res.status(200).json({
    status: true,
    data: video,
  });
}
async function wishList(req: Request, res: Response) {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      throw new Error("Video not found");
    }
    const wishlist = await Wishlist.findOne({ video: video.id });
    if (wishlist) {
      //remove
      wishlist.delete();
      return res.status(200).json({
        success: true,
        data: "removed",
      });
    }
    //add
    const addToWishList = new Wishlist({
      video: video.id,
    });
    addToWishList.save();
    return res.status(200).json({
      success: true,
      data: "removed",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        status: false,
        data: err.message,
      });
    }
  }
}

export { getAllVideos, getVideoById, wishList };
