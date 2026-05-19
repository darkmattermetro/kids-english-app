import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  vi.restoreAllMocks();
  global.fetch = vi.fn();
  localStorage.clear();
});

describe('AlphabetGrid', () => {
  it('shows loading state initially', async () => {
    global.fetch.mockImplementationOnce(
      () => new Promise(() => {})
    );

    const AlphabetGrid = (await import(
      '../../subjects/english/components/alphabet/AlphabetGrid.jsx'
    )).default;

    render(
      <MemoryRouter>
        <AlphabetGrid />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading alphabet...')).toBeTruthy();
  });

  it('renders letter cards when data loads', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        letters: [
          { letter: 'A', uppercase: 'A', lowercase: 'a', phoneme: '/æ/',
            sound_description: 'short a', words: [{ word: 'Apple', emoji: '🍎', sentence: 'I eat an apple.' }],
            themeColor: 'warmYellow' },
          { letter: 'B', uppercase: 'B', lowercase: 'b', phoneme: '/b/',
            sound_description: 'b as in ball', words: [{ word: 'Ball', emoji: '⚽', sentence: 'I play with a ball.' }],
            themeColor: 'skyGreen' },
        ],
      }),
    });

    const AlphabetGrid = (await import(
      '../../subjects/english/components/alphabet/AlphabetGrid.jsx'
    )).default;

    render(
      <MemoryRouter>
        <AlphabetGrid />
      </MemoryRouter>
    );

    const aElement = await screen.findByText('A');
    expect(aElement).toBeTruthy();
    expect(screen.getByText('B')).toBeTruthy();
  });

  it('shows error state when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const AlphabetGrid = (await import(
      '../../subjects/english/components/alphabet/AlphabetGrid.jsx'
    )).default;

    render(
      <MemoryRouter>
        <AlphabetGrid />
      </MemoryRouter>
    );

    const errorElement = await screen.findByText(
      'Could not load alphabet. Please try again later.'
    );
    expect(errorElement).toBeTruthy();
  });

  it('shows empty state when no letters', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ letters: [] }),
    });

    const AlphabetGrid = (await import(
      '../../subjects/english/components/alphabet/AlphabetGrid.jsx'
    )).default;

    render(
      <MemoryRouter>
        <AlphabetGrid />
      </MemoryRouter>
    );

    const emptyElement = await screen.findByText(
      'No alphabet data available.'
    );
    expect(emptyElement).toBeTruthy();
  });

  it('shows progress count when letters completed', async () => {
    localStorage.setItem(
      'kidsEnglishAlphabetProgress',
      JSON.stringify({ completed: ['A'] })
    );

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        letters: [
          { letter: 'A', uppercase: 'A', lowercase: 'a', phoneme: '/æ/',
            sound_description: 'short a', words: [{ word: 'Apple', emoji: '🍎', sentence: 'I eat an apple.' }],
            themeColor: 'warmYellow' },
        ],
      }),
    });

    const AlphabetGrid = (await import(
      '../../subjects/english/components/alphabet/AlphabetGrid.jsx'
    )).default;

    render(
      <MemoryRouter>
        <AlphabetGrid />
      </MemoryRouter>
    );

    const progressElement = await screen.findByText(
      /Completed 1 of 26 letters/
    );
    expect(progressElement).toBeTruthy();
  });
});
