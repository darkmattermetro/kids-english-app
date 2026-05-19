let currentUtterance = null;

export const isSupported = () => {
  return 'speechSynthesis' in window;
};

const getVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en-US'));
  if (preferred) return preferred;
  const fallback = voices.find(v => v.lang.startsWith('en'));
  return voices[0] || null;
};

export const speak = (text, { rate = 0.85, pitch = 1.1 } = {}) => {
  if (!isSupported() || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = getVoice();
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.lang = 'en-US';
  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};

export const stop = () => {
  if (!isSupported()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
};

export const isSpeaking = () => {
  return window.speechSynthesis && window.speechSynthesis.speaking;
};
