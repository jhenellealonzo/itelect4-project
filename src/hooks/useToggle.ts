import { useState } from "react";

// A reusable hook for toggling a boolean value
export function useToggle(
  initialValue: boolean
): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue((previous) => !previous);
  };

  return [value, toggle];
}