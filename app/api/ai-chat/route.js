import { getCareerChatResponse } from "@/actions/ai-chat";

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const reply = await getCareerChatResponse(messages);
    return Response.json({ reply });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ reply: "Error generating response." }, { status: 500 });
  }
}
