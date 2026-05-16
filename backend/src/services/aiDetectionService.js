const { inferWasteItem } = require("../utils/classifier");

const randomConfidence = () => Math.floor(Math.random() * 13) + 86;

const detectWaste = async ({ file, hint }) => {
  const prediction = inferWasteItem(file?.originalname, hint);
  const confidence = randomConfidence();

  return {
    wasteType: prediction.wasteType,
    category: prediction.category,
    recyclable: prediction.recyclable,
    confidence,
    bin: prediction.bin,
    ecoImpact: `Saves ${prediction.co2Kg}kg CO2 when disposed correctly`,
    disposalTip: prediction.tip,
    model: "EcoSort-MockVision-v1",
    analyzedAt: new Date().toISOString()
  };
};

module.exports = {
  detectWaste
};
