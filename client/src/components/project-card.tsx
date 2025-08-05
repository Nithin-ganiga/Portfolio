import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  type?: string;
  github: string;
  demo: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isIntersecting: boolean;
}

export default function ProjectCard({ project, index, isIntersecting }: ProjectCardProps) {
  const getBadgeColor = (type?: string) => {
    switch (type) {
      case 'Blockchain': return 'bg-purple-500/80';
      case 'AI/ML': return 'bg-green-500/80';
      default: return 'bg-blue-500/80';
    }
  };

  const getButtonColor = (type?: string) => {
    switch (type) {
      case 'Blockchain': return 'bg-purple-500 hover:bg-purple-600 border-purple-500 hover:bg-purple-500';
      case 'AI/ML': return 'bg-green-500 hover:bg-green-600 border-green-500 hover:bg-green-500';
      default: return 'bg-blue-500 hover:bg-blue-600 border-blue-500 hover:bg-blue-500';
    }
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group transform-gpu"
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={isIntersecting ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        y: -10, 
        rotateX: 5, 
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {(project.featured || project.type) && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 ${getBadgeColor(project.type)} rounded-full text-xs font-semibold`}>
              {project.featured ? 'Featured' : project.type}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="px-2 py-1 bg-slate-700/50 rounded text-xs"
              initial={{ opacity: 0, scale: 0 }}
              animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.2 + tagIndex * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className={`px-6 py-2 ${getButtonColor(project.type)} rounded-lg transition-colors duration-300 flex items-center justify-center`}
              data-testid={`button-code-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Github className="mr-2 h-4 w-4" />
              View Code
            </Button>
          </a>
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className={`px-6 py-2 border-2 ${getButtonColor(project.type)} rounded-lg transition-colors duration-300 flex items-center justify-center`}
                data-testid={`button-demo-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
