import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJSON } from '../../utils/contentLoader.js';
import LetterCard from './LetterCard.jsx';

const AlphabetGrid = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    loadJSON('/content/english/alphabet.json')
      .then(setData)
      .catch(setError);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishAlphabetProgress');
      if (saved) setCompleted(JSON.parse(saved).completed || []);
    } catch {}
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500">
        <p>Could not load alphabet. Please try again later.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500">
        <p>Loading alphabet...</p>
      </div>
    );
  }

  const { letters } = data;

  if (!letters || letters.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500">
        <p>No alphabet data available.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        Alphabet Adventure
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Tap a letter to hear it and start learning!
      </p>
      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {letters.map((letterData) => (
          <Link
            key={letterData.letter}
            to={`/alphabet/${letterData.letter}`}
            className="no-underline"
          >
            <LetterCard
              data={letterData}
              isCompleted={completed.includes(letterData.letter)}
            />
          </Link>
        ))}
      </div>
      {completed.length > 0 && (
        <p className="text-center text-gray-500 mt-8">
          Completed {completed.length} of 26 letters
        </p>
      )}
    </div>
  );
};

export default AlphabetGrid;
