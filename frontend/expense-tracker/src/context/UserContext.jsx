/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";

// 1. Keep the context private to this file
export const UserContext = createContext();

// 2. Export the Provider as the main component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => setUser(userData);
  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
