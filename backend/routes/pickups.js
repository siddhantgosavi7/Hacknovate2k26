import express from 'express';
import { authMiddleware } from './auth.js';
import { awardEcoCoins } from '../data/users.js';

const router = express.Router();
const pickups = [];

const PICKUP_COIN_REWARD = 50;

// POST /api/v1/pickups
router.post('/', authMiddleware, (req, res) => {
  const { scheduledDate, scheduledTime, category, address } = req.body;

  if (!scheduledDate || !scheduledTime || !category || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const pickup = {
    id: Date.now().toString(),
    userId: req.user.id,
    scheduledDate,
    scheduledTime,
    category,
    address,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  };

  pickups.push(pickup);

  const coinResult = awardEcoCoins(req.user.id, PICKUP_COIN_REWARD, 'Recycling pickup scheduled');

  res.status(200).json({
    data: {
      pickup,
      ecoCoinsEarned: PICKUP_COIN_REWARD,
      ecoCoinsBalance: coinResult?.balance ?? 0,
    },
  });
});

export default router;
