"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Image from "next/image";

interface BrandLogoProps {
  variant?: "icon-only" | "full" | "text-only";
  className?: string;
}

export function BrandLogo({
  variant = "full",
  className = "",
}: BrandLogoProps) {
  // Icon-only variant: Just the book icon
  if (variant === "icon-only") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative">
          <BookOpen
            className="w-8 h-8"
            style={{
              stroke: "url(#logo-gradient)",
              strokeWidth: 2,
            }}
          />
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient
                id="logo-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#E5989B" />
                <stop offset="100%" stopColor="#B5838D" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  // Text-only variant
  if (variant === "text-only") {
    return (
      <div className={`flex items-center ${className}`}>
        <span className="text-xl font-semibold tracking-tight bg-gradient-to-br from-[#E5989B] to-[#B5838D] bg-clip-text text-transparent">
          deardiary
        </span>
      </div>
    );
  }

  // Full variant: Icon + Text
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <BookOpen
          className="w-8 h-8"
          style={{
            stroke: "url(#logo-gradient-full)",
            strokeWidth: 2,
          }}
        />
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient
              id="logo-gradient-full"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E5989B" />
              <stop offset="100%" stopColor="#B5838D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-xl font-semibold tracking-tight bg-gradient-to-br from-[#E5989B] to-[#B5838D] bg-clip-text text-transparent whitespace-nowrap">
        deardiary
      </span>
    </div>
  );
}
