import mongoose from "mongoose";

export default async function connect(uri: string) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
}
