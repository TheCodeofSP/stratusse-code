const AUTH_TOKEN_KEY = "token";

export const authStorage = {
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  setToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  clear() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem("user");
  },
};
