import api from "./api";

export const libraryCommentService = {
  async getByBook(bookId) {
    const response = await api.get(`/library/${bookId}/comments`);
    return response.data;
  },

  async create(bookId, payload) {
    const response = await api.post(`/library/${bookId}/comments`, payload);
    return response.data;
  },

  async remove(commentId) {
    const response = await api.delete(`/library-comments/${commentId}`);
    return response.data;
  },

  async like(commentId) {
    const response = await api.post(`/library-comments/${commentId}/like`);
    return response.data;
  },

  async unlike(commentId) {
    const response = await api.delete(`/library-comments/${commentId}/like`);
    return response.data;
  },
};