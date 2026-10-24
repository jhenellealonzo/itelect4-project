import { useState } from "react";

// Generic hook that remembers the previous render value.
export function usePrevious<T>(
  value: T
): T | undefined {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState<T>();

  if (!Object.is(current, value)) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}

export default usePrevious;
