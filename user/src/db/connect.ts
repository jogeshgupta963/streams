import mongoose from "mongoose";

export default async function connect(uri: string) {
  await mongoose.connect(uri);
}
