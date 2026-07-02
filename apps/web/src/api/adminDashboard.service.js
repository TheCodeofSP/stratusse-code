import api from "./api";

export const adminDashboardService = {
  async getStats() {
    const response = await api.get("/admin/dashboard");

    return response.data;
  },
};