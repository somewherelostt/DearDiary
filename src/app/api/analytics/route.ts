import { NextRequest, NextResponse } from "next/server";
import { aggregateMoodCounts, fetchMoodTimeline } from "@/lib/groq-queries";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const days = parseInt(searchParams.get("days") || "30");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const [moodCounts, moodTimeline] = await Promise.all([
      aggregateMoodCounts(userId),
      fetchMoodTimeline(userId, days),
    ]);

    // Calculate total entries
    const totalEntries = Object.values(moodCounts).reduce(
      (sum, count) => sum + count,
      0
    );

    // Calculate average sentiment
    const avgSentiment =
      moodTimeline.reduce((sum, entry) => sum + entry.score, 0) /
        moodTimeline.length || 0;

    // Find dominant mood
    const dominantMood = Object.entries(moodCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    return NextResponse.json({
      moodCounts,
      moodTimeline,
      stats: {
        totalEntries,
        avgSentiment: avgSentiment.toFixed(2),
        dominantMood,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
