const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    points: {
      type: Number,
      required: true,
      min: 0
    },
    achievement: {
      type: String,
      required: true,
      trim: true
    },
    reason: {
      type: String,
      default: "Eco action completed"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reward", rewardSchema);
