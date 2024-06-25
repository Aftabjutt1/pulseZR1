// app.js

import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import connectDB from './db'; // Import connectDB function from db.js
import User from './models/userModel'; // Adjust path as per your actual file structure

const app = express();
const server = http.createServer(app); // Create HTTP server using Express

// WebSocket server setup
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', async message => {
    try {
      const { userId, online } = JSON.parse(message);
      await User.findByIdAndUpdate(userId, { online });
      console.log(`User ${userId} updated online status to ${online}`);
    } catch (err) {
      console.error(err);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    // Optionally handle user disconnection
  });
});

// Express middleware and routes setup
app.use(express.json());

// Connect to MongoDB using connectDB function
connectDB()
  .then(() => {
    // Start the server after successful MongoDB connection
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Include your route handlers here
import authRoutes from './routes/authRoutes'; // Example import, adjust as per your routes
app.use('/auth', authRoutes);
