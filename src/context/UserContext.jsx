import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("SchoolAuthData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.user) {
          setUser(parsed.user);
          setTokens(parsed.tokens || null);
        }
      } catch (err) {
        console.error("Failed to parse SchoolAuthData:", err);
        localStorage.removeItem("SchoolAuthData");
      }
    }
  }, []);

  const login = (responseData) => {
    if (!responseData?.user || !responseData?.tokens) return;

    localStorage.setItem("SchoolAuthData", JSON.stringify(responseData));
    setUser(responseData.user);
    setTokens(responseData.tokens);
  };

  const logout = () => {
    localStorage.removeItem("SchoolAuthData");
    setUser(null);
    setTokens(null);
    window.location.href = "/"; // optional redirect
  };

  return (
    <UserContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
