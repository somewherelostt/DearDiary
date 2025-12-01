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
          content: `You are a sentiment analysis expert. Analyze the emotional sentiment of the given text and return ONLY a JSON object with this exact structure:
{
  "score": <number between -1 (very negative) and 1 (very positive)>,
  "intensity": <number between 0 (weak) and 1 (strong emotion)>,
  "keywords": [<array of up to 5 most emotionally significant words from the text>]
}

Return ONLY valid JSON, no additional text.`,
        },
        {
          role: "user",
          content: text.slice(0, 500),
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      max_tokens: 200,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error("No response from Groq API");
    }

    // Parse the JSON response
    const parsed = JSON.parse(responseText);
    const score = Math.max(-1, Math.min(1, parsed.score || 0));
    const intensity = Math.max(0, Math.min(1, parsed.intensity || 0));
    const keywords = Array.isArray(parsed.keywords)
      ? parsed.keywords.slice(0, 5)
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
      { error: "Failed to analyze sentiment" },
      { status: 500 }
    );
  }
}
