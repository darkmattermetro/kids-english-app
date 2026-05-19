import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadJSON } from '../../utils/contentLoader.js';
import { speak } from '../../utils/textToSpeech.js';
import PhonicsCard from './PhonicsCard.jsx';

const PhonicsDetailPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    loadJSON('/src/subjects/english/content/english/phonics.json')
      .then(setData)
      .catch(setError);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishPhonicsProgress');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCompleted(parsed.completed || []);
      }
    } catch {}
  }, []);

  if (error) {
    return (
      <div className="px-4 py-8">
        <div className="flex items-center justify-center min-h-[300px] text-gray-500">
          <p>Could not load phonics. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="px-4 py-8">
        <div className="flex items-center justify-center min-h-[300px] text-gray-500">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const group = data.groups.find((g) => g.id === groupId);

  if (!group) {
    return (
      <div className="px-4 py-8">
        <div className="flex items-center justify-center min-h-[300px] text-gray-500">
          <p>Group not found.</p>
        </div>
      </div>
    );
  }

  const handleSoundClick = (sound) => {
    speak(`${sound.example}. ${sound.letter} says ${sound.phoneme}`, {
      rate: 0.75,
      pitch: 1.0,
    });
    const key = `phonics_${group.id}_${sound.letter}`;
    if (!completed.includes(key)) {
      const newCompleted = [...completed, key];
      setCompleted(newCompleted);
      localStorage.setItem(
        'kidsEnglishPhonicsProgress',
        JSON.stringify({ completed: newCompleted })
      );
    }
  };

  const completedCount = completed.filter((c) =>
    c.startsWith(`phonics_${group.id}_`)
  ).length;

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => navigate('/phonics')}
        className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer"
        aria-label="Back to phonics"
      >
        ← Back to groups
      </button>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        {group.icon} {group.name}
      </h1>
      <p className="text-center text-gray-500 mb-2">{group.description}</p>
      {completedCount > 0 && (
        <p className="text-center text-sm text-gray-400 mb-6">
          {completedCount} of {group.sounds.length} sounds learned
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {group.sounds.map((sound) => (
          <PhonicsCard
            key={sound.letter}
            letter={sound.letter}
            phoneme={sound.phoneme}
            example={sound.example}
            emoji={sound.emoji}
            tip={sound.tip}
            isCompleted={completed.includes(`phonics_${group.id}_${sound.letter}`)}
            onClick={() => handleSoundClick(sound)}
          />
        ))}
      </div>
    </div>
  );
};

export default PhonicsDetailPage;
