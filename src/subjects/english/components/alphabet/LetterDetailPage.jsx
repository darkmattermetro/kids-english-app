import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadJSON } from '../../utils/contentLoader.js';
import { speak } from '../../utils/textToSpeech.js';
import Mango from '../../../../components/mascot/Mango.jsx';

const LetterDetailPage = () => {
  const { letter } = useParams();
  const uppercaseLetter = letter.toUpperCase();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [mangoState, setMangoState] = useState('idle');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    loadJSON('/src/subjects/english/content/english/alphabet.json')
      .then((json) => {
        const found = json.letters.find(
          (l) => l.letter === uppercaseLetter
        );
        if (found) setData(found);
        else setError(new Error(`Letter ${uppercaseLetter} not found`));
      })
      .catch(setError);
  }, [uppercaseLetter]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishAlphabetProgress');
      if (saved) {
        const completed = JSON.parse(saved).completed || [];
        setIsCompleted(completed.includes(uppercaseLetter));
      }
    } catch {}
  }, [uppercaseLetter]);

  const markComplete = () => {
    try {
      const saved = localStorage.getItem('kidsEnglishAlphabetProgress');
      const progress = saved ? JSON.parse(saved) : { completed: [] };
      if (!progress.completed.includes(uppercaseLetter)) {
        progress.completed.push(uppercaseLetter);
        localStorage.setItem(
          'kidsEnglishAlphabetProgress',
          JSON.stringify(progress)
        );
        setIsCompleted(true);
        setMangoState('celebrating');
        setTimeout(() => setMangoState('idle'), 1500);
      }
    } catch {}
  };

  const handleWordClick = (word, sentence) => {
    speak(`${word}. ${sentence}`, { rate: 0.8 });
    setMangoState('happy');
    setTimeout(() => setMangoState('idle'), 1000);
    markComplete();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500 gap-4">
        <p>Letter not found.</p>
        <Link to="/alphabet" className="text-warmYellow underline">
          Back to alphabet
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      <Link
        to="/alphabet"
        className="text-gray-500 hover:text-gray-700 mb-4 inline-block"
      >
        ← Back to Alphabet
      </Link>

      <div className="flex flex-col items-center mb-8">
        <motion.div
          className="text-8xl font-bold mb-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          onClick={() => speak(data.letter)}
        >
          {data.letter}
        </motion.div>
        <p className="text-lg text-gray-500">{data.sound_description}</p>
        <p className="text-sm text-gray-400">{data.phoneme}</p>
        {isCompleted && <span className="text-2xl mt-2">⭐</span>}
      </div>

      <div className="flex justify-center mb-8">
        <Mango state={mangoState} size={80} />
      </div>

      <div className="space-y-4">
        {data.words.map((w) => (
          <motion.button
            key={w.word}
            onClick={() => handleWordClick(w.word, w.sentence)}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow text-left cursor-pointer border-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`${w.word}: ${w.sentence}`}
          >
            <span className="text-4xl">{w.emoji}</span>
            <div className="flex-1">
              <p className="text-lg font-bold text-gray-800">{w.word}</p>
              <p className="text-sm text-gray-500">{w.sentence}</p>
            </div>
            <span className="text-xl text-gray-400">🔊</span>
          </motion.button>
        ))}
      </div>

      {!isCompleted && (
        <div className="text-center mt-8">
          <motion.button
            onClick={markComplete}
            className="bg-warmYellow hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md hover:shadow-lg transition-all cursor-pointer border-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mark as Done! ⭐
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default LetterDetailPage;
