const express = require("express");
const { sendMessage } = require("../controllers/chatbotController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/message", protect, sendMessage);

module.exports = router;
