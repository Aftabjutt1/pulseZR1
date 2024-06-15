// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDB = async () => {
//   mongoose.connect(process.env.MONGO_URI).then(() => {
//       console.log("MongoDB connected");
//     }).catch((err) => {
//       console.error(err.message);
//       process.exit(1);
//     });
// };

// export default connectDB;

// config/db.js

import mongoose from "mongoose";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "pulseZR1", // Replace with your desired database name
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
