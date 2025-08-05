import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  icon: React.ComponentType<any>;
}

export default function EducationSection() {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const education: EducationItem[] = [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "PES University (Ring Road Campus)",
      location: "Bengaluru, Karnataka",
      period: "2022 - 2026",
      icon: GraduationCap
    },
    {
      degree: "Pre University",
      institution: "Government Pre-University College",
      location: "Udupi, Karnataka", 
      period: "2020 - 2022",
      icon: GraduationCap
    }
  ];

  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={sectionRef as React.RefObject<HTMLDivElement>}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My academic journey in computer science and engineering
          </p>
        </motion.div>

        <div className="space-y-8">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <item.icon className="text-2xl text-white" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.degree}
                  </h3>
                  <p className="text-lg text-blue-400 mb-2">
                    {item.institution}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">{item.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}