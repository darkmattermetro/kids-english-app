import { motion } from 'framer-motion';
import { speak } from '../../utils/textToSpeech.js';

const LetterCard = ({ data, isCompleted, onClick }) => {
  const { letter, words, themeColor } = data;
  const word = words[0];

  const handleClick = () => {
    speak(letter);
    if (onClick) onClick(letter);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative flex flex-col items-center justify-center p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow min-h-[100px] cursor-pointer border-none"
      style={{ minHeight: 64 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Letter ${letter} for ${word.word}`}
    >
      <span className="text-4xl font-bold mb-1">{letter}</span>
      <span className="text-2xl mb-1">{word.emoji}</span>
      <span className="text-sm font-medium text-gray-600">{word.word}</span>
      {isCompleted && (
        <motion.span
          className="absolute top-1 right-1 text-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          ⭐
        </motion.span>
      )}
    </motion.button>
  );
};

export default LetterCard;
