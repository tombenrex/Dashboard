export const state = {
  get(key, defaultValue) {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return value || defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(
        key,
        typeof value === "string" ? value : JSON.stringify(value)
      );
    } catch (err) {
      console.error(`Failed to set ${key}:`, err);
    }
  },
  clear() {
    localStorage.clear();
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
