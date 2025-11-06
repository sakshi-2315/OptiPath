import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error(
    "Missing GOOGLE_API_KEY in .env. Please create one at https://aistudio.google.com/app/apikey"
  );
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function getCareerChatResponse(messageHistory) {
  try {
    const conversation = messageHistory
      .map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`)
      .join("\n");

    const prompt = `
You are a professional AI career coach named OptiPath AI.

You can ONLY answer questions related to:
- Job search
- Resume building
- Interview preparation
- Career growth
- Salary negotiation
- Skill improvement

If the user asks about anything unrelated to career (like jokes, personal life, entertainment, or general topics),
reply strictly with: "I'm here only to assist with career-related guidance."

Conversation so far:
${conversation}
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return reply;
  } catch (error) {
    console.error("AI Career Chat Error:", error);
    return "Sorry, I couldn’t process your question. Please try again!";
  }
}
