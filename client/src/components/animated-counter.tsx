import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  decimals?: number;
  className?: string;
  isIntersecting?: boolean;
}

export default function AnimatedCounter({ 
  target, 
  decimals = 0, 
  className = "", 
  isIntersecting = false 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isIntersecting) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 FPS
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, isIntersecting]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
    </motion.div>
  );
}
