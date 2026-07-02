import api from "./api";

export const noteService = {
  async getAll() {
    const response = await api.get("/notes");

    return response.data;
  },

  async getBySlug(slug) {
    const response = await api.get(`/notes/${slug}`);

    return response.data;
  },

  async like(noteId) {
    const response = await api.post(`/notes/${noteId}/like`);

    return response.data;
  },

  async unlike(noteId) {
    const response = await api.delete(`/notes/${noteId}/like`);

    return response.data;
  },

  async create(payload) {
    const response = await api.post("/notes", payload);

    return response.data;
  },

  async update(noteId, payload) {
    const response = await api.patch(`/notes/${noteId}`, payload);

    return response.data;
  },

  async getMine() {
    const response = await api.get("/notes/me");

    return response.data;
  },

  async getById(noteId) {
    const response = await api.get(`/notes/id/${noteId}`);

    return response.data;
  },

  async remove(noteId) {
    const response = await api.delete(`/notes/${noteId}`);

    return response.data;
  },

  async publish(noteId) {
    const response = await api.patch(`/notes/${noteId}`, {
      status: "published",
    });

    return response.data;
  },

  async unpublish(noteId) {
    const response = await api.patch(`/notes/${noteId}`, {
      status: "draft",
    });

    return response.data;
  },
};
