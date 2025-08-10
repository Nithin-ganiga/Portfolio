import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { 
  FaJava, 
  FaPython, 
  FaJs, 
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaDocker
} from "react-icons/fa";
import { 
  SiC,
  SiTailwindcss,
  SiMongodb
} from "react-icons/si";
import { Code, Layers, Settings } from "lucide-react";

export default function ProfessionalSkillsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      description: "Core programming languages I work with",
      skills: [
        { name: "Java", icon: FaJava, color: "text-orange-500" },
        { name: "Python", icon: FaPython, color: "text-blue-400" },
        { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
        { name: "C", icon: SiC, color: "text-blue-600" }
      ]
    },
    {
      title: "Web Development",
      icon: Layers,
      description: "Frontend and backend web technologies",
      skills: [
        { name: "HTML5", icon: FaHtml5, color: "text-orange-600" },
        { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
        { name: "React", icon: FaReact, color: "text-cyan-400" },
        { name: "Node.js", icon: FaNodeJs, color: "text-green-500" }
      ]
    },
    {
      title: "Tools & Database",
      icon: Settings,
      description: "Development tools and database systems",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
        { name: "GitHub", icon: FaGithub, color: "text-white" },
        { name: "SQL", icon: FaDatabase, color: "text-blue-600" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
        { name: "Docker", icon: FaDocker, color: "text-blue-400" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300">
                  <category.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="group/skill bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <skill.icon 
                        className={`text-3xl ${skill.color} group-hover/skill:scale-110 transition-transform duration-300 mb-2`}
                      />
                      <span className="text-white text-sm font-medium group-hover/skill:text-cyan-300 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact view for smaller screens */}
        <motion.div
          className="mt-8 lg:hidden"
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              All Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skillCategories.flatMap(category => 
                category.skills.map(skill => (
                  <span
                    key={skill.name}
                    className="bg-slate-700/50 text-slate-300 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-slate-600/50 transition-colors duration-300"
                  >
                    <skill.icon className={`text-base ${skill.color}`} />
                    {skill.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}