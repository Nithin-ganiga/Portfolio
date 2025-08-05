import { motion } from "framer-motion";

interface TimelineItemProps {
  item: {
    type: string;
    title: string;
    organization: string;
    period: string;
    details: string | string[];
    location?: string;
    color: string;
    side: 'left' | 'right';
  };
  index: number;
  isIntersecting: boolean;
}

export default function TimelineItem({ item, index, isIntersecting }: TimelineItemProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { dot: 'bg-blue-500', text: 'text-blue-400' };
      case 'purple': return { dot: 'bg-purple-500', text: 'text-purple-400' };
      case 'cyan': return { dot: 'bg-cyan-500', text: 'text-cyan-400' };
      default: return { dot: 'bg-blue-500', text: 'text-blue-400' };
    }
  };

  const colors = getColorClasses(item.color);
  const isLeft = item.side === 'left';

  return (
    <div className="flex items-center justify-between">
      {/* Left Content */}
      <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : ''}`}>
        {isLeft && (
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className={`text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2`}>
              {item.title}
            </h3>
            <p className={`${colors.text} font-semibold mb-2`}>{item.organization}</p>
            <p className="text-gray-400 text-sm mb-2">{item.period}</p>
            {typeof item.details === 'string' ? (
              <p className="text-gray-300 text-sm">{item.details}</p>
            ) : (
              <ul className="text-gray-300 text-sm space-y-1">
                {item.details.map((detail, i) => (
                  <li key={i}>• {detail}</li>
                ))}
              </ul>
            )}
            {item.location && (
              <p className="text-gray-400 text-xs mt-2">{item.location}</p>
            )}
          </motion.div>
        )}
      </div>

      {/* Timeline Dot */}
      <div className="w-2/12 flex justify-center">
        <motion.div
          className={`w-4 h-4 ${colors.dot} rounded-full relative z-10`}
          initial={{ scale: 0 }}
          animate={isIntersecting ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
        >
          <motion.div
            className={`absolute inset-0 ${colors.dot} rounded-full`}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Right Content */}
      <div className={`w-5/12 ${!isLeft ? 'pl-8' : ''}`}>
        {!isLeft && (
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className={`text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2`}>
              {item.title}
            </h3>
            <p className={`${colors.text} font-semibold mb-2`}>{item.organization}</p>
            <p className="text-gray-400 text-sm mb-2">{item.period}</p>
            {typeof item.details === 'string' ? (
              <p className="text-gray-300 text-sm">{item.details}</p>
            ) : (
              <ul className="text-gray-300 text-sm space-y-1">
                {item.details.map((detail, i) => (
                  <li key={i}>• {detail}</li>
                ))}
              </ul>
            )}
            {item.location && (
              <p className="text-gray-400 text-xs mt-2">{item.location}</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
