import { motion } from "framer-motion";
import { Linkedin, Github, Code } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/nithin-ganiga-22249724a/", color: "hover:text-blue-400" },
    { icon: Github, href: "https://github.com/Nithin-ganiga", color: "hover:text-white" },
    { icon: Code, href: "https://leetcode.com/u/NITHIN_GANIGA/", color: "hover:text-yellow-400" },
  ];

  return (
    <footer className="bg-slate-800/50 py-8 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.p 
          className="text-gray-400 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          © 2025 Nithin. Built with ❤️ using modern web technologies.
        </motion.p>
        
        <motion.div 
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 ${social.color} transition-colors duration-300`}
              whileHover={{ scale: 1.2, y: -2 }}
              data-testid={`footer-social-${index}`}
            >
              <social.icon className="text-xl" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
