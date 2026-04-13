require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/api/users', userRoutes);
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bugs', require('./routes/bugRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '🐛 BugTrack API running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
});
