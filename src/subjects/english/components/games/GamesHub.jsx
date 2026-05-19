import { useState } from 'react';
import MemoryGame from './MemoryGame.jsx';
import WordMatch from './WordMatch.jsx';

const GamesHub = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: 'memory',
      name: 'Memory Match',
      icon: '🃏',
      description: 'Flip cards and find matching pairs!',
      color: 'bg-coralRed',
    },
    {
      id: 'wordmatch',
      name: 'Word Match',
      icon: '🎯',
      description: 'Match words to their pictures!',
      color: 'bg-skyGreen',
    },
  ];

  if (activeGame === 'memory') return <MemoryGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'wordmatch') return <WordMatch onBack={() => setActiveGame(null)} />;

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Games Hub</h1>
      <p className="text-center text-gray-500 mb-8">Learn while you play!</p>
      <div className="grid gap-4 sm:grid-cols-2 max-w-xl mx-auto">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className="flex flex-col items-center justify-center p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 min-h-[180px] cursor-pointer border-none transform hover:-translate-y-1"
          >
            <span className="text-6xl mb-4">{game.icon}</span>
            <span className="text-xl font-bold text-gray-800 mb-2">{game.name}</span>
            <span className="text-sm text-gray-500 text-center">{game.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamesHub;
