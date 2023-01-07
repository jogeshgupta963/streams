import express, { Request, response } from "express";
import cors from "cors";
import { connect } from "mongoose";
import { videoRouter } from "./routes/video";
const app = express();
import "dotenv/config";

app.use(express.json());
app.use(cors());
app.use("/api/user/video", videoRouter);

app.get("/api/user", (req, res) => {
  res.json("server is running...");
});

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("env needed");
      process.exit();
    }
    connect(process.env.MONGO_URI);
    console.log("Mongo connected");
    app.listen(5000, () => {
      console.log("listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
})();
