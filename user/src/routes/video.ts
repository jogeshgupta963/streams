import express from "express";
import { getAllVideos, getVideoById, wishList } from "../controllers/video";

const router = express.Router();

router.route("/").get(getAllVideos);
router.route("/:id").get(getVideoById).post(wishList);
export { router as videoRouter };
