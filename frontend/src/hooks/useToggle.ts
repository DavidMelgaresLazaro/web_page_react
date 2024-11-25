import { useState } from "react";

function useToggle (initialValue: boolean) {

  const [isTrue, setIsTrue] = useState(initialValue);
  
  function toggleState () {
    setIsTrue(!isTrue);
  }

  return [isTrue, toggleState] as const;
}

export default useToggle;