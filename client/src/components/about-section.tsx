import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function AboutSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                <img 
                  src="/my_image_1754226920253.jpeg" 
                  alt="Nithin - Software Developer" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">Passionate Developer & Problem Solver</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm currently pursuing B.Tech in Computer Science Engineering at PES University with a strong 
              foundation in Data Structures, Algorithms, and modern web technologies. My journey spans from 
              frontend development with React and Tailwind CSS to backend services using Node.js and databases.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I've gained hands-on experience in cutting-edge technologies including blockchain development, 
              machine learning with RAG chatbots, and cloud-native monitoring solutions. My recent internship 
              at C-ISFCR involved researching dynamic graph neural networks for anti-money laundering detection.
            </p>



            <div className="flex flex-wrap gap-3">
              {['Problem Solving', 'Full Stack', 'Blockchain', 'ML/AI'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-blue-500/20 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
