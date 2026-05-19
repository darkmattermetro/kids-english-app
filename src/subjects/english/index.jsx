import React from 'react';
import AlphabetGrid from './components/alphabet/AlphabetGrid.jsx';
import LetterDetailPage from './components/alphabet/LetterDetailPage.jsx';
import AlphabetSong from './components/alphabet/AlphabetSong.jsx';

const PhonicsPlaceholder = () => <div>Phonics Placeholder</div>;
const VocabularyPlaceholder = () => <div>Vocabulary Placeholder</div>;
const SpeakingPlaceholder = () => <div>Speaking Placeholder</div>;
const StoriesPlaceholder = () => <div>Stories Placeholder</div>;
const SentencesPlaceholder = () => <div>Sentences Placeholder</div>;
const EmotionsPlaceholder = () => <div>Emotions Placeholder</div>;
const WritingPlaceholder = () => <div>Writing Placeholder</div>;
const GamesPlaceholder = () => <div>Games Placeholder</div>;
const RewardsPlaceholder = () => <div>Rewards Placeholder</div>;
const ParentPlaceholder = () => <div>Parent Placeholder</div>;

export const englishRoutes = [
  { path: '/alphabet', element: <AlphabetGrid /> },
  { path: '/alphabet/song', element: <AlphabetSong /> },
  { path: '/alphabet/:letter', element: <LetterDetailPage /> },
  { path: '/phonics', element: <PhonicsPlaceholder /> },
  { path: '/vocabulary', element: <VocabularyPlaceholder /> },
  { path: '/speaking', element: <SpeakingPlaceholder /> },
  { path: '/stories', element: <StoriesPlaceholder /> },
  { path: '/sentences', element: <SentencesPlaceholder /> },
  { path: '/emotions', element: <EmotionsPlaceholder /> },
  { path: '/writing', element: <WritingPlaceholder /> },
  { path: '/games', element: <GamesPlaceholder /> },
  { path: '/rewards', element: <RewardsPlaceholder /> },
  { path: '/parent', element: <ParentPlaceholder /> },
];
