import api from "./api";

export const adminUserService = {
  async getAll() {
    const response = await api.get("/admin/users");

    return response.data;
  },

  async getById(userId) {
    const response = await api.get(`/admin/users/${userId}`);

    return response.data;
  },

  async getActivitySummary(userId) {
    const response = await api.get(`/admin/users/${userId}/activity-summary`);

    return response.data;
  },

  async getNotes(userId) {
    const response = await api.get(`/admin/users/${userId}/notes`);

    return response.data;
  },

  async getLibrary(userId) {
    const response = await api.get(`/admin/users/${userId}/library`);

    return response.data;
  },

  async getComments(userId) {
    const response = await api.get(`/admin/users/${userId}/comments`);

    return response.data;
  },

  async getLibraryComments(userId) {
    const response = await api.get(`/admin/users/${userId}/library-comments`);

    return response.data;
  },

  async updateRole(userId, role, comment = "") {
    const response = await api.patch(`/admin/users/${userId}/role`, {
      role,
      comment,
    });

    return response.data;
  },
};
