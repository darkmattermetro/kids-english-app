const SpeakingCard = ({ phrase, hint, emoji, isCompleted, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label={`Say: ${phrase}`}
      tabIndex={0}
      className="relative flex flex-col items-center justify-center p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 min-h-[100px] cursor-pointer border-none transform hover:-translate-y-1"
    >
      {isCompleted && (
        <span className="absolute top-2 right-2 text-lg" role="img" aria-label="completed">⭐</span>
      )}
      <span className="text-3xl mb-2">{emoji}</span>
      <span className="text-base font-bold text-gray-800 text-center">{phrase}</span>
      <span className="text-xs text-gray-400 mt-1">{hint}</span>
      <span className="text-xs text-gray-300 mt-2">Tap to hear and practice</span>
    </button>
  );
};

export default SpeakingCard;
