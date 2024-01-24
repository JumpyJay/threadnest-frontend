import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextProps {
  username: string | null;
  setLoggedInUser: (user: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | null>(() => {
    // Retrieve the username from local storage on component mount
    return localStorage.getItem("username");
  });

  useEffect(() => {
    // Save the username to local storage whenever it changes
    localStorage.setItem("username", username || "");
  }, [username]);

  const setLoggedInUser = (user: string | null) => {
    setUsername(user);
  };

  return (
    <UserContext.Provider value={{ username, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
