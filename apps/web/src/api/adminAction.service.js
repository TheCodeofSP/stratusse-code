import api from "./api";

export const adminActionService = {
  async getAll() {
    const response = await api.get("/admin/actions");

    return response.data;
  },

  async getByUser(userId) {
    const response = await api.get(`/admin/users/${userId}/actions`);

    return response.data;
  },
};