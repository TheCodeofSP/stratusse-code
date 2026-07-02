import api from "./api";

export const commentService = {
  async getByNote(noteId) {
    const response = await api.get(`/notes/${noteId}/comments`);

    return response.data;
  },

  async create(noteId, payload) {
    const response = await api.post(`/notes/${noteId}/comments`, payload);

    return response.data;
  },

  async remove(commentId) {
    const response = await api.delete(`/comments/${commentId}`);

    return response.data;
  },

  async like(commentId) {
    const response = await api.post(`/comments/${commentId}/like`);

    return response.data;
  },

  async unlike(commentId) {
    const response = await api.delete(`/comments/${commentId}/like`);

    return response.data;
  },
};
