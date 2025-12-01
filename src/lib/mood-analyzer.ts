import { MoodData } from "@/types";
import { getMoodLabel, moodToHsl } from "./utils";

// Simple lexicon-based fallback analyzer
const MOOD_LEXICON = {
  joyful: [
    "happy",
    "joy",
    "excited",
    "amazing",
    "wonderful",
    "great",
    "awesome",
    "love",
    "blessed",
    "grateful",
    "fantastic",
    "brilliant",
  ],
  calm: [
    "peaceful",
    "calm",
    "relaxed",
    "serene",
    "quiet",
    "tranquil",
    "gentle",
    "soft",
    "easy",
    "comfortable",
  ],
  sad: [
    "sad",
    "unhappy",
    "depressed",
    "down",
    "disappointed",
    "hurt",
    "pain",
    "crying",
    "tears",
    "heartbroken",
    "lonely",
  ],
  angry: [
    "angry",
    "mad",
    "furious",
    "rage",
    "hate",
    "annoyed",
    "frustrated",
    "irritated",
    "pissed",
  ],
  anxious: [
    "anxious",
    "worried",
    "nervous",
    "scared",
    "afraid",
    "fear",
    "panic",
    "stress",
    "overwhelmed",
    "tense",
  ],
};

function analyzeLexicon(text: string): { score: number; intensity: number } {
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  let emotionCount = 0;

  words.forEach((word) => {
    if (
      MOOD_LEXICON.joyful.some((w) => word.includes(w)) ||
      MOOD_LEXICON.calm.some((w) => word.includes(w))
    ) {
      positiveCount++;
      emotionCount++;
    }
    if (
      MOOD_LEXICON.sad.some((w) => word.includes(w)) ||
      MOOD_LEXICON.angry.some((w) => word.includes(w)) ||
      MOOD_LEXICON.anxious.some((w) => word.includes(w))
    ) {
      negativeCount++;
      emotionCount++;
    }
  });

  const totalWords = words.length;
  const score =
    totalWords > 0 ? ((positiveCount - negativeCount) / totalWords) * 10 : 0;
  const intensity =
    totalWords > 0 ? Math.min((emotionCount / totalWords) * 5, 1) : 0;

  return {
    score: Math.max(-1, Math.min(1, score)),
    intensity: Math.max(0, Math.min(1, intensity)),
  };
}

function extractKeywords(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const commonWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "is",
    "was",
    "are",
    "were",
    "be",
    "been",
    "being",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "my",
    "your",
    "his",
    "her",
    "its",
    "our",
    "their",
  ]);

  const keywords = words
    .filter((word) => word.length > 3 && !commonWords.has(word))
    .slice(0, 5);

  return Array.from(new Set(keywords));
}

// Cache for mood analysis results
const moodCache = new Map<string, MoodData>();

export async function analyzeSentiment(
  text: string,
  useGroq: boolean = false
): Promise<MoodData> {
  if (!text || text.trim().length < 10) {
    return {
      score: 0,
      intensity: 0,
      label: "neutral",
      color: "#D3D3D3",
      keywords: [],
    };
  }

  // Check cache first
  const cacheKey = text.slice(0, 100);
  if (moodCache.has(cacheKey)) {
    return moodCache.get(cacheKey)!;
  }

  try {
    if (useGroq && process.env.GROQ_API_KEY) {
      // Try Groq API
      const response = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.slice(0, 500) }),
      });

      if (response.ok) {
        const data = await response.json();
        moodCache.set(cacheKey, data);
        return data;
      }
    }
  } catch (error) {
    console.warn("Groq API failed, using lexicon fallback:", error);
  }

  // Fallback to lexicon-based analysis
  const { score, intensity } = analyzeLexicon(text);
  const label = getMoodLabel(score, intensity);
  const color = moodToHsl(score, intensity);
  const keywords = extractKeywords(text);

  const moodData: MoodData = {
    score,
    intensity,
    label,
    color,
    keywords,
  };

  moodCache.set(cacheKey, moodData);
  return moodData;
}

export function clearMoodCache() {
  moodCache.clear();
}
