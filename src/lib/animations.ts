/**
 * Framer Motion animation variants for neobrutalism style
 */

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeOut" },
};

// Card animations
export const cardHover = {
  rest: { scale: 1, boxShadow: "5px 5px 0px #000" },
  hover: {
    scale: 1.02,
    boxShadow: "8px 8px 0px #000",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
    boxShadow: "3px 3px 0px #000",
    transition: { duration: 0.1 },
  },
};

// Button animations
export const buttonPress = {
  rest: { x: 0, y: 0 },
  tap: { x: 3, y: 3, transition: { duration: 0.1 } },
};

// Stagger children animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Modal animations
export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// Badge pulse animation
export const badgePulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Slide in from right
export const slideInRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};

// Bounce animation
export const bounce = {
  y: [0, -10, 0],
  transition: {
    duration: 0.6,
    repeat: Infinity,
    repeatDelay: 2,
    ease: "easeInOut",
  },
};

// Shake animation (for errors)
export const shake = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.4 },
};

// Expand width animation
export const expandWidth = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
  transition: { duration: 0.3 },
};

// Mood color transition
export const moodTransition = {
  duration: 1,
  ease: "easeInOut",
};
