import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getMoodLabel, moodToHsl } from "@/lib/utils";

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (!groq) {
      return NextResponse.json(
        { error: "GROQ_API_KEY not configured" },
        { status: 503 }
      );
    }

    // Call Groq API for sentiment analysis
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert emotional intelligence AI analyzing journal entries. Analyze the emotional sentiment and respond with ONLY a JSON object:

{
  "score": <number from -1 to 1, where -1 is extremely negative/sad/angry, 0 is neutral, and 1 is extremely positive/joyful>,
  "intensity": <number from 0 to 1, where 0 is emotionally flat and 1 is very intense/strong emotions>,
  "keywords": [<3-5 most emotionally significant words that reveal the user's feelings>]
}

Consider:
- Positive emotions: happiness, joy, excitement, love, gratitude, peace, calm
- Negative emotions: sadness, anger, anxiety, fear, frustration, worry, depression
- Intensity: how strong are the emotions expressed?
- Context: look beyond surface words to understand deeper feelings

Return ONLY the JSON object, nothing else.`,
        },
        {
          role: "user",
          content: text.slice(0, 500),
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 250,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error("No response from Groq API");
    }

    // Clean and parse the JSON response
    let cleanedResponse = responseText.trim();

    // Remove markdown code blocks if present
    if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse
        .replace(/```json?\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
    }

    const parsed = JSON.parse(cleanedResponse);
    const score = Math.max(-1, Math.min(1, parsed.score || 0));
    const intensity = Math.max(0, Math.min(1, parsed.intensity || 0));
    const keywords = Array.isArray(parsed.keywords)
      ? parsed.keywords.slice(0, 5).filter((k: any) => typeof k === "string")
      : [];

    const label = getMoodLabel(score, intensity);
    const color = moodToHsl(score, intensity);

    return NextResponse.json({
      score,
      intensity,
      label,
      color,
      keywords,
    });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze sentiment",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
