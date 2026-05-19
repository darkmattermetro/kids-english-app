import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import Mango from '../components/mascot/Mango.jsx';
import { subjects } from '../subjects/index.js';

const moduleColors = {
  warmYellow: { bg: 'rgba(255, 217, 61, 0.1)', border: '#FFD93D' },
  skyGreen: { bg: 'rgba(107, 203, 119, 0.1)', border: '#6BCB77' },
  coralRed: { bg: 'rgba(255, 107, 107, 0.1)', border: '#FF6B6B' },
  softPurple: { bg: 'rgba(199, 125, 255, 0.1)', border: '#C77DFF' },
};

const Home = () => {
  const appState = useAppContext();
  
  // Check if it's first visit (no lastActiveDate)
  const isFirstVisit = !appState.lastActiveDate;
  
  // Update last active date to today
  // In a real app, we'd do this in useEffect, but for simplicity we'll do it on render
  // TODO: Move this logic to useEffect with proper dependencies
  
  const modules = [
    { id: 'alphabet', title: 'Alphabet Adventure', emoji: '🔤', color: 'warmYellow' },
    { id: 'phonics', title: 'Phonics World', emoji: '🔊', color: 'skyGreen' },
    { id: 'vocabulary', title: 'Vocabulary Builder', emoji: '📚', color: 'coralRed' },
    { id: 'speaking', title: 'Speaking Practice', emoji: '🎤', color: 'softPurple' },
    { id: 'stories', title: 'Reading Stories', emoji: '📖', color: 'warmYellow' },
    { id: 'sentences', title: 'Sentence Builder', emoji: '🧩', color: 'skyGreen' },
    { id: 'emotions', title: 'Emotion Lab', emoji: '😊', color: 'coralRed' },
    { id: 'writing', title: 'Writing Practice', emoji: '✏️', color: 'softPurple' },
    { id: 'games', title: 'Games Hub', emoji: '🎮', color: 'warmYellow' },
    { id: 'rewards', title: 'Rewards & Badges', emoji: '🏆', color: 'skyGreen' },
    { id: 'parent', title: 'Parent Dashboard', emoji: '👨‍👩‍👧‍👦', color: 'coralRed' }
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-warmYellow">🪙</span>
            <span className="text-xl font-medium">{appState.coins}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-skyGreen">⭐</span>
            <span className="text-xl font-medium">{appState.stars}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-coralRed">🔥</span>
            <span className="text-xl font-medium">{appState.streak}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hello! Let's Learn English! 🌟
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Choose a fun activity below!
        </p>
      </div>
      
      <div className="grid gap-6 mb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map(module => (
            <Link
              key={module.id}
              to={`/${module.id}`}
              className="group relative overflow-hidden rounded-xl bg-white shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                style={{ backgroundColor: moduleColors[module.color]?.bg }}
                className="flex items-center justify-center p-4"
              >
                <span className={`text-5xl ${isFirstVisit ? 'animate-bounce' : ''}`}>
                  {module.emoji}
                </span>
              </div>
              <div className="px-4 pt-2 pb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{module.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  Learn and have fun with {module.title.toLowerCase()}!
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {(!isFirstVisit && appState.lastActiveDate) && (
        <div className="text-center">
          <button 
            onClick={() => {
              alert('Continue learning feature coming soon!');
            }}
            className="bg-warmYellow hover:bg-yellow-400 text-white font-bold py-3 px-8 rounded-full text-lg flex items-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <span>▶️</span>
            <span>Continue Learning</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;