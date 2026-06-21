import express from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBiiumYK2hMjxNuFEiFOAO69uVmjnQDc_4");

// POST /api/v1/waste-scans/upload
router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    // Read the file and convert to base64
    const fileBytes = fs.readFileSync(req.file.path);
    const base64Image = fileBytes.toString('base64');
    
    const prompt = `Analyze this image. If it is a waste item, identify it. If it is NOT waste (for example, a car, a person, a landscape, a normal non-discarded object), identify what it is but state that it is not waste. 
Provide a JSON response with exactly the following keys:
- wasteType (string, e.g., "PET Plastic Bottle" or "Car (Not Waste)")
- category (string, must be one of: "Dry Waste", "Wet Waste", "E-Waste", "Hazardous Waste", "Bulk Recycling", or "Not Applicable")
- recyclable (string, e.g., "Highly Recyclable", "Compostable", "Not Recyclable", or "N/A")
- disposal (string, e.g., "Rinse and place in blue bin", or "N/A")
- confidence (number between 0 and 100)
- impact (object with keys: co2, water, energy as string values representing savings, e.g. {"co2": "0.15", "water": "1.2", "energy": "0.4"}. Use "0.0" for all if not waste)

Respond strictly with valid JSON.`;

    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: req.file.mimetype,
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
    
    let detectionResult;
    try {
      detectionResult = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse JSON:", responseText);
      detectionResult = {
        wasteType: "Unknown Item",
        category: "Not Applicable",
        recyclable: "N/A",
        disposal: "Could not determine",
        confidence: 0,
        impact: { co2: "0.0", water: "0.0", energy: "0.0" }
      };
    }

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      data: {
        detectionResult
      }
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    try {
      fs.writeFileSync('gemini-error.log', error.toString() + '\\n' + (error.stack || ''));
    } catch (e) {}
    // Cleanup on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

export default router;
