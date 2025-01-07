//AIzaSyBQC9-rWXHJP_pM7xvnhKQag7ik0uZQ5Ek
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyBQC9-rWXHJP_pM7xvnhKQag7ik0uZQ5Ek"
const genAI = new GoogleGenerativeAI(API_KEY);

export async function geminiRun(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const result = await model.generateContent(prompt);
  const response = await result.response;
   return response.text();

}