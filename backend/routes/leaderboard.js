import express from 'express';

const router = express.Router();

const mockLeaderboard = [
  { name: 'Sarah Jenkins', area: 'Downtown', streak: 42, points: 15420 },
  { name: 'Marcus Chen', area: 'Westside', streak: 38, points: 14200 },
  { name: 'Priya Sharma', area: 'North Hills', streak: 31, points: 12840 },
  { name: 'David Wilson', area: 'East End', streak: 28, points: 11950 },
  { name: 'Elena Rodriguez', area: 'South Bay', streak: 25, points: 10400 },
];

// GET /api/v1/leaderboard
router.get('/', (req, res) => {
  res.status(200).json({
    data: {
      leaderboard: mockLeaderboard
    }
  });
});

export default router;
