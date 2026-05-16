const asyncHandler = require("express-async-handler");
const Reward = require("../models/Reward");
const { addManualReward } = require("../services/rewardService");
const { createError, sendSuccess } = require("../utils/helpers");

const getRewards = asyncHandler(async (req, res) => {
  const rewards = await Reward.find({ user: req.user._id }).sort({ createdAt: -1 });

  return sendSuccess(res, 200, "Rewards fetched successfully", {
    profile: {
      ecoScore: req.user.ecoScore,
      xp: req.user.xp,
      streak: req.user.streak,
      badges: req.user.badges
    },
    rewards
  });
});

const addReward = asyncHandler(async (req, res) => {
  const { points, achievement, reason } = req.body;

  if (!points || !achievement) {
    throw createError("Points and achievement are required", 400);
  }

  if (Number(points) <= 0 || Number(points) > 500) {
    throw createError("Points must be between 1 and 500", 400);
  }

  const { reward, user } = await addManualReward({
    user: req.user,
    points: Number(points),
    achievement,
    reason: reason || "Manual eco action reward"
  });

  return sendSuccess(res, 201, "Reward added successfully", {
    reward,
    profile: {
      ecoScore: user.ecoScore,
      xp: user.xp,
      streak: user.streak,
      badges: user.badges
    }
  });
});

module.exports = {
  addReward,
  getRewards
};
