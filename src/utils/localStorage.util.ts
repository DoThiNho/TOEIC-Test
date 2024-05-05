export const localStorageClient = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item;
    }
  },

  setItem: (key: string, value: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },

  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
};
