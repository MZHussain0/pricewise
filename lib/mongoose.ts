import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI) return;

  if (isConnected) return console.log("Already Connected");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("mongoDB connected!");
  } catch (error) {}
};
