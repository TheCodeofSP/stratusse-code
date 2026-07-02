import api from "./api";

export const authService = {
  async register(data) {
    const response = await api.post("/auth/register", data);

    return response.data;
  },

  async login(data) {
    const response = await api.post("/auth/login", data);

    return response.data;
  },

  async verifyEmail(token) {
    const response = await api.get(`/auth/verify-email?token=${token}`);

    return response.data;
  },

  async resendVerificationEmail(email) {
    const response = await api.post("/auth/resend-verification-email", {
      email,
    });

    return response.data;
  },

  async forgotPassword(email) {
    const response = await api.post("/auth/forgot-password", {
      email,
    });

    return response.data;
  },

  async resetPassword(token, password) {
    const response = await api.post("/auth/reset-password", {
      token,
      password,
    });

    return response.data;
  },

  async me() {
    const response = await api.get("/auth/me");

    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};