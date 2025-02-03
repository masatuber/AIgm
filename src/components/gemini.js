
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function geminiRun(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"}, { apiVersion: 'v1beta' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  
   return response.text();

}
