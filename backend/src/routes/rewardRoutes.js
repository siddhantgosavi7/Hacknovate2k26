const express = require("express");
const { addReward, getRewards } = require("../controllers/rewardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getRewards);
router.post("/add", protect, addReward);

module.exports = router;
