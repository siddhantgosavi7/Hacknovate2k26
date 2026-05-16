const asyncHandler = require("express-async-handler");
const { getChatbotReply } = require("../services/chatbotService");
const { createError, sendSuccess } = require("../utils/helpers");

const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim().length < 2) {
    throw createError("Message must be at least 2 characters", 400);
  }

  const reply = await getChatbotReply(message);

  return sendSuccess(res, 200, "Chatbot response generated successfully", {
    question: message,
    ...reply
  });
});

module.exports = {
  sendMessage
};
