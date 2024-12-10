import { User } from "../config/types";
import { createContext, ReactNode, useState } from "react";

type UserContextType = {
  user: User | null;
  logIn: (user: User) => void;
  logOut: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

const LOCAL_STORAGE_USER_KEY = "gamexx-user";

type UserProviderProps = {
  children: ReactNode;
};
function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    return user ? JSON.parse(user) : null;
  });

  function logIn(user: User) {
    setUser(user);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  }

  function logOut() {
    setUser(null);

    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }

  const valueForContext = {
    user,
    logIn,
    logOut,
  };

  return (
    <UserContext.Provider value={valueForContext}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

export { UserContext };
