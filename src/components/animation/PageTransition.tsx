"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  mode?: "wait" | "sync" | "popLayout";
}

const directionOffset = {
  left: { x: 50, y: 0 },
  right: { x: -50, y: 0 },
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
};

export function PageTransition({
  children,
  direction = "up",
  mode = "wait",
}: PageTransitionProps) {
  const offset = directionOffset[direction];

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={Math.random()} // Force re-render on route change
        initial={{ opacity: 0, ...offset }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, ...offset }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: "left" | "right";
}

export function SlideTransition({
  children,
  isVisible,
  direction = "left",
}: SlideTransitionProps) {
  const slideOffset = direction === "left" ? -100 : 100;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: slideOffset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -slideOffset }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
