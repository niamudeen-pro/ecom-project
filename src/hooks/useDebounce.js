import { useEffect, useState } from "react";

export default function useDebounce(query, delay = 2000) {
  const [debounceValue, setDebounceValue] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  return debounceValue;
}
