import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "../api/auth.service.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Charger utilisateur au refresh
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await authService.me();

        setUser(data.user || data);
        setIsAuthenticated(true);

        localStorage.setItem("user", JSON.stringify(data.user || data));
      } catch (error) {
        console.error(error);

        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const authenticateWithToken = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
  };

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    localStorage.setItem("token", data.token);

    const me = await authService.me();

    setUser(me.user || me);
    setIsAuthenticated(true);

    localStorage.setItem("user", JSON.stringify(me.user || me));

    return data;
  };

const register = async (payload) => {
  const data = await authService.register(payload);

  return data;
};

  const logout = () => {
    authService.logout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

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
  return useContext(AuthContext);
}
