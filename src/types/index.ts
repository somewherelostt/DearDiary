export interface MoodData {
  score: number; // -1 to 1
  intensity: number; // 0 to 1
  label: MoodLabel;
  color: string;
  keywords: string[];
}

export type MoodLabel =
  | "joyful"
  | "calm"
  | "neutral"
  | "anxious"
  | "sad"
  | "angry";

export interface JournalEntry {
  _id: string;
  _type: "journalEntry";
  title: string;
  body: unknown; // Portable Text - complex structure from Sanity
  snippet: string;
  authorRef: {
    _type: "reference";
    _ref: string;
  };
  createdAt: string;
  updatedAt: string;
  mood: MoodData;
  tags: string[];
  encrypted: boolean;
  wordCount: number;
  readingTime: number;
}

export interface User {
  _id: string;
  _type: "user";
  name: string;
  email: string;
  image?: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  colorPalette: "default" | "colorblind" | "minimal";
  disableAnimations: boolean;
  defaultPrivacy: boolean;
}

export interface MoodPrompt {
  _id: string;
  _type: "moodPrompt";
  text: string;
  mood: MoodLabel;
  category: "reflection" | "gratitude" | "creative" | "therapeutic";
  active: boolean;
}
