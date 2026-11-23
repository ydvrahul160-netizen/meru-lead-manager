const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));

app.use(express.json({ limit: '10kb' }));

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Meru Lead Manager API is running',
  });
});

// Lead routes
app.use('/api/leads', leadRoutes);

// Error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();