const calculateScanPoints = ({ recyclable, category, confidence }) => {
  const base = recyclable ? 25 : 12;
  const categoryBonus = category === "Hazardous Waste" || category === "E-Waste" ? 18 : 8;
  const confidenceBonus = confidence >= 90 ? 10 : confidence >= 75 ? 6 : 3;
  return base + categoryBonus + confidenceBonus;
};

const calculateEcoScore = ({ xp, streak }) => {
  return Math.min(1000, Math.round(xp * 0.7 + streak * 12));
};

const resolveBadges = ({ xp, streak, scanCount }) => {
  const badges = [];

  if (scanCount >= 1) badges.push("First Sort");
  if (scanCount >= 10) badges.push("Recycling Regular");
  if (xp >= 250) badges.push("Eco Champion");
  if (streak >= 7) badges.push("7-Day Green Streak");

  return badges;
};

module.exports = {
  calculateScanPoints,
  calculateEcoScore,
  resolveBadges
};
