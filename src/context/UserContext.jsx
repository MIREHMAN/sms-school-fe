import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);

  const loadUserFromStorage = () => {
    const saved = localStorage.getItem("SchoolAuthData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.user) {
          setUser({
            ...parsed.user,
            role: parsed.user.role.toLowerCase(), // normalize role
          });
          setTokens(parsed.tokens || null);
          return;
        }
      } catch (err) {
        console.error("Failed to parse SchoolAuthData:", err);
      }
    }
    setUser(null);
    setTokens(null);
  };

  useEffect(() => {
    loadUserFromStorage();

    // Handle manual localStorage clearing (multi-tab or devtools)
    const handleStorageChange = () => {
      loadUserFromStorage();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (responseData) => {
    if (!responseData?.user || !responseData?.tokens) return;

    localStorage.setItem("SchoolAuthData", JSON.stringify(responseData));
    setUser({
      ...responseData.user,
      role: responseData.user.role.toLowerCase(),
    });
    setTokens(responseData.tokens);
  };

  const logout = () => {
    localStorage.removeItem("SchoolAuthData");
    setUser(null);
    setTokens(null);
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
