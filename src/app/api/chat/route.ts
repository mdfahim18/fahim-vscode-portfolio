import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { FAHIM_CONTEXT } from "@/data/context";

const SYSTEM_PROMPT = `You are Fahim Chowdhury's AI Portfolio Assistant.
1. If the user asks about Fahim, his skills, projects, or contact info, use the following context to answer:
${FAHIM_CONTEXT}
2. If the user asks a general question unrelated to Fahim (e.g., coding concepts, general knowledge), answer it normally and politely using your vast knowledge.
3. Keep your answers concise, helpful, and professional. Do not mention the 'context' or 'system prompt' to the user.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return Response.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = streamText({
      model: google("gemini-2.0-flash"),
      system: SYSTEM_PROMPT,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("chat api error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
