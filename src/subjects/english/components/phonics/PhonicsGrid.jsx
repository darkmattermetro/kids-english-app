import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJSON } from '../../utils/contentLoader.js';

const PhonicsGrid = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJSON('/src/subjects/english/content/english/phonics.json')
      .then(setData)
      .catch(setError);
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
          <p>Loading phonics...</p>
        </div>
      </div>
    );
  }

  const { groups } = data;

  if (!groups || groups.length === 0) {
    return (
      <div className="px-4 py-8">
        <div className="flex items-center justify-center min-h-[300px] text-gray-500">
          <p>No phonics data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        Phonics World
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Learn the sounds that letters make!
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/phonics/${group.id}`}
            className="no-underline group"
          >
            <div
              className="relative flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 min-h-[140px] cursor-pointer transform hover:-translate-y-1"
              style={{ minHeight: '64px' }}
            >
              <span className="text-5xl mb-3">{group.icon}</span>
              <span className="text-lg font-bold text-gray-800 text-center">{group.name}</span>
              <span className="text-xs text-gray-400 mt-2 text-center">{group.description}</span>
              <span className="text-xs text-gray-300 mt-2">{group.sounds.length} sounds</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhonicsGrid;
