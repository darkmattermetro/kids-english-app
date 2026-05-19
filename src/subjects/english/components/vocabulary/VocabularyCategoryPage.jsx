import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadJSON } from '../../utils/contentLoader.js';
import { speak } from '../../utils/textToSpeech.js';
import VocabularyCard from './VocabularyCard.jsx';

const VocabularyCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    loadJSON('/content/english/vocabulary.json')
      .then(setData)
      .catch(setError);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishVocabProgress');
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
          <p>Could not load vocabulary. Please try again later.</p>
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

  const category = data.categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="px-4 py-8">
        <div className="flex items-center justify-center min-h-[300px] text-gray-500">
          <p>Category not found.</p>
        </div>
      </div>
    );
  }

  const handleWordClick = (word) => {
    speak(word.word, { rate: 0.8, pitch: 1.1 });
    const key = `vocab_${category.id}_${word.word}`;
    if (!completed.includes(key)) {
      const newCompleted = [...completed, key];
      setCompleted(newCompleted);
      localStorage.setItem(
        'kidsEnglishVocabProgress',
        JSON.stringify({ completed: newCompleted })
      );
    }
  };

  const completedCount = completed.filter((c) =>
    c.startsWith(`vocab_${category.id}_`)
  ).length;

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => navigate('/vocabulary')}
        className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer"
        aria-label="Back to vocabulary"
      >
        ← Back to categories
      </button>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        {category.icon} {category.name}
      </h1>
      <p className="text-center text-gray-500 mb-2">{category.description}</p>
      {completedCount > 0 && (
        <p className="text-center text-sm text-gray-400 mb-6">
          {completedCount} of {category.words.length} words learned
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.words.map((w) => (
          <VocabularyCard
            key={w.word}
            word={w.word}
            emoji={w.emoji}
            sentence={w.sentence}
            isCompleted={completed.includes(`vocab_${category.id}_${w.word}`)}
            onClick={() => handleWordClick(w)}
          />
        ))}
      </div>
    </div>
  );
};

export default VocabularyCategoryPage;
