import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * @param {Array<{role:'system'|'user'|'assistant',content:string}>} contents
 */
export async function chatWithGemini(contents) {
  const res = await model.generateContent({ contents });
  return res.response.text();
}
