"use client";

import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FloatingAppInterface } from "@/components/landing/FloatingAppInterface";
import { MoodMixingBoard } from "@/components/landing/MoodMixingBoard";
import { EmotionMarquee } from "@/components/landing/EmotionMarquee";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Floating Island Navigation */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-fit"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="flex items-center justify-between gap-12 px-6 py-3 bg-white/80 backdrop-blur-md border border-black/5 rounded-full shadow-lg shadow-black/5">
          {/* Brand Mark */}
          <Link href="/" className="flex items-center">
            <BrandLogo variant="full" />
          </Link>

          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-600">
            <Link
              href="#features"
              className="hover:text-black transition-colors"
            >
              Features
            </Link>
            <Link
              href="#manifesto"
              className="hover:text-black transition-colors"
            >
              Manifesto
            </Link>
            <Link
              href="#pricing"
              className="hover:text-black transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Micro CTA */}
          <Link href="/journal">
            <motion.button
              className="bg-black text-white text-xs px-4 py-2 rounded-full font-bold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get App
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section - 12 Column Grid */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="w-full px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-7xl mx-auto">
            {/* Left: Content - 5 columns */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[1.5px] border-[#1a1a1a] rounded-full shadow-[3px_3px_0px_0px_#1a1a1a] mb-8"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  AI-Powered Journaling
                </span>
              </motion.div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight">
                Your emotions,{" "}
                <span className="relative inline-block bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Decoded
                </span>
              </h1>

              <p className="text-xl md:text-2xl font-medium mb-8 text-[#1a1a1a] max-w-xl leading-relaxed">
                A journal that understands you. Write freely while AI analyzes
                your emotions in real-time, creating beautiful patterns from
                your thoughts.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/journal">
                  <motion.div
                    whileHover={{ y: -2, boxShadow: "5px 5px 0px 0px #1a1a1a" }}
                    whileTap={{ y: 2, boxShadow: "none" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 bg-[#1a1a1a] text-white border-[1.5px] border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_0px_#1a1a1a] hover:bg-[#1a1a1a]"
                    >
                      Start Journaling
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/analytics">
                  <motion.div
                    whileHover={{ y: -2, boxShadow: "5px 5px 0px 0px #1a1a1a" }}
                    whileTap={{ y: 2, boxShadow: "none" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      size="lg"
                      variant="reverse"
                      className="text-lg px-8 py-6 bg-white border-[1.5px] border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_0px_#1a1a1a]"
                    >
                      View Analytics
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Right: Floating App Interface - 7 columns */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              <FloatingAppInterface />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dense Bento Grid - Swiss Design */}
      <section className="relative bg-neutral-50 w-full px-4 py-8">
        {/* Micro-Detail: Section Label */}
        <div className="absolute top-4 right-4 text-xs font-bold tracking-[0.3em] opacity-30"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="text-center mb-8 max-w-7xl mx-auto">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-4 opacity-60">
              Core Features
            </h2>
            <p className="text-5xl md:text-7xl font-black leading-tight">
              High-Fidelity Tools
            </p>
          </div>

          {/* Dense Grid Layout - Precision Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-7xl mx-auto">
            {/* Card 1: Context Aware Analysis - Spans 2 Columns */}
            <motion.div
              className="md:col-span-2 flex flex-col h-full bg-white border-2 border-neutral-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            >
              {/* Header */}
              <div className="p-4 border-b border-neutral-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Context Aware Analysis
                </h3>
              </div>

              {/* Chat Body */}
              <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="self-end bg-neutral-900 text-white py-2 px-4 rounded-2xl rounded-br-none max-w-xs text-sm">
                    I feel anxious today...
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex flex-col items-start">
                  <div className="self-start bg-neutral-100 border border-neutral-200 py-3 px-4 rounded-2xl rounded-bl-none max-w-md shadow-sm text-sm">
                    I sense some anxiety in your words. Let&apos;s explore
                    what&apos;s on your mind. Would you like to talk about it?
                  </div>
                  {/* Mood Tags */}
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                      Anxious
                    </span>
                    <span className="text-xs px-3 py-1 bg-neutral-200 text-neutral-700 rounded-full font-medium">
                      Reflective
                    </span>
                  </div>
                </div>
              </div>

              {/* Simulated Input Bar */}
              <div className="mt-auto border-t border-neutral-200 p-4 flex gap-2 items-center bg-neutral-50">
                <input
                  type="text"
                  placeholder="Reply to DearDiary..."
                  className="flex-1 bg-white border border-neutral-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  disabled
                />
                <button className="bg-black text-white p-2 rounded-full hover:scale-105 active:scale-95 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Card 2: Emotional Trends - 1 Column */}
            <motion.div
              className="flex flex-col h-full bg-white border-2 border-neutral-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              {/* Header */}
              <div className="p-6">
                <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                  Weekly Overview
                </h3>
                <h2 className="text-2xl font-bold font-display">
                  Emotional Trends
                </h2>
              </div>

              {/* Chart Visual */}
              <div className="flex-1 flex flex-col px-6 pb-6">
                <div className="flex items-end justify-between gap-2 h-48">
                  {/* Monday */}
                  <div className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full h-full flex items-end">
                      <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-neutral-700 bg-white px-2 py-1 rounded shadow-sm">
                        65%
                      </span>
                      <div
                        className="w-full bg-indigo-300 rounded-t-md hover:opacity-80 transition-all"
                        style={{ height: "65%" }}
                      />
                    </div>
                  </div>

                  {/* Tuesday */}
                  <div className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full h-full flex items-end">
                      <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-neutral-700 bg-white px-2 py-1 rounded shadow-sm">
                        85%
                      </span>
                      <div
                        className="w-full bg-indigo-400 rounded-t-md hover:opacity-80 transition-all"
                        style={{ height: "85%" }}
                      />
                    </div>
                  </div>

                  {/* Wednesday */}
                  <div className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full h-full flex items-end">
                      <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-neutral-700 bg-white px-2 py-1 rounded shadow-sm">
                        45%
                      </span>
                      <div
                        className="w-full bg-indigo-200 rounded-t-md hover:opacity-80 transition-all"
                        style={{ height: "45%" }}
                      />
                    </div>
                  </div>

                  {/* Thursday */}
                  <div className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full h-full flex items-end">
                      <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-neutral-700 bg-white px-2 py-1 rounded shadow-sm">
                        90%
                      </span>
                      <div
                        className="w-full bg-indigo-500 rounded-t-md hover:opacity-80 transition-all"
                        style={{ height: "90%" }}
                      />
                    </div>
                  </div>

                  {/* Friday */}
                  <div className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full h-full flex items-end">
                      <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-neutral-700 bg-white px-2 py-1 rounded shadow-sm">
                        70%
                      </span>
                      <div
                        className="w-full bg-indigo-300 rounded-t-md hover:opacity-80 transition-all"
                        style={{ height: "70%" }}
                      />
                    </div>
                  </div>

                  {/* Saturday */}
                  <div className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full h-full flex items-end">
                      <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-neutral-700 bg-white px-2 py-1 rounded shadow-sm">
                        55%
                      </span>
                      <div
                        className="w-full bg-indigo-200 rounded-t-md hover:opacity-80 transition-all"
                        style={{ height: "55%" }}
                      />
                    </div>
                  </div>

                  {/* Sunday */}
                  <div className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full h-full flex items-end">
                      <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-neutral-700 bg-white px-2 py-1 rounded shadow-sm">
                        80%
                      </span>
                      <div
                        className="w-full bg-indigo-400 rounded-t-md hover:opacity-80 transition-all"
                        style={{ height: "80%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* X-Axis Labels */}
                <div className="flex justify-between mt-4 border-t border-neutral-200 pt-2">
                  <span className="text-xs font-medium text-neutral-600 text-center w-full">
                    Mon
                  </span>
                  <span className="text-xs font-medium text-neutral-600 text-center w-full">
                    Tue
                  </span>
                  <span className="text-xs font-medium text-neutral-600 text-center w-full">
                    Wed
                  </span>
                  <span className="text-xs font-medium text-neutral-600 text-center w-full">
                    Thu
                  </span>
                  <span className="text-xs font-medium text-neutral-600 text-center w-full">
                    Fri
                  </span>
                  <span className="text-xs font-medium text-neutral-600 text-center w-full">
                    Sat
                  </span>
                  <span className="text-xs font-medium text-neutral-600 text-center w-full">
                    Sun
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Mood Mixing Board */}
      <section className="relative w-full px-4 py-8">
        {/* Micro-Detail: Section Label */}
        <div className="absolute top-4 right-4 text-xs font-bold tracking-[0.3em] opacity-30"></div>
        <div className="max-w-7xl mx-auto">
          <MoodMixingBoard />
        </div>
      </section>

      {/* Emotion Marquee */}
      <EmotionMarquee />

      {/* CTA Section */}
      <section className="relative bg-neutral-50 w-full px-4 py-12">
        {/* Micro-Detail: Bottom Indicator */}
        <div className="absolute bottom-4 left-4 text-xs font-bold tracking-[0.3em] opacity-30"></div>
        <motion.div
          className="max-w-7xl mx-auto bg-white border-[1.5px] border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_0px_#1a1a1a] p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          whileHover={{ y: -2, boxShadow: "5px 5px 0px 0px #1a1a1a" }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Ready to decode your emotions?
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-6 text-[#1a1a1a]">
            Join DearDiary and transform your journaling experience
          </p>
          <Link href="/journal">
            <motion.div
              whileHover={{ y: -2, boxShadow: "5px 5px 0px 0px #1a1a1a" }}
              whileTap={{ y: 2, boxShadow: "none" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                size="lg"
                className="text-xl px-12 py-8 bg-[#1a1a1a] text-white border-[1.5px] border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_0px_#1a1a1a] hover:bg-[#1a1a1a]"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#0f0f0f] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Logo & Tagline */}
            <div>
              <h3 className="text-2xl font-bold mb-2">DEAR DIARY</h3>
              <p className="text-sm text-neutral-400">
                Your emotions,{" "}
                <span className="text-white">beautifully decoded</span>
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-12">
              {/* Product */}
              <div>
                <h4 className="text-xs font-semibold mb-3 tracking-wider text-neutral-500 uppercase">
                  Product
                </h4>
                <ul className="space-y-2">
                  <li>
                    <motion.a
                      href="#"
                      className="text-sm text-neutral-400 hover:text-white transition-colors inline-block"
                      whileHover={{ x: 2 }}
                    >
                      Journal
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-sm text-neutral-400 hover:text-white transition-colors inline-block"
                      whileHover={{ x: 2 }}
                    >
                      Analytics
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-sm text-neutral-400 hover:text-white transition-colors inline-block"
                      whileHover={{ x: 2 }}
                    >
                      Pricing
                    </motion.a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-xs font-semibold mb-3 tracking-wider text-neutral-500 uppercase">
                  Legal
                </h4>
                <ul className="space-y-2">
                  <li>
                    <motion.a
                      href="#"
                      className="text-sm text-neutral-400 hover:text-white transition-colors inline-block"
                      whileHover={{ x: 2 }}
                    >
                      Privacy Policy
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="#"
                      className="text-sm text-neutral-400 hover:text-white transition-colors inline-block"
                      whileHover={{ x: 2 }}
                    >
                      Terms of Service
                    </motion.a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-xs text-neutral-600 text-center">
              © {new Date().getFullYear()} Dear Diary. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
