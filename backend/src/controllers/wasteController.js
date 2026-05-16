const asyncHandler = require("express-async-handler");
const WasteScan = require("../models/WasteScan");
const { detectWaste } = require("../services/aiDetectionService");
const { awardScanReward } = require("../services/rewardService");
const { createError, sendSuccess } = require("../utils/helpers");

const scanWaste = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw createError("Waste image is required", 400);
  }

  const aiResult = await detectWaste({
    file: req.file,
    hint: req.body.hint
  });

  const { points } = await awardScanReward({
    user: req.user,
    aiResult
  });

  const imageUrl = req.file.path || req.file.secure_url || `/uploads/${req.file.filename}`;
  const publicId = req.file.filename || req.file.public_id || null;

  const scan = await WasteScan.create({
    user: req.user._id,
    image: {
      url: imageUrl,
      publicId
    },
    wasteType: aiResult.wasteType,
    category: aiResult.category,
    recyclable: aiResult.recyclable,
    confidence: aiResult.confidence,
    bin: aiResult.bin,
    ecoImpact: aiResult.ecoImpact,
    disposalTip: aiResult.disposalTip,
    pointsAwarded: points
  });

  return sendSuccess(res, 201, "Waste scanned successfully", {
    scan,
    ai: aiResult,
    reward: {
      pointsAwarded: points,
      ecoScore: req.user.ecoScore,
      xp: req.user.xp,
      streak: req.user.streak,
      badges: req.user.badges
    }
  });
});

const getHistory = asyncHandler(async (req, res) => {
  const scans = await WasteScan.find({ user: req.user._id }).sort({ createdAt: -1 });

  return sendSuccess(res, 200, "Waste scan history fetched successfully", {
    count: scans.length,
    scans
  });
});

module.exports = {
  getHistory,
  scanWaste
};
