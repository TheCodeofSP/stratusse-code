import api from "./api";

export const adminContentService = {
  async getNotes() {
    const response = await api.get("/admin/content/notes");
    return response.data;
  },

  async getNoteById(noteId) {
    const response = await api.get(`/admin/content/notes/${noteId}`);
    return response.data;
  },

  async deleteNote(noteId) {
    const response = await api.delete(`/admin/content/notes/${noteId}`);
    return response.data;
  },

  async getLibrary() {
    const response = await api.get("/admin/content/library");
    return response.data;
  },

  async getLibraryById(bookId) {
    const response = await api.get(`/admin/content/library/${bookId}`);
    return response.data;
  },

  async deleteLibrary(bookId) {
    const response = await api.delete(`/admin/content/library/${bookId}`);
    return response.data;
  },

  async getComments() {
    const response = await api.get("/admin/content/comments");
    return response.data;
  },

  async deleteComment(commentId) {
    const response = await api.delete(`/admin/content/comments/${commentId}`);
    return response.data;
  },

  async getLibraryComments() {
    const response = await api.get("/admin/content/library-comments");
    return response.data;
  },

  async deleteLibraryComment(commentId) {
    const response = await api.delete(
      `/admin/content/library-comments/${commentId}`,
    );
    return response.data;
  },
};
