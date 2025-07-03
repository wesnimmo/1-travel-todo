import { useState, useEffect } from "react";

//Pre typescript:

// function getStorageValue(key, defaultValue) {
//   const saved = localStorage.getItem(key);
//   if (saved === null) return defaultValue;
//   try {
//     return JSON.parse(saved);
//   } catch {
//     return defaultValue;
//   }
// }

// export function useLocalStorage(key, defaultValue) {
//   const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// }




//******WITH TYPESCRIPT**************//
// key: string — the type of the first argument (key) is string.

// defaultValue: T — the type of the second argument (defaultValue) is the generic type T.

// ): [T, React.Dispatch<React.SetStateAction<T>>] — this is the return type of the function: a tuple with two elements.

// What Does [T, React.Dispatch<React.SetStateAction<T>>] Mean?
// It means the function returns an array (tuple) with two elements:

// The value of type T (your stateful value)

// The setter function, which has the same type as setState from React
function getStorageValue<T>(key: string, defaultValue: T): T {
  const saved = localStorage.getItem(key);
  if (saved === null) return defaultValue;
  try {
    return JSON.parse(saved) as T;
  } catch {
    return defaultValue;
  }
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

