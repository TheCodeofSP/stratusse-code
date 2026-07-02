import api from "./api";

export const creatorService = {
  async getByPseudo(pseudo) {
    const response = await api.get(`/creators/${pseudo}`);

    return response.data;
  },
};