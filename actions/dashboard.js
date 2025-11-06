"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load Gemini API Key
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error(
    "Missing GOOGLE_API_KEY in .env. Please create one at https://aistudio.google.com/app/apikey"
  );
}
// Initialize Gemini Model
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
// Generate AI Insights
export const generateAIInsights = async (industry) => {
  try {
    const prompt = `
      Analyze the current state of the ${industry} industry and provide insights ONLY in this JSON format:
      {
        "salaryRanges": [
          { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
        ],
        "growthRate": number,
        "demandLevel": "High" | "Medium" | "Low",
        "topSkills": ["skill1", "skill2"],
        "marketOutlook": "Positive" | "Neutral" | "Negative",
        "keyTrends": ["trend1", "trend2"],
        "recommendedSkills": ["skill1", "skill2"]
      }

      Return ONLY pure JSON — no markdown or text.
      Include at least 5 roles, 5 skills, and 5 trends.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleaned = text.replace(/```(?:json)?|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // Normalize enums
    parsed.demandLevel = parsed.demandLevel.toUpperCase();      
    parsed.marketOutlook = parsed.marketOutlook.toUpperCase();  

    return parsed;
  } catch (err) {
    console.error("Error generating AI insights:", err);
    throw new Error("Failed to generate AI insights");
  }
};

// Fetch or Generate Industry Insights
export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { industryInsight: true },
  });

  if (!user) throw new Error("User not found");

  const userIndustry = user.industryInsight?.industry || user.industry;
  if (!userIndustry) throw new Error("User industry not specified");

  if (!user.industryInsight) {
    const insights = await generateAIInsights(userIndustry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: userIndustry,
        salaryRanges: insights.salaryRanges,
        growthRate: insights.growthRate,
        demandLevel: insights.demandLevel,
        topSkills: insights.topSkills,
        marketOutlook: insights.marketOutlook,
        keyTrends: insights.keyTrends,
        recommendedSkills: insights.recommendedSkills,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}




