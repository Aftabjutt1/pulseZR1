import mongoose from "mongoose";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

export default connectDB;
