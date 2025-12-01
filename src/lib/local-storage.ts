import { MoodData } from "@/types";

export interface StoredEntry {
  id: string;
  title: string;
  content: string;
  mood: MoodData;
  createdAt: string;
  updatedAt: string;
  wordCount: number;
}

const ENTRIES_KEY = "dearDiary_entries";

export function saveEntry(
  entry: Omit<StoredEntry, "id" | "createdAt" | "updatedAt">
): StoredEntry {
  const entries = getAllEntries();
  const newEntry: StoredEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  entries.push(newEntry);
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  return newEntry;
}

export function getAllEntries(): StoredEntry[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(ENTRIES_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getEntry(id: string): StoredEntry | null {
  const entries = getAllEntries();
  return entries.find((e) => e.id === id) || null;
}

export function updateEntry(
  id: string,
  updates: Partial<StoredEntry>
): StoredEntry | null {
  const entries = getAllEntries();
  const index = entries.findIndex((e) => e.id === id);

  if (index === -1) return null;

  entries[index] = {
    ...entries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  return entries[index];
}

export function deleteEntry(id: string): boolean {
  const entries = getAllEntries();
  const filtered = entries.filter((e) => e.id !== id);

  if (filtered.length === entries.length) return false;

  localStorage.setItem(ENTRIES_KEY, JSON.stringify(filtered));
  return true;
}

export function getEntriesByDateRange(days: number = 30): StoredEntry[] {
  const entries = getAllEntries();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  return entries.filter((e) => new Date(e.createdAt) >= cutoff);
}

export function getAnalytics(days: number = 30) {
  const entries = getEntriesByDateRange(days);

  if (entries.length === 0) {
    return {
      totalEntries: 0,
      avgSentiment: "0.00",
      dominantMood: "neutral",
      moodCounts: {
        joyful: 0,
        calm: 0,
        neutral: 0,
        anxious: 0,
        sad: 0,
        angry: 0,
      },
      moodTimeline: [],
    };
  }

  // Count moods
  const moodCounts: Record<string, number> = {
    joyful: 0,
    calm: 0,
    neutral: 0,
    anxious: 0,
    sad: 0,
    angry: 0,
  };

  entries.forEach((entry) => {
    const label = entry.mood.label;
    if (label in moodCounts) {
      moodCounts[label]++;
    }
  });

  // Calculate average sentiment
  const totalScore = entries.reduce((sum, entry) => sum + entry.mood.score, 0);
  const avgSentiment = (totalScore / entries.length).toFixed(2);

  // Find dominant mood
  const dominantMood = Object.entries(moodCounts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  // Create timeline
  const moodTimeline = entries
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .map((entry) => ({
      date: entry.createdAt,
      score: entry.mood.score,
      label: entry.mood.label,
    }));

  return {
    totalEntries: entries.length,
    avgSentiment,
    dominantMood,
    moodCounts,
    moodTimeline,
  };
}

export function clearAllEntries(): void {
  localStorage.removeItem(ENTRIES_KEY);
}
