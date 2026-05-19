const PhonicsCard = ({ letter, phoneme, example, emoji, tip, isCompleted, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label={`${letter} says ${phoneme} as in ${example}`}
      tabIndex={0}
      className="relative flex flex-col items-center justify-center p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 min-h-[120px] cursor-pointer border-none transform hover:-translate-y-1"
    >
      {isCompleted && (
        <span className="absolute top-2 right-2 text-lg" role="img" aria-label="completed">⭐</span>
      )}
      <span className="text-3xl mb-1">{emoji}</span>
      <span className="text-2xl font-bold text-gray-800">{letter}</span>
      <span className="text-sm text-gray-500">{phoneme}</span>
      <span className="text-xs text-gray-400 mt-1">{example}</span>
    </button>
  );
};

export default PhonicsCard;
