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

  async resendVerificationEmail(email, captchaToken) {
    const response = await api.post("/auth/resend-verification-email", {
      email,
      captchaToken,
    });

    return response.data;
  },

  async forgotPassword(data) {
    const response = await api.post("/auth/forgot-password", {
      email: data.email,
      pseudo: data.pseudo,
      captchaToken: data.captchaToken,
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
    const response = await api.get("/auth/me", {
      skipAuthRedirect: true,
    });

    return response.data;
  },

  async logout() {
    const response = await api.post("/auth/logout");

    return response.data;
  },
};
