import express from "express";
import { getAllVideos } from "../controllers/video";

const router = express.Router();

router.route("/video").get(getAllVideos);
