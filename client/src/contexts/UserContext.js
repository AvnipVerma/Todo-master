import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
