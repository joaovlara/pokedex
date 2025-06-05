import api from './api';

export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getPokemonByNameOrId = async (nameOrId) => {
  const response = await api.get(`/pokemon/${nameOrId}`);
  return response.data;
};

export const getPokemonByName = async (name) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};

export const getPokemonSpecies = async (id) => {
  const response = await api.get(`/pokemon-species/${id}`);
  return response.data;
};

export const getEvolutionChain = async (id) => {
  const response = await api.get(`/evolution-chain/${id}`);
  return response.data;
};
