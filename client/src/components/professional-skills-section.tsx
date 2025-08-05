import { motion } from "framer-motion";
import { Code, Layers, Wrench, Info } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState } from "react";

export default function ProfessionalSkillsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Professional proficiency levels with clear definitions
  const proficiencyLevels = [
    { level: 5, label: "Expert", description: "Advanced proficiency with deep understanding", color: "#059669" },
    { level: 4, label: "Proficient", description: "Strong working knowledge and experience", color: "#0d9488" },
    { level: 3, label: "Competent", description: "Good understanding with practical experience", color: "#0891b2" },
    { level: 2, label: "Familiar", description: "Basic knowledge and some hands-on practice", color: "#3b82f6" },
    { level: 1, label: "Beginner", description: "Learning fundamentals", color: "#6366f1" }
  ];

  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      color: "text-slate-700 dark:text-slate-300",
      skills: [
        { 
          name: "Java", 
          level: 4, 
          description: "Built enterprise applications with Spring Boot, implemented OOP design patterns, and developed RESTful APIs"
        },
        { 
          name: "Python", 
          level: 4, 
          description: "Developed machine learning models, and automation tools with pandas and scikit-learn"
        },
        { 
          name: "JavaScript", 
          level: 4, 
          description: "Created interactive web applications, handled asynchronous programming, and worked with modern ES6+ features"
        },
        { 
          name: "C", 
          level: 3, 
          description: "first language learned, implemented data structures and algorithms, and developed system-level applications"
        }
      ]
    },
    {
      icon: Layers,
      title: "Web Development",
      color: "text-slate-700 dark:text-slate-300",
      skills: [
        { 
          name: "HTML/CSS", 
          level: 4, 
          description: "Crafted semantic, accessible markup and responsive layouts with modern CSS techniques and animations"
        },
        { 
          name: "Tailwind CSS", 
          level: 4, 
          description: "Built responsive, utility-first designs with custom components and efficient styling workflows"
        },
        { 
          name: "React", 
          level: 4, 
          description: "Developed dynamic single-page applications with reusable components, hooks, and state management"
        },
        { 
          name: "Node.js", 
          level: 3, 
          description: "Created server-side applications, RESTful APIs, and handled database integration with Express.js"
        }
      ]
    },
    {
      icon: Wrench,
      title: "Tools & Database",
      color: "text-slate-700 dark:text-slate-300",
      skills: [
        { 
          name: "Git/GitHub", 
          level: 4, 
          description: "Managed version control, collaborative development workflows, and CI/CD pipelines for team projects"
        },
        { 
          name: "SQL", 
          level: 4, 
          description: "Designed relational databases, wrote complex queries, and optimized database performance for applications"
        },
        { 
          name: "MongoDB", 
          level: 3, 
          description: "Implemented NoSQL document databases, data modeling, and aggregation pipelines for scalable applications"
        },
        { 
          name: "Docker", 
          level: 3, 
          description: "Containerised applications, managed multi-container deployments, and streamlined development environments"
        }
      ]
    }
  ];

  const getProficiencyInfo = (level: number) => {
    return proficiencyLevels.find(p => p.level === level) || proficiencyLevels[2];
  };

  const renderProficiencyDots = (level: number) => {
    return (
      <div className="flex items-center gap-1" aria-label={`Proficiency level ${level} out of 5`}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
              dot <= level 
                ? 'bg-slate-300' 
                : 'bg-slate-600'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-slate-300 mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </motion.div>

        {/* Proficiency Legend */}
        <motion.div
          className="bg-slate-800 rounded-lg p-6 mb-12 shadow-sm border border-slate-700"
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-slate-400" />
            <h3 className="text-lg font-semibold text-white">Proficiency Scale</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {proficiencyLevels.reverse().map((level) => (
              <div key={level.level} className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full ${
                        dot <= level.level 
                          ? 'bg-slate-300' 
                          : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-medium text-white text-sm">
                    {level.label}
                  </div>
                  <div className="text-xs text-slate-400 hidden md:block">
                    {level.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-slate-800 rounded-lg p-8 shadow-sm border border-slate-700"
              initial={{ opacity: 0, y: 50 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-700 rounded-lg">
                  <category.icon className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => {
                  const proficiency = getProficiencyInfo(skill.level);
                  return (
                    <motion.div
                      key={skill.name}
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-white">
                            {skill.name}
                          </h4>
                          {renderProficiencyDots(skill.level)}
                        </div>
                        <span className="text-sm font-medium text-slate-400 bg-slate-700 px-2 py-1 rounded">
                          {proficiency.label}
                        </span>
                      </div>
                      
                      {/* Skill Description - Always visible for accessibility, styled for elegance */}
                      <p className="text-sm text-slate-400 leading-relaxed pl-0 transition-all duration-200">
                        {skill.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Accessible Text Summary */}
        <div className="sr-only" aria-label="Skills summary for screen readers">
          <h3>Complete Skills Summary:</h3>
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h4>{category.title}:</h4>
              <ul>
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    {skill.name}: {getProficiencyInfo(skill.level).label} level. {skill.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}