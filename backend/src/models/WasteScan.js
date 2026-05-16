const mongoose = require("mongoose");

const wasteScanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, default: null }
    },
    wasteType: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ["Dry Waste", "Wet Waste", "Hazardous Waste", "E-Waste", "Sanitary Waste", "Unknown"]
    },
    recyclable: {
      type: Boolean,
      default: false
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    bin: {
      type: String,
      required: true
    },
    ecoImpact: {
      type: String,
      required: true
    },
    disposalTip: {
      type: String,
      required: true
    },
    pointsAwarded: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WasteScan", wasteScanSchema);
