import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TypingAnimation() {
  const phrases = [
    'Full Stack Developer',
    'Blockchain Enthusiast', 
    'Problem Solver',
    'ML/AI Explorer',
    'Open Source Contributor'
  ];

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    
    if (isTyping) {
      if (charIndex < currentPhrase.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } else {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setCurrentIndex((currentIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, currentIndex, phrases]);

  return (
    <div className="flex items-center justify-center min-h-[2rem]">
      <span className="text-xl md:text-2xl text-gray-300">
        {displayText}
      </span>
      <motion.span
        className="inline-block w-0.5 h-6 bg-blue-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}
