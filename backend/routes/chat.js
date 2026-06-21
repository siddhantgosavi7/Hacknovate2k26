import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBiiumYK2hMjxNuFEiFOAO69uVmjnQDc_4");

// POST /api/v1/chat
router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `You are EcoSort AI, a smart assistant helping citizens with waste segregation.
Keep your answers brief, friendly, and practical (under 3 sentences if possible).
Answer the user's question about waste:
User: "${message}"`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      data: {
        reply: text
      }
    });
  } catch (error) {
    console.error('Gemini Chat API Error:', error);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

export default router;
