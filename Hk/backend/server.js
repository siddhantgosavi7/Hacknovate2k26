import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import wasteRoutes from './routes/waste.js';
import leaderboardRoutes from './routes/leaderboard.js';
import pickupRoutes from './routes/pickups.js';
import chatRoutes from './routes/chat.js';
import ecocoinsRoutes from './routes/ecocoins.js';
import marketplaceRoutes from './routes/marketplace.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/waste-scans', wasteRoutes);
app.use('/api/v1/leaderboard', leaderboardRoutes);
app.use('/api/v1/pickups', pickupRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/ecocoins', ecocoinsRoutes);
app.use('/api/v1/marketplace', marketplaceRoutes);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
