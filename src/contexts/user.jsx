import { createContext, useState } from 'react';
import { createUserDocumentFromAuth } from '../utils/firebase/firebase';

export const UserContext = createContext({
  user: null,
  setUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logout = () => {};

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
