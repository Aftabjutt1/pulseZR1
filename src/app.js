// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";

// const env = process.env.NODE_ENV || "development";
// dotenv.config({ path: `.env.${env}` });

// const app = express();

// app.use(bodyParser.json());

// app.use("/api", authRoutes);

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// src/app.js

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "../config/db.js"; // Adjust the path if necessary
import authRoutes from "./routes/authRoutes.js";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const app = express();

app.use(bodyParser.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
