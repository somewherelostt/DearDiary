"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  pageTransition,
  staggerContainer,
  staggerItem,
  bounce,
} from "@/lib/animations";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <Badge
              variant="yellow"
              className="mb-6 text-base px-6 py-2 inline-flex items-center gap-2"
            >
              <motion.span animate={bounce}>✨</motion.span>
              AI-Powered Mood Journal
            </Badge>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6 leading-none"
            variants={staggerItem}
          >
            Dear<span className="text-yellow">Diary</span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl font-bold mb-8 text-gray-700"
            variants={staggerItem}
          >
            A journal that shifts colors with your emotions
          </motion.p>

          <motion.p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium"
            variants={staggerItem}
          >
            Write freely while AI detects your mood in real-time, transforming
            your journal with beautiful color transitions. Track patterns, find
            insights, and express yourself.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={staggerItem}
          >
            <Link href="/journal">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="default" className="text-lg">
                  Start Journaling
                </Button>
              </motion.div>
            </Link>
            <Link href="/analytics">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="reverse" className="text-lg">
                  View Analytics
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-yellow/10">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card accentColor="#FFD700">
            <CardHeader>
              <CardTitle>🎨 Live Mood Detection</CardTitle>
              <CardDescription>
                Watch your journal transform as you write
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                AI-powered sentiment analysis detects your emotions in
                real-time, shifting background colors to match your mood.
              </p>
            </CardContent>
          </Card>

          <Card accentColor="#FF69B4">
            <CardHeader>
              <CardTitle>📊 Analytics Dashboard</CardTitle>
              <CardDescription>
                Understand your emotional patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                Beautiful charts and heatmaps reveal your mood trends over time.
                Discover insights about yourself.
              </p>
            </CardContent>
          </Card>

          <Card accentColor="#00FFFF">
            <CardHeader>
              <CardTitle>🔒 Privacy First</CardTitle>
              <CardDescription>Your thoughts stay private</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                Client-side encryption keeps sensitive entries secure. Works
                offline. You own your data.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mood Colors Demo */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          Mood Palette
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Joyful", color: "joyful", emoji: "😊" },
            { label: "Calm", color: "calm", emoji: "😌" },
            { label: "Sad", color: "sad", emoji: "😢" },
            { label: "Angry", color: "angry", emoji: "😠" },
            { label: "Anxious", color: "anxious", emoji: "😰" },
            { label: "Neutral", color: "neutral", emoji: "😐" },
          ].map((mood) => (
            <div
              key={mood.label}
              className="border-3 border-black rounded-sm shadow-neo-lg p-8 text-center hover:shadow-neo transition-all"
            >
              <div className="text-5xl mb-4">{mood.emoji}</div>
              <Badge
                variant={
                  mood.color as "joyful" | "calm" | "anxious" | "neutral"
                }
                className="text-base px-4 py-2"
              >
                {mood.label}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-20 bg-cyan/10">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          Powered By
        </h2>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {[
            "Next.js 16",
            "TypeScript",
            "Sanity CMS",
            "Groq AI",
            "GROQ Queries",
            "Zustand",
            "Tailwind CSS",
            "Neobrutalism",
          ].map((tech) => (
            <Badge key={tech} variant="purple" className="text-base px-6 py-3">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto border-4 shadow-neo-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-4">
              Ready to start your journey?
            </CardTitle>
            <CardDescription className="text-lg">
              Join DearDiary and discover how your mood shapes your story
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <Button
              size="lg"
              variant="yellow"
              className="text-xl px-12 py-6 h-auto"
            >
              Get Started Free
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-lg mb-2">DearDiary</p>
          <p className="font-medium text-gray-600">
            Your emotions, beautifully captured
          </p>
          <div className="flex gap-4 justify-center mt-4">
            <Badge variant="lime">Neobrutalism Design</Badge>
            <Badge variant="pink">AI-Powered</Badge>
            <Badge variant="cyan">Open Source</Badge>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
