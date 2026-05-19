import { useEffect, useState } from 'react';
import { useAppContext } from '../../../../context/AppContext.jsx';

const ParentDashboard = () => {
  const appContext = useAppContext();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const keys = ['kidsEnglishAlphabetProgress', 'kidsEnglishVocabProgress', 'kidsEnglishPhonicsProgress',
      'kidsEnglishSpeakingProgress', 'kidsEnglishStoriesProgress', 'kidsEnglishSentencesProgress',
      'kidsEnglishEmotionsProgress', 'kidsEnglishWritingProgress', 'kidsEnglishGamesProgress'];
    const result = {};
    keys.forEach((key) => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) result[key] = JSON.parse(saved);
        else result[key] = null;
      } catch { result[key] = null; }
    });
    setProgress(result);
  }, []);

  const modules = [
    { id: 'alphabet', name: 'Alphabet Adventure', icon: '🔤', key: 'kidsEnglishAlphabetProgress', total: 26 },
    { id: 'phonics', name: 'Phonics World', icon: '🔊', key: 'kidsEnglishPhonicsProgress', total: null },
    { id: 'vocabulary', name: 'Vocabulary Builder', icon: '📚', key: 'kidsEnglishVocabProgress', total: null },
    { id: 'speaking', name: 'Speaking Practice', icon: '🎤', key: 'kidsEnglishSpeakingProgress', total: null },
    { id: 'stories', name: 'Reading Stories', icon: '📖', key: 'kidsEnglishStoriesProgress', total: 5 },
    { id: 'sentences', name: 'Sentence Builder', icon: '🧩', key: 'kidsEnglishSentencesProgress', total: 10 },
    { id: 'emotions', name: 'Emotion Lab', icon: '😊', key: 'kidsEnglishEmotionsProgress', total: 8 },
    { id: 'writing', name: 'Writing Practice', icon: '✏️', key: 'kidsEnglishWritingProgress', total: null },
    { id: 'games', name: 'Games', icon: '🎮', key: 'kidsEnglishGamesProgress', total: null },
  ];

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Parent Dashboard</h1>
      <p className="text-center text-gray-500 mb-8">Track your child's learning progress!</p>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">📊 Summary</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-warmYellow bg-opacity-10 rounded-lg p-4">
            <p className="text-3xl font-bold text-gray-800">{appContext.stars}</p>
            <p className="text-sm text-gray-500">Total Stars</p>
          </div>
          <div className="bg-skyGreen bg-opacity-10 rounded-lg p-4">
            <p className="text-3xl font-bold text-gray-800">{appContext.coins}</p>
            <p className="text-sm text-gray-500">Total Coins</p>
          </div>
          <div className="bg-coralRed bg-opacity-10 rounded-lg p-4">
            <p className="text-3xl font-bold text-gray-800">{appContext.streak}</p>
            <p className="text-sm text-gray-500">Day Streak</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-700 mb-2">📈 Module Progress</h2>
        {modules.map((mod) => {
          const modProgress = progress[mod.key];
          const completed = modProgress?.completed?.length || 0;
          const pct = mod.total ? Math.round((completed / mod.total) * 100) : (completed > 0 ? Math.min(100, completed * 5) : 0);
          return (
            <div key={mod.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span>{mod.icon}</span>
                  <span className="font-medium text-gray-800">{mod.name}</span>
                </div>
                <span className="text-sm text-gray-400">{completed}{mod.total ? `/${mod.total}` : ''}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-warmYellow to-skyGreen rounded-full transition-all" style={{ width: `${pct}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            if (window.confirm('Reset all progress? This cannot be undone!')) {
              const keys = ['kidsEnglishAppState', 'kidsEnglishAlphabetProgress', 'kidsEnglishVocabProgress',
                'kidsEnglishPhonicsProgress', 'kidsEnglishSpeakingProgress', 'kidsEnglishStoriesProgress',
                'kidsEnglishSentencesProgress', 'kidsEnglishEmotionsProgress', 'kidsEnglishWritingProgress',
                'kidsEnglishGamesProgress'];
              keys.forEach((k) => localStorage.removeItem(k));
              appContext.resetProgress();
              window.location.reload();
            }
          }}
          className="text-red-400 hover:text-red-600 text-sm underline bg-transparent border-none cursor-pointer"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
};

export default ParentDashboard;
