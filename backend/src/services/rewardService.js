const Reward = require("../models/Reward");
const WasteScan = require("../models/WasteScan");
const { calculateEcoScore, calculateScanPoints, resolveBadges } = require("../utils/ecoScore");

const awardScanReward = async ({ user, aiResult }) => {
  const points = calculateScanPoints(aiResult);
  const scanCount = await WasteScan.countDocuments({ user: user._id });

  user.xp += points;
  user.streak += 1;
  user.ecoScore = calculateEcoScore({ xp: user.xp, streak: user.streak });
  user.badges = [...new Set([...user.badges, ...resolveBadges({ xp: user.xp, streak: user.streak, scanCount: scanCount + 1 })])];
  await user.save();

  const reward = await Reward.create({
    user: user._id,
    points,
    achievement: aiResult.recyclable ? "Recyclable Hero" : "Responsible Sorter",
    reason: `${aiResult.wasteType} sorted as ${aiResult.category}`
  });

  return { points, reward, user };
};

const addManualReward = async ({ user, points, achievement, reason }) => {
  user.xp += points;
  user.ecoScore = calculateEcoScore({ xp: user.xp, streak: user.streak });
  user.badges = [...new Set([...user.badges, achievement])];
  await user.save();

  const reward = await Reward.create({
    user: user._id,
    points,
    achievement,
    reason
  });

  return { reward, user };
};

module.exports = {
  addManualReward,
  awardScanReward
};
