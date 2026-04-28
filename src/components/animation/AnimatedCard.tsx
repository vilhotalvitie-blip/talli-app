"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className,
  hoverScale = 1.02,
  hoverY = -4,
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-card rounded-lg border border-border shadow-sm cursor-pointer",
        className
      )}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  className,
  onClick,
  variant = "default",
  disabled,
}: AnimatedButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors";
  const variantStyles = {
    default: "bg-primary-500 text-white hover:bg-primary-600",
    outline: "border border-input bg-background hover:bg-accent",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <motion.button
      className={cn(baseStyles, variantStyles[variant], className)}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
