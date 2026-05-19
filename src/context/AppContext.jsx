import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize state with values from localStorage or defaults
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('kidsEnglishAppState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse localStorage state, using defaults');
      }
    }
    // Default state
    return {
      coins: 0,
      stars: 0,
      streak: 0,
      lastActiveDate: '',
      profile: {
        name: '',
        avatar: 0 // index of avatar
      }
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kidsEnglishAppState', JSON.stringify(state));
  }, [state]);

  // Actions to update state
  const addCoins = (amount) => {
    setState(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const addStars = (amount) => {
    setState(prev => ({ ...prev, stars: prev.stars + amount }));
  };

  const setStreak = (streak) => {
    setState(prev => ({ ...prev, streak }));
  };

  const setLastActiveDate = (date) => {
    setState(prev => ({ ...prev, lastActiveDate: date }));
  };

  const setProfile = (profile) => {
    setState(prev => ({ ...prev, profile }));
  };

  const resetProgress = () => {
    setState({
      coins: 0,
      stars: 0,
      streak: 0,
      lastActiveDate: '',
      profile: { name: '', avatar: 0 }
    });
  };

  const value = {
    ...state,
    addCoins,
    addStars,
    setStreak,
    setLastActiveDate,
    setProfile,
    resetProgress
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};