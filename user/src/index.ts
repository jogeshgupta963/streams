import express, { Request, response } from "express";
import cors from "cors";
import { connect } from "mongoose";
import { videoRouter } from "./routes/video";
const app = express();
import "dotenv/config";
import { rmq } from "./rabbitMQ/listener";
import { VideoCreatedListener } from "./rabbitMQ/listeners/video-created";

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

    //rmq

    await rmq.connect(
      "amqps://whltukhs:yA0ZYPXezPfiaJjXRNVuNc0OH1dfsDTd@puffin.rmq2.cloudamqp.com/whltukhs"
    );

    const videoCreatedListener = new VideoCreatedListener(rmq.client);
    await videoCreatedListener.listen();
    // const ch1 = await rmq.client.createChannel();
    // await ch1.assertQueue("video:created");
    // await ch1.consume("video:created", (msg) => {
    //   console.log("here");
    //   console.log(msg);
    // });
    app.listen(5000, () => {
      console.log("listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
})();
