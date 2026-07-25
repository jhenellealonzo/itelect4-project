import { useEffect, useRef } from "react";

// Generic hook that remembers the previous value
export function usePrevious<T>(
  value: T
): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}