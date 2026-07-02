import api from "./api";

export const creatorRequestService = {
  async getMine() {
    const response = await api.get("/creator-requests/me");
    return response.data;
  },

  async create(payload) {
    const response = await api.post("/creator-requests", payload);
    return response.data;
  },


};
