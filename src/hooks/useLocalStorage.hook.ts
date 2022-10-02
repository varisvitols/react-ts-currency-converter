import React, { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  // Invoking function in the UseState initial value, cause we want to retrieve the value from local storage only once to improve performance, instead of doing it every time the component re-renders.
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);

  // return [value, setValue] as [typeof value, typeof setValue];
  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
