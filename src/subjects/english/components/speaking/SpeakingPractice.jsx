import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadJSON } from '../../utils/contentLoader.js';
import { speak } from '../../utils/textToSpeech.js';
import SpeakingCard from './SpeakingCard.jsx';

const SpeakingPractice = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    loadJSON('/src/subjects/english/content/english/speaking.json')
      .then(setData)
      .catch(setError);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishSpeakingProgress');
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
          <p>Could not load speaking practice. Please try again later.</p>
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

  const topic = data.topics.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <div className="px-4 py-8">
        <div className="flex items-center justify-center min-h-[300px] text-gray-500">
          <p>Topic not found.</p>
        </div>
      </div>
    );
  }

  const handlePhraseClick = (phrase) => {
    speak(phrase.text, { rate: 0.7, pitch: 1.0 });
    const key = `speaking_${topic.id}_${phrase.text}`;
    if (!completed.includes(key)) {
      const newCompleted = [...completed, key];
      setCompleted(newCompleted);
      localStorage.setItem(
        'kidsEnglishSpeakingProgress',
        JSON.stringify({ completed: newCompleted })
      );
    }
  };

  const completedCount = completed.filter((c) =>
    c.startsWith(`speaking_${topic.id}_`)
  ).length;

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => navigate('/speaking')}
        className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer"
        aria-label="Back to speaking topics"
      >
        ← Back to topics
      </button>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        {topic.icon} {topic.name}
      </h1>
      <p className="text-center text-gray-500 mb-2">{topic.description}</p>
      {completedCount > 0 && (
        <p className="text-center text-sm text-gray-400 mb-6">
          {completedCount} of {topic.phrases.length} phrases practiced
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topic.phrases.map((phrase) => (
          <SpeakingCard
            key={phrase.text}
            phrase={phrase.text}
            hint={phrase.hint}
            emoji={phrase.emoji}
            isCompleted={completed.includes(`speaking_${topic.id}_${phrase.text}`)}
            onClick={() => handlePhraseClick(phrase)}
          />
        ))}
      </div>
    </div>
  );
};

export default SpeakingPractice;
