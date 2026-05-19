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
import StoriesGrid from './components/stories/StoriesGrid.jsx';
import StoryReader from './components/stories/StoryReader.jsx';
import SentencesGrid from './components/sentences/SentencesGrid.jsx';
import EmotionsGrid from './components/emotions/EmotionsGrid.jsx';
import WritingGrid from './components/writing/WritingGrid.jsx';
import GamesHub from './components/games/GamesHub.jsx';
import RewardsPage from './components/rewards/RewardsPage.jsx';
import ParentDashboard from './components/parent/ParentDashboard.jsx';

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
  { path: '/stories', element: <StoriesGrid /> },
  { path: '/stories/:storyId', element: <StoryReader /> },
  { path: '/sentences', element: <SentencesGrid /> },
  { path: '/emotions', element: <EmotionsGrid /> },
  { path: '/writing', element: <WritingGrid /> },
  { path: '/games', element: <GamesHub /> },
  { path: '/rewards', element: <RewardsPage /> },
  { path: '/parent', element: <ParentDashboard /> },
];
