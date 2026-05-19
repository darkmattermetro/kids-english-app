import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadJSON } from '../../utils/contentLoader.js';
import { speak } from '../../utils/textToSpeech.js';

const SentencesGrid = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [shuffled, setShuffled] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    loadJSON('/content/english/sentences.json')
      .then(setData)
      .catch(setError);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishSentencesProgress');
      if (saved) setCompleted(JSON.parse(saved).completed || []);
    } catch {}
  }, []);

  if (error) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Could not load sentences.</p></div></div>;
  if (!data) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Loading sentences...</p></div></div>;

  const { exercises } = data;
  if (!exercises || exercises.length === 0) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>No exercises available.</p></div></div>;

  const startExercise = (ex) => {
    setSelectedId(ex.id);
    setShuffled([...ex.scrambled].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setFeedback(null);
  };

  const handleWordClick = (word) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleUndo = () => {
    setSelectedWords(selectedWords.slice(0, -1));
    setFeedback(null);
  };

  const handleCheck = () => {
    const currentEx = exercises.find((e) => e.id === selectedId);
    const attempt = selectedWords.join(' ');
    if (attempt === currentEx.correct) {
      setFeedback('correct');
      if (!completed.includes(selectedId)) {
        const newCompleted = [...completed, selectedId];
        setCompleted(newCompleted);
        localStorage.setItem('kidsEnglishSentencesProgress', JSON.stringify({ completed: newCompleted }));
      }
      speak('Great job!', { rate: 0.8, pitch: 1.2 });
    } else {
      setFeedback('wrong');
    }
  };

  const handleReset = () => {
    setSelectedId(null);
    setShuffled([]);
    setSelectedWords([]);
    setFeedback(null);
  };

  const completedCount = completed.length;

  if (selectedId) {
    const currentEx = exercises.find((e) => e.id === selectedId);
    const remainingWords = shuffled.filter((w) => !selectedWords.includes(w));

    return (
      <div className="px-4 py-8 max-w-lg mx-auto">
        <button onClick={handleReset} className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer">← Back to exercises</button>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">{currentEx.icon} {currentEx.name}</h1>
        <p className="text-center text-gray-500 mb-6">{currentEx.description}</p>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 min-h-[120px]">
          <p className="text-center text-gray-400 text-sm mb-3">Tap the words in the correct order:</p>
          <div className="flex flex-wrap justify-center gap-2 min-h-[48px] p-3 bg-gray-50 rounded-lg">
            {selectedWords.map((w, i) => (
              <motion.span key={`selected-${w}-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-4 py-2 bg-warmYellow text-gray-800 font-bold rounded-lg text-lg">
                {w}
              </motion.span>
            ))}
          </div>
        </div>

        {feedback && (
          <div className={`text-center p-4 rounded-xl mb-4 ${feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {feedback === 'correct' ? '✅ Correct! Well done!' : '❌ Not quite. Try again!'}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {remainingWords.map((w, i) => (
            <button key={`word-${w}-${i}`} onClick={() => handleWordClick(w)} className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-lg hover:border-warmYellow hover:shadow-md transition-all cursor-pointer">
              {w}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {selectedWords.length > 0 && (
            <button onClick={handleUndo} className="py-2 px-4 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all cursor-pointer border-none">
              ↩ Undo
            </button>
          )}
          {selectedWords.length === currentEx.scrambled.length && (
            <button onClick={handleCheck} className="py-3 px-6 bg-skyGreen text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer border-none">
              ✓ Check
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Sentence Builder</h1>
      <p className="text-center text-gray-500 mb-8">Put the words in order to make sentences!</p>
      {completedCount > 0 && <p className="text-center text-sm text-gray-400 mb-6">{completedCount} of {exercises.length} completed</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((ex) => (
          <button key={ex.id} onClick={() => startExercise(ex)} className="relative flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 min-h-[120px] cursor-pointer border-none transform hover:-translate-y-1">
            {completed.includes(ex.id) && <span className="absolute top-2 right-2 text-lg">⭐</span>}
            <span className="text-4xl mb-2">{ex.emoji}</span>
            <span className="text-lg font-bold text-gray-800">{ex.name}</span>
            <span className="text-xs text-gray-400 mt-2 text-center">{ex.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SentencesGrid;
