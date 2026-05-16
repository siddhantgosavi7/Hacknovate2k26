const asyncHandler = require("express-async-handler");
const Pickup = require("../models/Pickup");
const { createError, sendSuccess } = require("../utils/helpers");

const createPickup = asyncHandler(async (req, res) => {
  const { wasteCategory, address, pickupDate, notes } = req.body;

  if (!wasteCategory || !address || !pickupDate) {
    throw createError("Waste category, address and pickup date are required", 400);
  }

  const scheduledDate = new Date(pickupDate);
  if (Number.isNaN(scheduledDate.getTime())) {
    throw createError("Pickup date is invalid", 400);
  }

  if (scheduledDate < new Date()) {
    throw createError("Pickup date must be in the future", 400);
  }

  const pickup = await Pickup.create({
    user: req.user._id,
    wasteCategory,
    address,
    pickupDate: scheduledDate,
    notes
  });

  return sendSuccess(res, 201, "Pickup scheduled successfully", {
    pickup
  });
});

const getPickups = asyncHandler(async (req, res) => {
  const pickups = await Pickup.find({ user: req.user._id }).sort({ pickupDate: 1 });

  return sendSuccess(res, 200, "Pickups fetched successfully", {
    count: pickups.length,
    pickups
  });
});

module.exports = {
  createPickup,
  getPickups
};
