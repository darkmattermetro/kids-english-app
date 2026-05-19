import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

beforeEach(() => {
  vi.restoreAllMocks();
  window.speechSynthesis = {
    cancel: vi.fn(),
    speak: vi.fn(),
    speaking: false,
    getVoices: vi.fn().mockReturnValue([
      { lang: 'en-US', name: 'Test Voice' },
    ]),
  };
  global.SpeechSynthesisUtterance = vi.fn().mockImplementation((text) => ({
    text,
    rate: 0.85,
    pitch: 1.1,
    voice: null,
    lang: 'en-US',
  }));
});

const sampleData = {
  letter: 'A',
  uppercase: 'A',
  lowercase: 'a',
  phoneme: '/æ/',
  sound_description: 'short a as in apple',
  words: [{ word: 'Apple', emoji: '🍎', sentence: 'I eat an apple.' }],
  themeColor: 'warmYellow',
};

describe('LetterCard', () => {
  it('renders letter, emoji, and word', async () => {
    const LetterCard = (await import(
      '../../subjects/english/components/alphabet/LetterCard.jsx'
    )).default;

    render(
      <BrowserRouter>
        <LetterCard data={sampleData} isCompleted={false} />
      </BrowserRouter>
    );

    expect(screen.getByText('A')).toBeTruthy();
    expect(screen.getByText('🍎')).toBeTruthy();
    expect(screen.getByText('Apple')).toBeTruthy();
  });

  it('shows star when completed', async () => {
    const LetterCard = (await import(
      '../../subjects/english/components/alphabet/LetterCard.jsx'
    )).default;

    render(
      <BrowserRouter>
        <LetterCard data={sampleData} isCompleted={true} />
      </BrowserRouter>
    );

    expect(screen.getByText('⭐')).toBeTruthy();
  });

  it('hides star when not completed', async () => {
    const LetterCard = (await import(
      '../../subjects/english/components/alphabet/LetterCard.jsx'
    )).default;

    render(
      <BrowserRouter>
        <LetterCard data={sampleData} isCompleted={false} />
      </BrowserRouter>
    );

    expect(screen.queryByText('⭐')).toBeNull();
  });

  it('has correct aria-label', async () => {
    const LetterCard = (await import(
      '../../subjects/english/components/alphabet/LetterCard.jsx'
    )).default;

    render(
      <BrowserRouter>
        <LetterCard data={sampleData} isCompleted={false} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Letter A for Apple')).toBeTruthy();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const LetterCard = (await import(
      '../../subjects/english/components/alphabet/LetterCard.jsx'
    )).default;

    render(
      <BrowserRouter>
        <LetterCard data={sampleData} isCompleted={false} onClick={onClick} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByLabelText('Letter A for Apple'));
    expect(onClick).toHaveBeenCalledWith('A');
  });
});
