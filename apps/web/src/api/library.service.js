import api from "./api";

export const libraryService = {
  async getAll() {
    const response = await api.get("/library");

    return response.data;
  },

  async getPublicById(bookId) {
    const response = await api.get(`/library/${bookId}`);

    return response.data;
  },

  async getById(bookId) {
    const response = await api.get(`/library/id/${bookId}`);

    return response.data;
  },

  async create(payload) {
    const response = await api.post("/library", payload);

    return response.data;
  },

  async update(bookId, payload) {
    const response = await api.patch(`/library/${bookId}`, payload);

    return response.data;
  },

  async getMine() {
    const response = await api.get("/library/me");

    return response.data;
  },

  async remove(bookId) {
    const response = await api.delete(`/library/${bookId}`);

    return response.data;
  },

  async like(bookId) {
    const response = await api.post(`/library/${bookId}/like`);

    return response.data;
  },

  async unlike(bookId) {
    const response = await api.delete(`/library/${bookId}/like`);

    return response.data;
  },
};
