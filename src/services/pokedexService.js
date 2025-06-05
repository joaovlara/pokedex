import api from './api';

export const getKantoPokedex = async () => {
  const response = await api.get('/pokedex/2'); // Pokedex de Kanto
  return response.data.pokemon_entries;
};
