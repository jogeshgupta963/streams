import express from "express";
import cors from "cors";
import { connect } from "mongoose";
const app = express();

app.use(express.json());
app.use(cors());

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

app.listen(5000, () => {
  console.log("listening on port 5000");
});
