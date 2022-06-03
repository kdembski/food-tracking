const StorageService = {
  getItem(key: string): string {
    const item = localStorage.getItem(key);
    if (!item) {
      return "";
    }
    return item;
  },

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  },

  getObject(key: string): object {
    return JSON.parse(localStorage.getItem(key) || "");
  },

  setObject(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

export default StorageService;
