import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function moodToHsl(score: number, intensity: number): string {
  // score: -1 (negative) to +1 (positive)
  // intensity: 0..1 (how strong)
  const hue = Math.round((score + 1) * 120); // -1->0 (red), 0->120 (yellow/green), +1->240 (blue)
  const sat = Math.round(40 + intensity * 40); // 40-80%
  const light = Math.round(60 - Math.abs(score) * 20); // 60% neutral -> 40% intense
  return `hsl(${hue} ${sat}% ${light}%)`;
}

export type MoodLabel =
  | "joyful"
  | "calm"
  | "neutral"
  | "anxious"
  | "sad"
  | "angry";

export function getMoodLabel(score: number, intensity: number): MoodLabel {
  if (score > 0.4) return "joyful";
  if (score >= 0 && score <= 0.4 && intensity < 0.5) return "calm";
  if (Math.abs(score) < 0.3 && intensity < 0.3) return "neutral";
  if (score < 0 && intensity > 0.6) return "anxious";
  if (score < -0.3 && intensity <= 0.6) return "sad";
  if (score < -0.5 && intensity > 0.7) return "angry";
  return "neutral";
}

export function getMoodColor(label: MoodLabel): string {
  const colors: Record<MoodLabel, string> = {
    joyful: "#FFD700",
    calm: "#87CEEB",
    sad: "#6495ED",
    angry: "#DC143C",
    anxious: "#FF8C00",
    neutral: "#D3D3D3",
  };
  return colors[label];
}
