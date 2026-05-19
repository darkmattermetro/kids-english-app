import { useEffect, useState } from 'react';
import { loadJSON } from '../../utils/contentLoader.js';
import { useAppContext } from '../../../../context/AppContext.jsx';

const RewardsPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const appContext = useAppContext();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    loadJSON('/content/english/rewards.json')
      .then(setData)
      .catch(setError);
  }, []);

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
    result.coins = appContext.coins || 0;
    result.stars = appContext.stars || 0;
    result.streak = appContext.streak || 0;
    setProgress(result);
  }, [appContext.coins, appContext.stars, appContext.streak]);

  const getBadgeProgress = (badge) => {
    switch (badge.trackerKey) {
      case 'alphabet': return progress.kidsEnglishAlphabetProgress?.completed?.length || 0;
      case 'vocabulary': return progress.kidsEnglishVocabProgress?.completed?.length || 0;
      case 'phonics': return progress.kidsEnglishPhonicsProgress?.completed?.length || 0;
      case 'speaking': return progress.kidsEnglishSpeakingProgress?.completed?.length || 0;
      case 'stories': return progress.kidsEnglishStoriesProgress?.completed?.length || 0;
      case 'sentences': return progress.kidsEnglishSentencesProgress?.completed?.length || 0;
      case 'emotions': return progress.kidsEnglishEmotionsProgress?.completed?.length || 0;
      case 'writing': return progress.kidsEnglishWritingProgress?.completed?.length || 0;
      case 'games': return progress.kidsEnglishGamesProgress?.memoryWins || 0;
      case 'stars': return progress.stars || 0;
      case 'coins': return progress.coins || 0;
      case 'streak': return progress.streak || 0;
      default: return 0;
    }
  };

  if (error) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Could not load rewards.</p></div></div>;
  if (!data) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Loading rewards...</p></div></div>;

  const { badges } = data;
  if (!badges || badges.length === 0) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>No badges available.</p></div></div>;

  const earnedBadges = badges.filter((b) => getBadgeProgress(b) >= b.maxProgress);
  const lockedBadges = badges.filter((b) => getBadgeProgress(b) < b.maxProgress);

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Rewards & Badges</h1>
      <p className="text-center text-gray-500 mb-8">Collect badges as you learn!</p>

      <div className="flex justify-center gap-8 mb-8">
        <div className="text-center">
          <span className="text-3xl">⭐</span>
          <p className="text-2xl font-bold text-gray-800">{appContext.stars}</p>
          <p className="text-xs text-gray-400">Stars</p>
        </div>
        <div className="text-center">
          <span className="text-3xl">🪙</span>
          <p className="text-2xl font-bold text-gray-800">{appContext.coins}</p>
          <p className="text-xs text-gray-400">Coins</p>
        </div>
        <div className="text-center">
          <span className="text-3xl">🔥</span>
          <p className="text-2xl font-bold text-gray-800">{appContext.streak}</p>
          <p className="text-xs text-gray-400">Day Streak</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-700 mb-4">🏅 Earned Badges ({earnedBadges.length}/{badges.length})</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {earnedBadges.map((badge) => (
          <div key={badge.id} className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-md">
            <span className="text-4xl">{badge.emoji}</span>
            <div>
              <p className="font-bold text-gray-800">{badge.name}</p>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </div>
          </div>
        ))}
        {earnedBadges.length === 0 && <p className="text-gray-400 text-sm col-span-full text-center py-4">No badges earned yet. Keep learning!</p>}
      </div>

      <h2 className="text-xl font-bold text-gray-700 mb-4">🔒 Locked Badges</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lockedBadges.map((badge) => {
          const prog = getBadgeProgress(badge);
          const pct = Math.min(100, Math.round((prog / badge.maxProgress) * 100));
          return (
            <div key={badge.id} className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4 opacity-70">
              <span className="text-4xl grayscale">{badge.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-gray-600">{badge.name}</p>
                <p className="text-xs text-gray-400">{badge.requirement}</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-warmYellow rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{prog}/{badge.maxProgress}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RewardsPage;
