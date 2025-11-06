import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "optipath", // Unique app ID
  name: "optipath",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});