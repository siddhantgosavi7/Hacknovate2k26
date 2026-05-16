const express = require("express");
const { getHistory, scanWaste } = require("../controllers/wasteController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/scan", protect, upload.single("image"), scanWaste);
router.get("/history", protect, getHistory);

module.exports = router;
