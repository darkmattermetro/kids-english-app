import { useState, useEffect } from 'react';
import { speak } from '../../utils/textToSpeech.js';

const PAIRS = [
  { emoji: '🍎', word: 'Apple' },
  { emoji: '⚽', word: 'Ball' },
  { emoji: '🐱', word: 'Cat' },
  { emoji: '🐶', word: 'Dog' },
  { emoji: '🐟', word: 'Fish' },
  { emoji: '☀️', word: 'Sun' },
  { emoji: '🌙', word: 'Moon' },
  { emoji: '⭐', word: 'Star' },
];

const WordMatch = ({ onBack }) => {
  const [shuffledEmojis, setShuffledEmojis] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    setShuffledEmojis([...PAIRS].sort(() => Math.random() - 0.5));
    setShuffledWords([...PAIRS].sort(() => Math.random() - 0.5));
  }, []);

  const handleEmojiClick = (item) => {
    if (matchedPairs.includes(item.word)) return;
    setSelectedEmoji(item);
    setFeedback(null);
  };

  const handleWordClick = (item) => {
    if (matchedPairs.includes(item.word)) return;
    setSelectedWord(item);
    if (!selectedEmoji) return;

    if (selectedEmoji.word === item.word) {
      setMatchedPairs([...matchedPairs, item.word]);
      setSelectedEmoji(null);
      setSelectedWord(null);
      setFeedback('correct');
      speak(item.word, { rate: 0.8, pitch: 1.1 });
      if (matchedPairs.length + 1 === PAIRS.length) {
        setGameWon(true);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setSelectedEmoji(null);
        setSelectedWord(null);
        setFeedback(null);
      }, 800);
    }
  };

  if (gameWon) {
    return (
      <div className="px-4 py-8 max-w-lg mx-auto">
        <button onClick={onBack} className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer">← Back to games</button>
        <div className="text-center bg-green-50 rounded-xl p-8">
          <span className="text-6xl block mb-4">🎉</span>
          <h2 className="text-2xl font-bold text-green-700 mb-2">All Matched!</h2>
          <p className="text-green-600 mb-4">Great job matching all the words!</p>
          <button onClick={onBack} className="bg-skyGreen text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all border-none cursor-pointer">Back to Games</button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-lg mx-auto">
      <button onClick={onBack} className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer">← Back to games</button>
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">🎯 Word Match</h1>
      <p className="text-center text-gray-500 mb-2">Match each picture to its word!</p>
      <p className="text-center text-gray-400 text-sm mb-6">{matchedPairs.length} of {PAIRS.length} matched</p>

      {feedback === 'correct' && <div className="text-center text-green-600 font-bold mb-4">✅ Correct!</div>}
      {feedback === 'wrong' && <div className="text-center text-red-500 font-bold mb-4">❌ Try again!</div>}

      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <p className="text-center text-sm text-gray-400 mb-3">Pictures</p>
          <div className="space-y-2">
            {shuffledEmojis.map((item) => {
              const isMatched = matchedPairs.includes(item.word);
              const isSelected = selectedEmoji?.word === item.word;
              return (
                <button key={item.word} onClick={() => handleEmojiClick(item)} disabled={isMatched} className={`w-full p-3 rounded-xl text-center text-3xl transition-all cursor-pointer border-none ${isMatched ? 'bg-green-100 opacity-50' : isSelected ? 'bg-warmYellow shadow-md' : 'bg-white shadow hover:shadow-md'}`}>
                  {item.emoji}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-center text-sm text-gray-400 mb-3">Words</p>
          <div className="space-y-2">
            {shuffledWords.map((item) => {
              const isMatched = matchedPairs.includes(item.word);
              const isSelected = selectedWord?.word === item.word;
              return (
                <button key={item.word} onClick={() => handleWordClick(item)} disabled={isMatched} className={`w-full p-3 rounded-xl text-center font-bold text-lg transition-all cursor-pointer border-none ${isMatched ? 'bg-green-100 opacity-50 text-gray-500' : isSelected ? 'bg-skyGreen text-white shadow-md' : 'bg-white text-gray-800 shadow hover:shadow-md'}`}>
                  {item.word}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400">Tap a picture, then tap the matching word</div>
    </div>
  );
};

export default WordMatch;
