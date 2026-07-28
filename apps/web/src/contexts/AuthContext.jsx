import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "../api/auth.service.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await authService.me();

        setUser(data.user || data);
        setIsAuthenticated(true);

      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const authenticateWithSession = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    setUser(data.user);
    setIsAuthenticated(true);

    return data;
  };

  const register = async (payload) => {
    return authService.register(payload);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        authenticateWithSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider.");
  }

  return context;
}
