import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  isIntersecting: boolean;
  delay?: number;
}

export default function SkillBar({ name, level, isIntersecting, delay = 0 }: SkillBarProps) {
  return (
    <div className="skill-item">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={isIntersecting ? { width: `${level}%` } : { width: "0%" }}
          transition={{ duration: 2, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}
