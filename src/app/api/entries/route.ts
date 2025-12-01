import { NextRequest, NextResponse } from "next/server";
import {
  createEntry,
  fetchRecentEntries,
  fetchEntriesByMood,
  searchEntries,
} from "@/lib/groq-queries";
import { JournalEntry, MoodLabel } from "@/types";

// GET /api/entries - Fetch entries with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const mood = searchParams.get("mood");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    let entries: JournalEntry[];

    if (search) {
      entries = await searchEntries(userId, search);
    } else if (mood) {
      entries = await fetchEntriesByMood(userId, mood as MoodLabel);
    } else {
      entries = await fetchRecentEntries(userId, limit);
    }

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

// POST /api/entries - Create a new entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      body: content,
      mood,
      tags,
      encrypted,
      wordCount,
      author,
    } = body;

    if (!title || !content || !mood || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const entry = await createEntry({
      _type: "journalEntry",
      title,
      body: content,
      snippet: content.substring(0, 150),
      authorRef: { _ref: author, _type: "reference" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mood,
      tags: tags || [],
      encrypted: encrypted || false,
      wordCount: wordCount || content.split(/\s+/).length,
      readingTime: Math.ceil((wordCount || content.split(/\s+/).length) / 200),
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}
