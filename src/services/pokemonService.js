import api from "./api";

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

// Novo: pegar cadeia evolutiva a partir da URL (recomendado pela PokeAPI)
export const getEvolutionChainFromUrl = async (url) => {
  const response = await api.get(url);
  const chain = [];

  const extractChain = (node) => {
    const name = node.species.name;
    const url = node.species.url;
    const id = url.split("/").filter(Boolean).pop();

    chain.push({
      name,
      id,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });

    if (node.evolves_to.length > 0) {
      extractChain(node.evolves_to[0]);
    }
  };

  extractChain(response.data.chain);
  return chain;
};

// Novo: buscar fraquezas de todos os tipos
export const getTypeWeaknesses = async (types = []) => {
  const weaknessesSet = new Set();

  await Promise.all(
    types.map(async (type) => {
      try {
        const response = await api.get(`/type/${type}`);
        const doubleDamageFrom = response.data.damage_relations.double_damage_from;
        doubleDamageFrom.forEach((weak) => weaknessesSet.add(weak.name));
      } catch (error) {
        console.error(`Erro ao buscar fraquezas do tipo ${type}:`, error);
      }
    })
  );

  return Array.from(weaknessesSet);
};
