import express from 'express';
import { authMiddleware } from './auth.js';
import { awardEcoCoins } from '../data/users.js';

const router = express.Router();

const REWARDS = {
  signup: { amount: 100, label: 'Welcome bonus' },
  scan: { amount: 25, label: 'Waste scan completed' },
  pickup: { amount: 50, label: 'Recycling pickup scheduled' },
  streak: { amount: 15, label: 'Daily streak bonus' },
};

// POST /api/v1/ecocoins/earn
router.post('/earn', authMiddleware, (req, res) => {
  const { action } = req.body;
  const reward = REWARDS[action];

  if (!reward) {
    return res.status(400).json({ error: 'Invalid action' });
  }

  const result = awardEcoCoins(req.user.id, reward.amount, reward.label);
  if (!result) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({
    data: {
      earned: reward.amount,
      label: reward.label,
      balance: result.balance,
      ecoCoins: result.balance,
    },
  });
});

export default router;
