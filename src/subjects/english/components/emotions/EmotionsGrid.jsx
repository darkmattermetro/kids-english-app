import { useEffect, useState } from 'react';
import { loadJSON } from '../../utils/contentLoader.js';
import { speak } from '../../utils/textToSpeech.js';

const EmotionsGrid = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  useEffect(() => {
    loadJSON('/src/subjects/english/content/english/emotions.json')
      .then(setData)
      .catch(setError);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kidsEnglishEmotionsProgress');
      if (saved) setCompleted(JSON.parse(saved).completed || []);
    } catch {}
  }, []);

  if (error) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Could not load emotions.</p></div></div>;
  if (!data) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>Loading emotions...</p></div></div>;

  const { emotions } = data;
  if (!emotions || emotions.length === 0) return <div className="px-4 py-8"><div className="flex items-center justify-center min-h-[300px] text-gray-500"><p>No emotions available.</p></div></div>;

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion.id === selectedEmotion ? null : emotion.id);
    speak(emotion.name, { rate: 0.8, pitch: 1.1 });
    if (!completed.includes(emotion.id)) {
      const newCompleted = [...completed, emotion.id];
      setCompleted(newCompleted);
      localStorage.setItem('kidsEnglishEmotionsProgress', JSON.stringify({ completed: newCompleted }));
    }
  };

  const completedCount = completed.length;

  if (selectedEmotion) {
    const emotion = emotions.find((e) => e.id === selectedEmotion);
    return (
      <div className="px-4 py-8 max-w-lg mx-auto">
        <button onClick={() => setSelectedEmotion(null)} className="mb-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer">← Back to emotions</button>
        <div className="bg-white rounded-xl shadow-md p-8 mb-6 text-center">
          <span className="text-8xl block mb-4">{emotion.emoji}</span>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{emotion.name}</h2>
          <p className="text-gray-500 mb-6">{emotion.description}</p>
          <button onClick={() => speak(emotion.name, { rate: 0.8, pitch: 1.1 })} className="bg-warmYellow hover:bg-yellow-400 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all border-none cursor-pointer">🔊 Listen</button>
        </div>
        <h3 className="text-lg font-bold text-gray-700 mb-3">When you feel this way:</h3>
        <div className="space-y-2 mb-6">
          {emotion.scenarios.map((scenario, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
              <span className="text-xl">{['🌟','🌤️','🎯','💫'][i % 4]}</span>
              <p className="text-gray-700">{scenario}</p>
            </div>
          ))}
        </div>
        <h3 className="text-lg font-bold text-gray-700 mb-3">What you can say:</h3>
        <div className="space-y-2">
          {emotion.phrases.map((phrase, i) => (
            <button key={i} onClick={() => speak(phrase, { rate: 0.75, pitch: 1.0 })} className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-warmYellow hover:shadow-md transition-all cursor-pointer">
              <span className="text-gray-800 font-medium">{phrase}</span>
              <span className="float-right text-gray-400">🔊</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Emotion Lab</h1>
      <p className="text-center text-gray-500 mb-8">Learn about feelings and emotions!</p>
      {completedCount > 0 && <p className="text-center text-sm text-gray-400 mb-6">{completedCount} of {emotions.length} emotions learned</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {emotions.map((emotion) => (
          <button key={emotion.id} onClick={() => handleEmotionClick(emotion)} className="relative flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 min-h-[140px] cursor-pointer border-none transform hover:-translate-y-1">
            {completed.includes(emotion.id) && <span className="absolute top-2 right-2 text-lg">⭐</span>}
            <span className="text-5xl mb-3">{emotion.emoji}</span>
            <span className="text-lg font-bold text-gray-800">{emotion.name}</span>
            <span className="text-xs text-gray-400 mt-2 text-center">{emotion.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionsGrid;
