import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJSON } from '../../utils/contentLoader.js';

const VocabularyGrid = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJSON('/content/english/vocabulary.json')
      .then(setData)
      .catch(setError);
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
          <p>Loading vocabulary...</p>
        </div>
      </div>
    );
  }

  const { categories } = data;

  if (!categories || categories.length === 0) {
    return (
      <div className="px-4 py-8">
        <div className="flex items-center justify-center min-h-[300px] text-gray-500">
          <p>No vocabulary data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        Vocabulary Builder
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Learn new words by category!
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/vocabulary/${cat.id}`}
            className="no-underline group"
          >
            <div
              className="relative flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 min-h-[140px] cursor-pointer transform hover:-translate-y-1"
            >
              <span className="text-5xl mb-3">{cat.icon}</span>
              <span className="text-lg font-bold text-gray-800 text-center">{cat.name}</span>
              <span className="text-xs text-gray-400 mt-2 text-center">{cat.description}</span>
              <span className="text-xs text-gray-300 mt-2">{cat.words.length} words</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VocabularyGrid;
