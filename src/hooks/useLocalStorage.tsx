export const useLocalStorage = () => {
  const setItem = <T,>(key: string, value: T): void => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      window.console.error(error);
    }
  };

  const getItem = <T,>(key: string): T | undefined => {
    if (typeof window === "undefined") return;

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return undefined;

      return JSON.parse(item) as T;
    } catch (error) {
      window.console.error(error);
      return undefined;
    }
  };

  const removeItem = (key: string): void => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      window.console.error(error);
    }
  };
  return {
    getItem,
    setItem,
    removeItem,
  };
};
