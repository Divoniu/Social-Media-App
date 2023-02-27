import { useCallback, useState } from "react";
// Usage
export function useToggle(initialState = false) {
  // Call the hook which returns, current value and the toggler function

  // Hook
  // Parameter is the boolean, with default "false" value

  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
}
