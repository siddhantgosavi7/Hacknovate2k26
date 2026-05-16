const responses = require("../data/chatbotResponses.json");

const fallbackResponses = [
  "Separate dry and wet waste first. Clean recyclable items have a much higher chance of being processed correctly.",
  "When in doubt, avoid mixing hazardous items with household waste. Use a verified collection point.",
  "EcoSort tip: rinse containers, flatten cardboard, and keep food waste away from paper and plastic recyclables."
];

const getChatbotReply = async (message = "") => {
  const normalized = message.toLowerCase();
  const match = responses.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );

  return {
    answer: match
      ? match.answer
      : fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
    confidence: match ? 94 : 78,
    source: match ? "EcoSort knowledge base" : "General sustainability guidance"
  };
};

module.exports = {
  getChatbotReply
};
