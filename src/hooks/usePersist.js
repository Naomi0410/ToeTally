import { useState, useEffect, useMemo } from "react";

const usePersist = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  const memoizedState = useMemo(() => state, [state]);

  return [memoizedState, setState];
};

export default usePersist;
