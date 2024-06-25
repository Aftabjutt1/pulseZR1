import express from "express";
import http from "http";
import connectDB from "../config/db.js";
import routes from "./routes/routes.js";

const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(express.json());

// Routes setup
app.use("/api", routes);

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
