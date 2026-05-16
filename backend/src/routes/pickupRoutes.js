const express = require("express");
const { createPickup, getPickups } = require("../controllers/pickupController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createPickup);
router.get("/all", protect, getPickups);

module.exports = router;
