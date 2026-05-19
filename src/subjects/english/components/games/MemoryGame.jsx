import { useState, useEffect } from 'react';
import { speak } from '../../utils/textToSpeech.js';

const CARD_DATA = [
  { id: 'A', emoji: '🍎', word: 'Apple' },
  { id: 'B', emoji: '⚽', word: 'Ball' },
  { id: 'C', emoji: '🐱', word: 'Cat' },
  { id: 'D', emoji: '🐶', word: 'Dog' },
  { id: 'E', emoji: '🥚', word: 'Egg' },
  { id: 'F', emoji: '🐟', word: 'Fish' },
];

const MemoryGame = ({ onBack }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const doubled = [...CARD_DATA, ...CARD_DATA].map((c, i) => ({ ...c, idx: i }));
    setCards(doubled.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (idx) => {
    if (flipped.length === 2) return;
    if (flipped.includes(idx)) return;
    if (matched.includes(idx)) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first].id === cards[second].id) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        speak(cards[first].word, { rate: 0.8, pitch: 1.0 });
        if (matched.length + 2 === cards.length) {
          setGameWon(true);
          const saved = localStorage.getItem('kidsEnglishGamesProgress');
          const progress = saved ? JSON.parse(saved) : { memoryWins: 0 };
          progress.memoryWins = (progress.memoryWins || 0) + 1;
          localStorage.setItem('kidsEnglishGamesProgress', JSON.stringify(progress));
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="px-4 py-8 max-w-lg mx-auto">
      <button onClick={onBack} className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer">← Back to games</button>
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">🃏 Memory Match</h1>
      <p className="text-center text-gray-500 mb-4">Moves: {moves}</p>

      {gameWon ? (
        <div className="text-center bg-green-50 rounded-xl p-8 mb-6">
          <span className="text-6xl block mb-4">🎉</span>
          <h2 className="text-2xl font-bold text-green-700 mb-2">You Win!</h2>
          <p className="text-green-600 mb-4">You matched all pairs in {moves} moves!</p>
          <button onClick={onBack} className="bg-skyGreen text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all border-none cursor-pointer">Back to Games</button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {cards.map((card, idx) => {
            const isFlipped = flipped.includes(idx) || matched.includes(idx);
            return (
              <button
                key={card.idx}
                onClick={() => handleCardClick(idx)}
                className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 cursor-pointer border-none ${isFlipped ? 'bg-white shadow-md' : 'bg-warmYellow shadow hover:bg-yellow-400'}`}
                aria-label={isFlipped ? card.word : 'Hidden card'}
              >
                {isFlipped ? (matched.includes(idx) ? card.emoji : card.emoji) : '❓'}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
