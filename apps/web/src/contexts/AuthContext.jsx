import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "../api/auth.service.js";
import { authStorage } from "../utils/authStorage.utils.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = authStorage.getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await authService.me();

        setUser(data.user || data);
        setIsAuthenticated(true);

      } catch {
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const authenticateWithToken = (token, userData) => {
    authStorage.setToken(token);

    setUser(userData);
    setIsAuthenticated(true);
  };

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    authStorage.setToken(data.token);

    const me = await authService.me();

    setUser(me.user || me);
    setIsAuthenticated(true);

    return data;
  };

  const register = async (payload) => {
    return authService.register(payload);
  };

  const logout = () => {
    authService.logout();

    setUser(null);
    setIsAuthenticated(false);
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
        authenticateWithToken,
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
