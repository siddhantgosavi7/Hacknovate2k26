const WasteScan = require("../models/WasteScan");
const Pickup = require("../models/Pickup");
const Reward = require("../models/Reward");

const buildDashboardAnalytics = async (userId) => {
  const [scans, pickups, rewards] = await Promise.all([
    WasteScan.find({ user: userId }).sort({ createdAt: -1 }).lean(),
    Pickup.find({ user: userId }).sort({ pickupDate: -1 }).lean(),
    Reward.find({ user: userId }).sort({ createdAt: -1 }).lean()
  ]);

  const distribution = scans.reduce((acc, scan) => {
    acc[scan.category] = (acc[scan.category] || 0) + 1;
    return acc;
  }, {});

  const recyclableCount = scans.filter((scan) => scan.recyclable).length;
  const totalPoints = rewards.reduce((sum, reward) => sum + reward.points, 0);

  return {
    summary: {
      totalScans: scans.length,
      recyclableItems: recyclableCount,
      pickupsScheduled: pickups.length,
      totalRewardPoints: totalPoints,
      estimatedCo2SavedKg: Number((recyclableCount * 0.62 + pickups.length * 1.4).toFixed(2))
    },
    wasteDistribution: Object.entries(distribution).map(([category, count]) => ({
      category,
      count,
      percentage: scans.length ? Math.round((count / scans.length) * 100) : 0
    })),
    recyclingTrends: Array.from({ length: 7 }).map((_, index) => ({
      day: `Day ${index + 1}`,
      scans: Math.max(0, scans.length - index + Math.floor(Math.random() * 3)),
      recycled: Math.max(0, recyclableCount - index)
    })).reverse(),
    participationStats: {
      weeklyStreak: Math.min(7, scans.length),
      communityRank: scans.length > 12 ? "Top 5%" : scans.length > 5 ? "Top 20%" : "New Contributor",
      nextMilestone: totalPoints >= 500 ? "City Eco Leader" : "Reach 500 XP"
    },
    recentActivity: scans.slice(0, 5)
  };
};

module.exports = {
  buildDashboardAnalytics
};
