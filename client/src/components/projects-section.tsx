import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import ProjectCard from "./project-card";

export default function ProjectsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const projects = [
    {
      title: "AP-Monitor - Log Analytics Platform",
      description: "A real-time log analytics platform built with Apache Kafka for log ingestion, Node.js backend APIs, and Grafana dashboards powered by Prometheus and Loki for comprehensive observability.",
      image: "/AP-MONITOR_LOGO.png",
      tags: ["Kafka", "Node.js", "Prometheus", "Grafana", "Docker"],
      featured: true,
      github: "https://github.com/Nithin-ganiga/AP-Monitor",
      demo: "#"
    },
    {
      title: "NFT Marketplace",
      description: "Decentralized NFT marketplace on Ethereum enabling users to mint, buy, sell, and transfer NFTs with automated royalty handling via Solidity smart contracts and IPFS storage.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tags: ["Solidity", "Ethereum", "IPFS", "MetaMask", "JavaScript"],
      type: "Blockchain",
      github: "https://github.com/Nithin-ganiga/NFT-Marketplace",
      demo: "#"
    },
    {
      title: "RAG Chatbot",
      description: "Intelligent document-based chatbot using vector similarity search and retrieval-augmented generation. Features semantic search, context-aware responses, and interactive Q&A interface.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tags: ["Python", "ChromaDB", "Streamlit", "NLP", "Vector DB"],
      type: "AI/ML",
      github: "https://github.com/Nithin-ganiga/RAG-Chatbot",
      demo: "#"
    },
    {
      title: "NiCoin - Blockchain Cryptocurrency",
      description: "Educational blockchain cryptocurrency prototype demonstrating proof-of-work mining, transaction validation, ECDSA signatures, and UTXO-based ledger model with interactive CLI interface.",
      image: "/nicoin.png",
      tags: ["Java", "BouncyCastle", "Cryptography", "Proof of Work", "ECDSA"],
      type: "Blockchain",
      github: "https://github.com/Nithin-ganiga/NiCoin",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
          <p className="text-gray-400 mt-4">Here are some of my recent projects that showcase my skills</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isIntersecting={isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
