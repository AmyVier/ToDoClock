import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to access the context
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to wrap the app and provide the context value
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  // Load the username from localStorage on initial load
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  // Set the username and save it to localStorage
  const handleSetUsername = (username) => {
    setUsername(username);
    localStorage.setItem('username', username);  // Save to localStorage
  };

  return (
    <UserContext.Provider value={{ username, setUsername: handleSetUsername }}>
      {children}
    </UserContext.Provider>
  );
};
