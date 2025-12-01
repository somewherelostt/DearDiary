"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BarChart3,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface NavItem {
  icon: typeof Home;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BookOpen, label: "Journal", href: "/journal" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isExpanded ? 240 : 80,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="hidden md:flex fixed left-0 top-0 h-screen bg-white border-r border-neutral-200 z-50 flex-col"
      >
        {/* Logo / Header */}
        <div className="h-20 flex items-center border-b border-neutral-200 mb-4">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-6 w-full"
              >
                <BrandLogo variant="full" />
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full flex justify-center items-center"
              >
                <BrandLogo variant="icon-only" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        relative flex items-center gap-4 px-4 py-3 rounded-lg
                        transition-colors cursor-pointer
                        ${
                          isActive
                            ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-black border border-transparent hover:border-black"
                        }
                      `}
                    >
                      <Icon
                        className="w-6 h-6 flex-shrink-0"
                        strokeWidth={1.5}
                      />

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="font-body text-sm font-medium whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Toggle Button */}
        <div className="p-2 border-t border-neutral-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-600"
          >
            {isExpanded ? (
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            )}
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <ul className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="flex-1">
                <Link href={item.href}>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`
                      flex flex-col items-center justify-center gap-1 py-2 rounded-lg
                      transition-colors cursor-pointer
                      ${isActive ? "text-black" : "text-neutral-400"}
                    `}
                  >
                    <Icon
                      className="w-6 h-6"
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    <span className="font-body text-xs font-medium">
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
