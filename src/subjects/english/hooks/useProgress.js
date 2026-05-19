import { useAppContext } from '../../../context/AppContext';

export const useProgress = () => {
  const { addCoins, addStars } = useAppContext();

  const [alphabetProgress, setAlphabetProgress] = React.useState(() => {
    const saved = localStorage.getItem('kidsEnglishAlphabetProgress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse alphabet progress from localStorage', e);
      }
    }
    return { completed: [] };
  });

  // Save alphabet progress to localStorage
  const saveAlphabetProgress = (progress) => {
    localStorage.setItem('kidsEnglishAlphabetProgress', JSON.stringify(progress));
    setAlphabetProgress(progress);
  };

  const markLetterComplete = (letter) => {
    if (!alphabetProgress.completed.includes(letter)) {
      const newCompleted = [...alphabetProgress.completed, letter];
      saveAlphabetProgress({ completed: newCompleted });
      // Award 1 star and 10 coins for completing a letter
      addStars(1);
      addCoins(10);
    }
  };

  const getCompletedLetters = () => {
    return alphabetProgress.completed;
  };

  const getAlphabetStars = () => {
    return alphabetProgress.completed.length;
  };

  return {
    alphabetProgress,
    markLetterComplete,
    getCompletedLetters,
    getAlphabetStars
  };
};