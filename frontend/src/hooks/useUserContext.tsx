import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";

function useUserContext() {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error(
      'You must use "useUserContext" inside <UserProvider> context'
    );
  }

  return context;
}

export default useUserContext;
