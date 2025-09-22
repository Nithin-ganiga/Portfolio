import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function ExperienceSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const experience = {
    title: "Summer Intern",
    organization: "C-ISFCR, PES University",
    period: "June 2024 - July 2024",
    location: "Bangalore, India",
    achievements: [
      "Researched dynamic graph neural networks for anti-money laundering",
      "Developed GCN-GRU and GCN-LSTM models with adaptive class weighting", 
      "Improved illicit transaction classification using Elliptic dataset"
    ],
    technologies: ["Python", "PyTorch", "Graph Neural Networks", "Machine Learning"]
  };

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
    },
    {
      title:"Bharatiya Antarrashtriya Hackthon participant",
      provider: "hackwithinfy",
      icon: "🛰️"
    }
  ];

  return (
    <section id="experience" className="py-16 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        {/* Experience Card */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                <p className="text-xl text-blue-400 font-semibold mb-3">{experience.organization}</p>
                <div className="flex flex-wrap items-center gap-4 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{experience.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{experience.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
              <ul className="space-y-3">
                {experience.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-slate-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Award className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Certifications
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl text-center hover:border-blue-500/50 hover:scale-105 transition-all duration-300 max-w-xs"
                initial={{ opacity: 0, scale: 0 }}
                animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
              >
                <div className="text-3xl mb-3">{cert.icon}</div>
                <p className="font-semibold text-white mb-2">{cert.title}</p>
                <p className="text-sm text-blue-400">{cert.provider}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
