import { NextRequest, NextResponse } from "next/server";
import { fetchEntry, updateEntry, deleteEntry } from "@/lib/groq-queries";

// GET /api/entries/[id] - Fetch a single entry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entry = await fetchEntry(id);

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ entry });
  } catch (error) {
    console.error("Error fetching entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch entry" },
      { status: 500 }
    );
  }
}

// PATCH /api/entries/[id] - Update an entry
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    const entry = await updateEntry(id, updates);

    return NextResponse.json({ entry });
  } catch (error) {
    console.error("Error updating entry:", error);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}

// DELETE /api/entries/[id] - Delete an entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteEntry(id);

    return NextResponse.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}
