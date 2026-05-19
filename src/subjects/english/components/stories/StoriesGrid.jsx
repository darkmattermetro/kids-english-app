import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJSON } from '../../utils/contentLoader.js';

const StoriesGrid = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [readStories, setReadStories] = useState([]);

  useEffect(() => {
    loadJSON('/src/subjects/english/content/english/stories.json')
      .then(setData)
      .catch(setError);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishStoriesProgress');
      if (saved) setReadStories(JSON.parse(saved).completed || []);
    } catch {}
  }, []);

  if (error) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Could not load stories.</p></div></div>;
  if (!data) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Loading stories...</p></div></div>;

  const { stories } = data;
  if (!stories || stories.length === 0) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>No stories available.</p></div></div>;

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Reading Stories</h1>
      <p className="text-center text-gray-500 mb-8">Read fun stories and learn new words!</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <Link key={story.id} to={`/stories/${story.id}`} className="no-underline group">
            <div className="relative flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 min-h-[160px] cursor-pointer transform hover:-translate-y-1">
              {readStories.includes(story.id) && <span className="absolute top-2 right-2 text-lg">⭐</span>}
              <span className="text-5xl mb-3">{story.icon}</span>
              <span className="text-lg font-bold text-gray-800 text-center">{story.title}</span>
              <span className="text-xs text-gray-400 mt-2">{story.sentences.length} sentences</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoriesGrid;
