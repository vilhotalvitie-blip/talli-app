"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  startOnView?: boolean;
}

export function CountUp({
  end,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  startOnView = true,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || (isInView && !hasStarted.current)) {
      hasStarted.current = true;
      const controls = animate(0, end, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          setCount(Number(value.toFixed(decimals)));
        },
      });

      return () => controls.stop();
    }
  }, [end, duration, decimals, isInView, startOnView]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      {count}
      {suffix}
    </motion.span>
  );
}
