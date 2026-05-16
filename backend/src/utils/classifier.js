const wasteGuide = require("../data/wasteGuide.json");

const fallbackItems = [
  "Plastic Bottle",
  "Food Scraps",
  "Battery Cell",
  "Paper/Cardboard",
  "Electronic Waste"
];

const inferWasteItem = (filename = "", hint = "") => {
  const searchable = `${filename} ${hint}`.toLowerCase();
  const match = wasteGuide.find((item) =>
    item.keywords.some((keyword) => searchable.includes(keyword))
  );

  if (match) return match;

  const randomName = fallbackItems[Math.floor(Math.random() * fallbackItems.length)];
  return wasteGuide.find((item) => item.wasteType === randomName) || wasteGuide[0];
};

module.exports = {
  inferWasteItem
};
