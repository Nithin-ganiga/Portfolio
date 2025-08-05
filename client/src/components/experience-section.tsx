import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import TimelineItem from "./timeline-item";

export default function ExperienceSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const timelineItems = [
    {
      type: "experience",
      title: "Summer Intern",
      organization: "C-ISFCR, PES University",
      period: "June 2024 - July 2024",
      details: [
        "Researched dynamic graph neural networks for anti-money laundering",
        "Developed GCN-GRU and GCN-LSTM models with adaptive class weighting",
        "Improved illicit transaction classification using Elliptic dataset"
      ],
      color: "purple",
      side: "right" as const
    }
  ];

  const certifications = [
    {
      title: "Problem Solving (Intermediate)",
      provider: "HackerRank",
      icon: "🏆"
    },
    {
      title: "GenAI for Front-End Developers",
      provider: "Coursera",
      icon: "🧠"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-800/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
            initial={{ scaleY: 0 }}
            animate={isIntersecting ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isIntersecting={isIntersecting}
              />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg text-center transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, scale: 0 }}
                animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl mb-2">{cert.icon}</div>
                <p className="font-semibold text-sm">{cert.title}</p>
                <p className="text-xs text-gray-400">{cert.provider}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
