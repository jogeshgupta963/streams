import express, { Request, response } from "express";
import cors from "cors";
import { connect } from "mongoose";
import { videoRouter } from "./routes/video";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user/video", videoRouter);

app.get("/api/user", (req, res) => {
  res.json("server is running...");
});
(async () => {
  try {
    connect("mongodb://172.17.0.2:27017/userDatabase");
    console.log("Mongo connected");
    app.listen(5000, () => {
      console.log("listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
})();
