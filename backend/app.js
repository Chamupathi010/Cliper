const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const courseRoutes = require('./route/courseRoutes');
const moduleRoutes = require('./route/moduleRoutes');
const materialRoutes = require('./route/materialRoutes');
const dns = require("node:dns");

// 🔥 MUST be at the very top
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use standard connection string instead of SRV
const MONGODB_URI = 'mongodb+srv://akilauddeepaba2002_db_user:byP2x1opTbCoCabl@cluster0.l8xgdvw.mongodb.net/LOSTFOUND?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas successfully!');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  console.log('\n💡 Trying alternative approach...');
  process.exit(1);
});

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/materials', materialRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'University Management API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});