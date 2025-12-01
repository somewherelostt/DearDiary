"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Sun,
  Moon,
  Monitor,
  Shield,
  Database,
  Palette,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  pageTransition,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { getAllEntries, clearAllEntries } from "@/lib/local-storage";

export default function SettingsPage() {
  const [showEncryptionKey, setShowEncryptionKey] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [lockTimeout, setLockTimeout] = useState<number>(15);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState<string>("");

  useEffect(() => {
    // Load settings from localStorage
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark" | "system") ||
      "system";
    const savedFontSize =
      (localStorage.getItem("fontSize") as "small" | "medium" | "large") ||
      "medium";
    const savedLockTimeout = parseInt(
      localStorage.getItem("lockTimeout") || "15"
    );

    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setLockTimeout(savedLockTimeout);

    // Generate or retrieve encryption key
    let key = localStorage.getItem("encryptionKey");
    if (!key) {
      key = generateEncryptionKey();
      localStorage.setItem("encryptionKey", key);
    }
    setEncryptionKey(key);
  }, []);

  const generateEncryptionKey = (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  };

  const handleExportData = () => {
    const entries = getAllEntries();
    const dataStr = JSON.stringify(entries, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `deardiary-export-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAllData = () => {
    if (showDeleteConfirm) {
      clearAllEntries();
      setShowDeleteConfirm(false);
      alert("All data has been deleted successfully.");
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 5000);
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Apply theme
    if (newTheme === "system") {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.classList.toggle(
        "dark",
        systemPreference === "dark"
      );
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  const handleFontSizeChange = (newSize: "small" | "medium" | "large") => {
    setFontSize(newSize);
    localStorage.setItem("fontSize", newSize);

    // Apply font size to root
    const sizes = { small: "14px", medium: "16px", large: "18px" };
    document.documentElement.style.fontSize = sizes[newSize];
  };

  const handleLockTimeoutChange = (minutes: number) => {
    setLockTimeout(minutes);
    localStorage.setItem("lockTimeout", minutes.toString());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Encryption key copied to clipboard!");
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <motion.div variants={staggerContainer} className="space-y-8">
        {/* Header */}
        <PageHeader
          title="Settings"
          subtitle="Manage your privacy, security, and preferences"
        />

        {/* Data Sovereignty Section */}
        <motion.section variants={staggerItem}>
          <Card className="p-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg border-2 border-black">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-body text-xl font-bold">
                  Data Sovereignty
                </h2>
                <p className="font-body text-sm text-neutral-600">
                  Your data, your control
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Export Data */}
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div>
                  <h3 className="font-semibold mb-1">Export All Entries</h3>
                  <p className="text-sm text-neutral-600">
                    Download all your journal entries as JSON
                  </p>
                </div>
                <Button
                  onClick={handleExportData}
                  className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Delete All Data */}
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-2 border-red-500">
                <div>
                  <h3 className="font-semibold mb-1 text-red-700">
                    Delete All Data
                  </h3>
                  <p className="text-sm text-red-600">
                    Permanently remove all entries (cannot be undone)
                  </p>
                </div>
                <Button
                  onClick={handleDeleteAllData}
                  variant="ghost"
                  className={`border-2 transition-all ${
                    showDeleteConfirm
                      ? "bg-red-600 text-white border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
                      : "bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  {showDeleteConfirm ? (
                    <>
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Confirm Delete
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Security Section */}
        <motion.section variants={staggerItem}>
          <Card className="p-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg border-2 border-black">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-body text-xl font-bold">Security</h2>
                <p className="font-body text-sm text-neutral-600">
                  Protect your private thoughts
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Encryption Key */}
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Encryption Key</h3>
                  <button
                    onClick={() => setShowEncryptionKey(!showEncryptionKey)}
                    className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    {showEncryptionKey ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-3 bg-white border border-neutral-300 rounded font-mono text-sm break-all">
                    {showEncryptionKey
                      ? encryptionKey
                      : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                  </code>
                  {showEncryptionKey && (
                    <Button
                      onClick={() => copyToClipboard(encryptionKey)}
                      size="sm"
                      variant="ghost"
                      className="border-2 border-black"
                    >
                      Copy
                    </Button>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  Store this key securely. You'll need it to decrypt your data.
                </p>
              </div>

              {/* Auto-Lock Timeout */}
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold mb-1">Auto-Lock Timeout</h3>
                    <p className="text-sm text-neutral-600">
                      Lock app after inactivity
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-neutral-600" />
                    <span className="font-semibold">{lockTimeout} min</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[5, 10, 15, 30, 60].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => handleLockTimeoutChange(minutes)}
                      className={`flex-1 py-2 rounded-lg border-2 font-medium transition-all ${
                        lockTimeout === minutes
                          ? "bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                          : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
                      }`}
                    >
                      {minutes}m
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Appearance Section */}
        <motion.section variants={staggerItem}>
          <Card className="p-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-pink-100 rounded-lg border-2 border-black">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-body text-xl font-bold">Appearance</h2>
                <p className="font-body text-sm text-neutral-600">
                  Customize your experience
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <h3 className="font-semibold mb-3">Theme</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-all ${
                      theme === "light"
                        ? "bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-all ${
                      theme === "dark"
                        ? "bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </button>
                  <button
                    onClick={() => handleThemeChange("system")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-all ${
                      theme === "system"
                        ? "bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    System
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <h3 className="font-semibold mb-3">
                  Font Size (Accessibility)
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFontSizeChange("small")}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${
                      fontSize === "small"
                        ? "bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
                    }`}
                  >
                    <span className="text-sm">Small</span>
                  </button>
                  <button
                    onClick={() => handleFontSizeChange("medium")}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${
                      fontSize === "medium"
                        ? "bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
                    }`}
                  >
                    <span className="text-base">Medium</span>
                  </button>
                  <button
                    onClick={() => handleFontSizeChange("large")}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${
                      fontSize === "large"
                        ? "bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
                    }`}
                  >
                    <span className="text-lg">Large</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Privacy Notice */}
        <motion.div
          variants={staggerItem}
          className="p-4 bg-neutral-100 border-2 border-neutral-300 rounded-lg"
        >
          <p className="text-sm text-neutral-600 text-center">
            <strong>Privacy First:</strong> All your data is stored locally on
            your device. We never send your entries to any server. Your thoughts
            belong to you.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
