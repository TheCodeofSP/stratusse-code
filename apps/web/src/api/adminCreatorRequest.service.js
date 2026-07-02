import api from "./api";

export const adminCreatorRequestService = {
  async getAll() {
    const response = await api.get("/creator-requests/admin");

    return response.data;
  },

  async getById(requestId) {
    const response = await api.get(`/creator-requests/admin/${requestId}`);

    return response.data;
  },

  async approve(requestId, payload) {
    const response = await api.patch(
      `/creator-requests/${requestId}/approve`,
      payload,
    );

    return response.data;
  },

  async reject(requestId, payload) {
    const response = await api.patch(
      `/creator-requests/${requestId}/reject`,
      payload,
    );

    return response.data;
  },

    async getHistory() {
    const response = await api.get("/creator-requests/admin/history");

    return response.data;
  },
};