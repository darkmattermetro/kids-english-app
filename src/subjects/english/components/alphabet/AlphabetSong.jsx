import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { speak, stop, isSupported } from '../../utils/textToSpeech.js';
import { loadJSON } from '../../utils/contentLoader.js';

const SONG_MODES = [
  { id: 'letters', label: 'Letter Names', getText: (l) => l.letter },
  { id: 'words', label: 'Letter + Word', getText: (l) => `${l.letter} is for ${l.words[0].word}` },
  { id: 'phonics', label: 'Phonics', getText: (l) => `${l.letter} says ${l.phoneme}, ${l.words[0].word}` },
];

const AlphabetSong = () => {
  const [letters, setLetters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modeIndex, setModeIndex] = useState(0);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    loadJSON('/src/subjects/english/content/english/alphabet.json')
      .then((data) => setLetters(data.letters || []))
      .catch(setError);
  }, []);

  const speakCurrent = useCallback(() => {
    if (letters.length === 0) return;
    const letter = letters[currentIndex];
    const mode = SONG_MODES[modeIndex];
    const text = mode.getText(letter);
    speak(text, { rate: 0.7 });
  }, [letters, currentIndex, modeIndex]);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= letters.length) {
        setIsPlaying(false);
        return 0;
      }
      return next;
    });
  }, [letters.length]);

  useEffect(() => {
    if (!isPlaying || letters.length === 0) return;
    speakCurrent();
    timeoutRef.current = setTimeout(advance, 2000);
    return () => clearTimeout(timeoutRef.current);
  }, [isPlaying, currentIndex, modeIndex, speakCurrent, advance, letters.length]);

  const togglePlay = () => {
    if (isPlaying) {
      stop();
      clearTimeout(timeoutRef.current);
      setIsPlaying(false);
    } else {
      if (!isSupported()) {
        alert('Speech synthesis is not supported in your browser.');
        return;
      }
      if (currentIndex >= letters.length) setCurrentIndex(0);
      setIsPlaying(true);
    }
  };

  const cycleMode = () => {
    setModeIndex((prev) => (prev + 1) % SONG_MODES.length);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-500">
        <p>Could not load alphabet song.</p>
      </div>
    );
  }

  if (letters.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-500">
        <p>Loading song...</p>
      </div>
    );
  }

  const currentLetter = letters[currentIndex];
  const mode = SONG_MODES[modeIndex];

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Alphabet Song</h2>

      <button
        onClick={cycleMode}
        className="text-sm text-gray-500 underline mb-6 cursor-pointer border-none bg-transparent"
      >
        Mode: {mode.label}
      </button>

      <div className="flex justify-center items-center gap-2 flex-wrap mb-8">
        {letters.map((l, i) => (
          <motion.span
            key={l.letter}
            className={`text-2xl font-bold ${
              i === currentIndex
                ? 'text-warmYellow scale-125'
                : i < currentIndex
                  ? 'text-skyGreen'
                  : 'text-gray-300'
            }`}
            animate={i === currentIndex && isPlaying ? { y: [0, -6, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            {l.letter}
          </motion.span>
        ))}
      </div>

      {isPlaying && currentLetter && (
        <motion.div
          className="text-xl font-medium text-gray-700 mb-8"
          key={currentIndex + '-' + modeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {mode.getText(currentLetter)}
        </motion.div>
      )}

      <div className="flex items-center justify-center gap-6 mb-4">
        <button
          onClick={togglePlay}
          className="bg-warmYellow hover:bg-yellow-400 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:shadow-lg transition-all cursor-pointer border-none"
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
        <div
          className="bg-warmYellow h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + (isPlaying ? 1 : 0)) / letters.length) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-400 mt-2">
        Letter {currentIndex + 1} of {letters.length}
      </p>
    </div>
  );
};

export default AlphabetSong;
