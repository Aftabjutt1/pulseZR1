import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import authRoutes from "./routes/authRoutes.js";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const app = express();

app.use(bodyParser.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
