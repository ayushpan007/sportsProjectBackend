// server.js
const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const http = require('http');
const connectDB = require('./config/db');
const { authorize } = require('./middleware/authMiddleware');
const { seedMatchData } = require('./utils/seedMatchData');
const { setupSocket } = require('./controller/socketHandler');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Database connection and seeding
(async () => {
  try {
    await connectDB();
    //await seedMatchData();
    console.log('Database connected and seeded successfully');
  } catch (error) {
    console.error('Error connecting to the database or seeding data:', error);
    process.exit(1);
  }
})();

// Middleware setup
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(cors({ 
  origin: process.env.ALLOWED_ORIGINS || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authorize);

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Socket.IO setup
setupSocket(server);

// Start server
server.listen(port, () => console.log(`Server started on port ${port}`));

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});