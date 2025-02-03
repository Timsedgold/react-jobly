import { useState, useEffect } from "react";

/**
 * useLocalStorage Hook
 * A reusable hook for storing and retrieving values from localStorage.
 */
function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initialValue;
    } catch (err) {
      console.error("Error accessing localStorage:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    if (state === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
