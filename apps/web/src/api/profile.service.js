import api from "./api";

export const profileService = {
  async getStats() {
    const response = await api.get("/profile/stats");

    return response.data;
  },
  changePassword(payload) {
    return api.patch("/profile/password", payload);
  },
  deleteMyAccount(payload = {}) {
  return api.delete("/profile/me", {
    data: payload,
  });
},
};
