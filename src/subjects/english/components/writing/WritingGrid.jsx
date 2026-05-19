import { useEffect, useState } from 'react';
import { loadJSON } from '../../utils/contentLoader.js';
import { speak } from '../../utils/textToSpeech.js';

const WritingGrid = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    loadJSON('/content/english/writing.json')
      .then(setData)
      .catch(setError);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishWritingProgress');
      if (saved) setCompleted(JSON.parse(saved).completed || []);
    } catch {}
  }, []);

  if (error) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Could not load writing practice.</p></div></div>;
  if (!data) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Loading writing practice...</p></div></div>;

  const { levels } = data;
  if (!levels || levels.length === 0) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>No writing levels available.</p></div></div>;

  const markCompleted = (levelId, letter) => {
    const key = `writing_${levelId}_${letter}`;
    if (!completed.includes(key)) {
      const newCompleted = [...completed, key];
      setCompleted(newCompleted);
      localStorage.setItem('kidsEnglishWritingProgress', JSON.stringify({ completed: newCompleted }));
    }
  };

  if (currentLevel) {
    const level = levels.find((l) => l.id === currentLevel);
    const currentLetterObj = level.letters[currentLetterIndex];
    const isLast = currentLetterIndex === level.letters.length - 1;

    const handleNext = () => {
      markCompleted(currentLevel, currentLetterObj.letter);
      if (currentLetterIndex < level.letters.length - 1) {
        setCurrentLetterIndex((prev) => prev + 1);
      }
    };

    const handlePrev = () => {
      if (currentLetterIndex > 0) {
        setCurrentLetterIndex((prev) => prev - 1);
      }
    };

    const handleFinish = () => {
      markCompleted(currentLevel, currentLetterObj.letter);
      setCurrentLevel(null);
      setCurrentLetterIndex(0);
    };

    const completedInLevel = completed.filter((c) => c.startsWith(`writing_${currentLevel}_`)).length;

    return (
      <div className="px-4 py-8 max-w-lg mx-auto">
        <button onClick={() => { setCurrentLevel(null); setCurrentLetterIndex(0); }} className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer">← Back to levels</button>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">{level.icon} {level.name}</h1>
        <p className="text-center text-gray-400 text-sm mb-2">Letter {currentLetterIndex + 1} of {level.letters.length}</p>
        <p className="text-center text-gray-400 text-xs mb-6">{completedInLevel} completed</p>

        <div className="bg-white rounded-xl shadow-md p-8 mb-6 text-center">
          <span className="text-8xl font-bold text-gray-800 block mb-4 tracking-wider">{currentLetterObj.letter}</span>
          <div className="bg-warmYellow bg-opacity-10 rounded-lg p-4 mb-4">
            <p className="text-gray-600 text-sm leading-relaxed">{currentLetterObj.guide}</p>
          </div>
          <button onClick={() => speak(`Write the letter ${currentLetterObj.letter}. ${currentLetterObj.guide}`, { rate: 0.75, pitch: 1.0 })} className="bg-warmYellow hover:bg-yellow-400 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all border-none cursor-pointer">🔊 Listen</button>
        </div>

        <div className="flex justify-between">
          <button onClick={handlePrev} disabled={currentLetterIndex === 0} className={`py-3 px-6 rounded-full text-lg font-bold shadow-md transition-all ${currentLetterIndex === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white text-gray-700 hover:shadow-lg'} border-none cursor-pointer`}>← Back</button>
          {isLast ? (
            <button onClick={handleFinish} className="bg-skyGreen hover:bg-green-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md hover:shadow-lg transition-all border-none cursor-pointer">✅ Finish</button>
          ) : (
            <button onClick={handleNext} className="bg-coralRed hover:bg-red-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md hover:shadow-lg transition-all border-none cursor-pointer">Next →</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Writing Practice</h1>
      <p className="text-center text-gray-500 mb-8">Learn to write letters and words!</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => {
          const completedInLevel = completed.filter((c) => c.startsWith(`writing_${level.id}_`)).length;
          return (
            <button key={level.id} onClick={() => { setCurrentLevel(level.id); setCurrentLetterIndex(0); }} className="relative flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 min-h-[140px] cursor-pointer border-none transform hover:-translate-y-1">
              <span className="text-5xl mb-3">{level.icon}</span>
              <span className="text-lg font-bold text-gray-800">{level.name}</span>
              <span className="text-xs text-gray-400 mt-2">{level.letters.length} letters</span>
              {completedInLevel > 0 && <span className="text-xs text-gray-400 mt-1">{completedInLevel}/{level.letters.length} done</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WritingGrid;
