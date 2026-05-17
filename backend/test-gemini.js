import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyBiiumYK2hMjxNuFEiFOAO69uVmjnQDc_4");

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello, world!");
    console.log("Success:", result.response.text());
  } catch (err) {
    console.error("Gemini Error:", err);
  }
}

run();
