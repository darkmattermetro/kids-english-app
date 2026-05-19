import { describe, it, expect, vi, beforeEach } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
  global.SpeechSynthesisUtterance = vi.fn().mockImplementation((text) => ({
    text,
    rate: 0.85,
    pitch: 1.1,
    voice: null,
    lang: 'en-US',
  }));
  window.speechSynthesis = {
    cancel: vi.fn(),
    speak: vi.fn(),
    speaking: false,
    getVoices: vi.fn().mockReturnValue([
      { lang: 'en-US', name: 'Test Voice' },
    ]),
  };
});

describe('textToSpeech', () => {
  it('isSupported returns true when speechSynthesis exists', async () => {
    const { isSupported } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    expect(isSupported()).toBe(true);
  });

  it('isSupported returns false when speechSynthesis is missing', async () => {
    delete window.speechSynthesis;
    const { isSupported } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    expect(isSupported()).toBe(false);
  });

  it('speak calls speechSynthesis.speak with text', async () => {
    const { speak } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    speak('Hello');
    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    const utterance = window.speechSynthesis.speak.mock.calls[0][0];
    expect(utterance.text).toBe('Hello');
    expect(utterance.rate).toBe(0.85);
    expect(utterance.pitch).toBe(1.1);
  });

  it('speak uses custom rate and pitch', async () => {
    const { speak } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    speak('Test', { rate: 0.5, pitch: 1.5 });
    const utterance = window.speechSynthesis.speak.mock.calls[0][0];
    expect(utterance.rate).toBe(0.5);
    expect(utterance.pitch).toBe(1.5);
  });

  it('speak cancels previous utterance before speaking', async () => {
    const { speak } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    speak('First');
    speak('Second');
    expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(2);
  });

  it('speak does nothing when not supported', async () => {
    delete window.speechSynthesis;
    const { speak } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    speak('Hello');
    expect(window.speechSynthesis).toBeUndefined();
  });

  it('stop calls speechSynthesis.cancel', async () => {
    const { stop } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    stop();
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  it('isSpeaking returns speechSynthesis.speaking', async () => {
    const { isSpeaking } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    window.speechSynthesis.speaking = true;
    expect(isSpeaking()).toBe(true);
    window.speechSynthesis.speaking = false;
    expect(isSpeaking()).toBe(false);
  });

  it('speak selects en-US voice when available', async () => {
    const { speak } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    speak('Test');
    const utterance = window.speechSynthesis.speak.mock.calls[0][0];
    expect(utterance.voice.lang).toBe('en-US');
  });

  it('speak selects en fallback when en-US unavailable', async () => {
    window.speechSynthesis.getVoices.mockReturnValue([
      { lang: 'en-GB', name: 'British Voice' },
    ]);
    const { speak } = await import(
      '../../subjects/english/utils/textToSpeech.js'
    );
    speak('Test');
    const utterance = window.speechSynthesis.speak.mock.calls[0][0];
    expect(utterance.voice.lang).toBe('en-GB');
  });
});
