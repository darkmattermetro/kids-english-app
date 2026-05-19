const cache = new Map();

export const loadJSON = async (path) => {
  if (cache.has(path)) return cache.get(path);
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
    const data = await response.json();
    cache.set(path, data);
    return data;
  } catch (error) {
    console.error('contentLoader error:', error);
    throw error;
  }
};

export const clearCache = () => cache.clear();
