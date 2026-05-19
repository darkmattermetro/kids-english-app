import React from 'react';
import AlphabetGrid from './components/alphabet/AlphabetGrid.jsx';
import LetterDetailPage from './components/alphabet/LetterDetailPage.jsx';
import AlphabetSong from './components/alphabet/AlphabetSong.jsx';
import VocabularyGrid from './components/vocabulary/VocabularyGrid.jsx';
import VocabularyCategoryPage from './components/vocabulary/VocabularyCategoryPage.jsx';
import PhonicsGrid from './components/phonics/PhonicsGrid.jsx';
import PhonicsDetailPage from './components/phonics/PhonicsDetailPage.jsx';
import SpeakingGrid from './components/speaking/SpeakingGrid.jsx';
import SpeakingPractice from './components/speaking/SpeakingPractice.jsx';

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
  { path: '/phonics', element: <PhonicsGrid /> },
  { path: '/phonics/:groupId', element: <PhonicsDetailPage /> },
  { path: '/vocabulary', element: <VocabularyGrid /> },
  { path: '/vocabulary/:categoryId', element: <VocabularyCategoryPage /> },
  { path: '/speaking', element: <SpeakingGrid /> },
  { path: '/speaking/:topicId', element: <SpeakingPractice /> },
  { path: '/stories', element: <StoriesPlaceholder /> },
  { path: '/sentences', element: <SentencesPlaceholder /> },
  { path: '/emotions', element: <EmotionsPlaceholder /> },
  { path: '/writing', element: <WritingPlaceholder /> },
  { path: '/games', element: <GamesPlaceholder /> },
  { path: '/rewards', element: <RewardsPlaceholder /> },
  { path: '/parent', element: <ParentPlaceholder /> },
];
