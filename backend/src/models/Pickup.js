const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    wasteCategory: {
      type: String,
      required: true,
      enum: ["Dry Waste", "Wet Waste", "Hazardous Waste", "E-Waste", "Bulk Waste", "Mixed Waste"]
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 6
    },
    pickupDate: {
      type: Date,
      required: true
    },
    notes: {
      type: String,
      default: "",
      maxlength: 500
    },
    status: {
      type: String,
      enum: ["Pending", "Scheduled", "In Progress", "Completed", "Cancelled"],
      default: "Scheduled"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pickup", pickupSchema);
