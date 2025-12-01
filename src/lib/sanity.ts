import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (projectId === "placeholder" || projectId === "your-sanity-project-id") {
  console.warn(
    "⚠️ Warning: Sanity is not properly configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-12-01",
  useCdn: false, // Use `true` for production
  token: process.env.SANITY_API_TOKEN,
});

// For client-side usage (no token)
export const clientFetch = createClient({
  projectId,
  dataset,
  apiVersion: "2024-12-01",
  useCdn: true,
});
