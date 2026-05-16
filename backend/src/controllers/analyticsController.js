const asyncHandler = require("express-async-handler");
const { buildDashboardAnalytics } = require("../services/analyticsService");
const { sendSuccess } = require("../utils/helpers");

const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const analytics = await buildDashboardAnalytics(req.user._id);

  return sendSuccess(res, 200, "Dashboard analytics generated successfully", analytics);
});

module.exports = {
  getDashboardAnalytics
};
