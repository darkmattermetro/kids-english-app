import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadJSON } from '../../utils/contentLoader.js';
import { speak } from '../../utils/textToSpeech.js';

const StoryReader = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    loadJSON('/src/subjects/english/content/english/stories.json')
      .then(setData)
      .catch(setError);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishStoriesProgress');
      if (saved) setCompleted(JSON.parse(saved).completed || []);
    } catch {}
  }, []);

  if (error) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Could not load story.</p></div></div>;
  if (!data) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Loading story...</p></div></div>;

  const story = data.stories.find((s) => s.id === storyId);
  if (!story) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Story not found.</p></div></div>;

  const handleRead = (sentence) => {
    speak(sentence.text, { rate: 0.75, pitch: 1.1 });
  };

  const handleNext = () => {
    if (currentSentence < story.sentences.length - 1) {
      setCurrentSentence((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSentence > 0) {
      setCurrentSentence((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    if (!completed.includes(story.id)) {
      const newCompleted = [...completed, story.id];
      setCompleted(newCompleted);
      localStorage.setItem('kidsEnglishStoriesProgress', JSON.stringify({ completed: newCompleted }));
    }
    navigate('/stories');
  };

  const sentence = story.sentences[currentSentence];
  const isLastPage = currentSentence === story.sentences.length - 1;
  const isFirstPage = currentSentence === 0;

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/stories')} className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer" aria-label="Back to stories">
        ← Back to stories
      </button>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">{story.icon} {story.title}</h1>
      <p className="text-center text-gray-400 text-sm mb-8">Page {currentSentence + 1} of {story.sentences.length}</p>

      <div className="bg-white rounded-xl shadow-md p-8 mb-6">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-7xl">{sentence.emoji}</span>
          <p className="text-2xl font-bold text-gray-800 text-center leading-relaxed">{sentence.text}</p>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => handleRead(sentence)}
          className="bg-warmYellow hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          aria-label="Read aloud"
        >
          🔊 Listen
        </button>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={isFirstPage}
          className={`py-3 px-6 rounded-full text-lg font-bold shadow-md transition-all duration-300 ${isFirstPage ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white text-gray-700 hover:shadow-lg hover:-translate-y-1'}`}
          aria-label="Previous page"
        >
          ← Back
        </button>

        {isLastPage ? (
          <button
            onClick={handleFinish}
            className="bg-skyGreen hover:bg-green-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Finish story"
          >
            ✅ Finish Story
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-coralRed hover:bg-red-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Next page"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryReader;
