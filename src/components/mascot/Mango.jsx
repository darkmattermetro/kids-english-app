import { motion } from 'framer-motion';

const Mango = ({ state = 'idle', size = 120 }) => {
  const animations = {
    idle: {
      y: [0, -8, 0],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
    },
    happy: {
      scale: [1, 1.15, 1],
      rotate: [0, 8, -8, 0],
      transition: { duration: 0.5 }
    },
    celebrating: {
      scale: [1, 1.3, 1],
      rotate: [0, 360],
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div
      style={{ width: size, height: size }}
      animate={animations[state]}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <radialGradient id="mangoBody" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="60%" stopColor="#FFD93D" />
            <stop offset="100%" stopColor="#F0B800" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="55" rx="38" ry="35" fill="url(#mangoBody)" />
        <path d="M50 18 Q55 8 48 5 Q42 8 47 20" fill="#6BCB77" />
        <path d="M47 18 Q50 28 50 30" stroke="#4A9E5A" strokeWidth="1.5" fill="none" />
        <ellipse cx="35" cy="48" rx="4" ry="5" fill="#333" />
        <ellipse cx="65" cy="48" rx="4" ry="5" fill="#333" />
        <ellipse cx="36" cy="46" rx="1.5" ry="2" fill="white" />
        <ellipse cx="66" cy="46" rx="1.5" ry="2" fill="white" />
        <path d="M38 65 Q50 75 62 65" stroke="#CC8800" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="78" rx="12" ry="5" fill="#F0B800" opacity="0.4" />
      </svg>
    </motion.div>
  );
};

export default Mango;
