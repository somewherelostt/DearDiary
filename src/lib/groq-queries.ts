import { client } from "./sanity";
import { JournalEntry, MoodLabel } from "@/types";

/**
 * Fetch recent entries for a user
 */
export async function fetchRecentEntries(
  userId: string,
  limit: number = 10
): Promise<JournalEntry[]> {
  const query = `*[_type == "journalEntry" && author._ref == $userId] | order(createdAt desc) [0...$limit] {
    _id,
    title,
    body,
    mood,
    tags,
    encrypted,
    wordCount,
    createdAt,
    updatedAt
  }`;

  return await client.fetch(query, { userId, limit });
}

/**
 * Fetch entries filtered by mood
 */
export async function fetchEntriesByMood(
  userId: string,
  mood: MoodLabel
): Promise<JournalEntry[]> {
  const query = `*[_type == "journalEntry" && author._ref == $userId && mood.label == $mood] | order(createdAt desc) {
    _id,
    title,
    body,
    mood,
    tags,
    encrypted,
    wordCount,
    createdAt,
    updatedAt
  }`;

  return await client.fetch(query, { userId, mood });
}

/**
 * Fetch entries in a date range
 */
export async function fetchEntriesInDateRange(
  userId: string,
  from: Date,
  to: Date
): Promise<JournalEntry[]> {
  const query = `*[_type == "journalEntry" && author._ref == $userId && createdAt >= $from && createdAt <= $to] | order(createdAt desc) {
    _id,
    title,
    body,
    mood,
    tags,
    encrypted,
    wordCount,
    createdAt,
    updatedAt
  }`;

  return await client.fetch(query, {
    userId,
    from: from.toISOString(),
    to: to.toISOString(),
  });
}

/**
 * Search entries by text
 */
export async function searchEntries(
  userId: string,
  searchTerm: string
): Promise<JournalEntry[]> {
  const query = `*[_type == "journalEntry" && author._ref == $userId && (title match $searchTerm || body match $searchTerm)] | order(createdAt desc) {
    _id,
    title,
    body,
    mood,
    tags,
    encrypted,
    wordCount,
    createdAt,
    updatedAt
  }`;

  return await client.fetch(query, { userId, searchTerm: `*${searchTerm}*` });
}

/**
 * Fetch a single entry by ID
 */
export async function fetchEntry(
  entryId: string
): Promise<JournalEntry | null> {
  const query = `*[_type == "journalEntry" && _id == $entryId][0] {
    _id,
    title,
    body,
    mood,
    tags,
    encrypted,
    wordCount,
    author,
    createdAt,
    updatedAt
  }`;

  return await client.fetch(query, { entryId });
}

/**
 * Aggregate mood counts for a user
 */
export async function aggregateMoodCounts(
  userId: string
): Promise<Record<MoodLabel, number>> {
  const query = `{
    "joyful": count(*[_type == "journalEntry" && author._ref == $userId && mood.label == "joyful"]),
    "calm": count(*[_type == "journalEntry" && author._ref == $userId && mood.label == "calm"]),
    "neutral": count(*[_type == "journalEntry" && author._ref == $userId && mood.label == "neutral"]),
    "anxious": count(*[_type == "journalEntry" && author._ref == $userId && mood.label == "anxious"]),
    "sad": count(*[_type == "journalEntry" && author._ref == $userId && mood.label == "sad"]),
    "angry": count(*[_type == "journalEntry" && author._ref == $userId && mood.label == "angry"])
  }`;

  return await client.fetch(query, { userId });
}

/**
 * Fetch mood timeline for the last N days
 */
export async function fetchMoodTimeline(
  userId: string,
  days: number = 30
): Promise<Array<{ date: string; score: number; label: MoodLabel }>> {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const query = `*[_type == "journalEntry" && author._ref == $userId && createdAt >= $from] | order(createdAt asc) {
    "date": createdAt,
    "score": mood.score,
    "label": mood.label
  }`;

  return await client.fetch(query, { userId, from: fromDate.toISOString() });
}

/**
 * Create a new journal entry
 */
export async function createEntry(
  entry: Omit<JournalEntry, "_id">
): Promise<JournalEntry> {
  return await client.create({
    _type: "journalEntry",
    ...entry,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Update an existing entry
 */
export async function updateEntry(
  entryId: string,
  updates: Partial<JournalEntry>
): Promise<JournalEntry> {
  return await client
    .patch(entryId)
    .set({ ...updates, updatedAt: new Date().toISOString() })
    .commit();
}

/**
 * Delete an entry
 */
export async function deleteEntry(entryId: string): Promise<void> {
  await client.delete(entryId);
}
