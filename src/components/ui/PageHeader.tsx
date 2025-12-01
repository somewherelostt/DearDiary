"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/animations";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

/**
 * PageHeader Component
 *
 * Enforces the Global Design System:
 * - Typography: Uses font-heading (Fraunces) for titles
 * - Size: Consistent 4xl sizing across all pages
 * - Weight: Always font-medium (500)
 * - Spacing: Standardized mb-8 for uniform vertical rhythm
 *
 * This ensures every page title starts at the EXACT same pixel height.
 */
export function PageHeader({
  title,
  subtitle,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <motion.div variants={staggerItem} className={`mb-8 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="font-heading font-medium text-4xl mb-2 text-neutral-900 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-lg text-neutral-600">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </motion.div>
  );
}
