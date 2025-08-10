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

export default function ProfessionalSkillsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const skills = [
    { name: "Java", icon: FaJava, color: "text-orange-500" },
    { name: "Python", icon: FaPython, color: "text-blue-400" },
    { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
    { name: "C", icon: SiC, color: "text-blue-600" },
    { name: "HTML5", icon: FaHtml5, color: "text-orange-600" },
    { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
    { name: "React", icon: FaReact, color: "text-cyan-400" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
    { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
    { name: "GitHub", icon: FaGithub, color: "text-white" },
    { name: "SQL", icon: FaDatabase, color: "text-blue-600" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "Docker", icon: FaDocker, color: "text-blue-400" }
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
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        {/* Minimalistic Skills Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group flex flex-col items-center p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <skill.icon 
                className={`text-4xl ${skill.color} group-hover:scale-110 transition-transform duration-300 mb-2`}
              />
              <span className="text-white text-sm font-medium text-center group-hover:text-cyan-300 transition-colors duration-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Simple tech tags for mobile */}
        <motion.div
          className="mt-8 md:hidden"
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2"
              >
                <skill.icon className={`text-sm ${skill.color}`} />
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}