
"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";
import { auth } from "@clerk/nextjs/server";

// Update User Profile
export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Ensure user exists
  let user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(async (tx) => {
      // Check if industry insight exists
      let industryInsight = await tx.industryInsight.findUnique({
        where: { industry: data.industry },
      });

      if (!industryInsight) {
        const insights = await generateAIInsights(data.industry);

        industryInsight = await tx.industryInsight.create({
          data: {
            industry: data.industry,
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
      }

      // Update user profile
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: Array.isArray(data.skills)
            ? data.skills
            : data.skills.split(",").map((s) => s.trim()), // comma-separated to array
        },
      });

      return { updatedUser, industryInsight };
    }, { timeout: 10000 });

    revalidatePath("/");
    return result.updatedUser;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

// Check if User is Onboarded & Create User if Not Exists
export async function getUserOnboardingStatus() {
  const { userId, email, firstName, lastName } = await auth();
  if (!userId) throw new Error("Unauthorized");

  let user = await db.user.findUnique({ where: { clerkUserId: userId } });

  // ✅ Create user if it doesn't exist
  if (!user) {
    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email: email || `unknown-${userId}@example.com`,
        name: `${firstName || ""} ${lastName || ""}`.trim(),
        skills: [],
      },
    });
  }

  return { isOnboarded: !!user.industry };
}





