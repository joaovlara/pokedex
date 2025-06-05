import React, { useEffect, useState, useCallback, useMemo } from "react";
import { POKEMON_TYPES } from "@/data/data";
import {
  Container,
  MainContent,
  SearchInput,
  Dropdown,
  GridContainer,
  LoadMoreButton,
  FilterBar,
  FavoritesButton,
} from "./styles.home";
import MiniCard from "@/components/MiniCard/Index";
import Modal from "@/components/Modal/Index";
import PokemonDetail from "@/components/PokemonDetail/Index";
import { getKantoPokedex } from "@/services/pokedexService";
import { getPokemonByNameOrId } from "@/services/pokemonService";

const BATCH_SIZE = 20;

// Função para transformar os dados do Pokémon no formato necessário
const formatPokemonData = (data) => ({
  id: data.id,
  name: data.name,
  sprite: data.sprites.front_default,
  types: data.types.map((t) => t.type.name),
});

const fetchPokemonsBatch = async (namesBatch) => {
  const pokemons = await Promise.all(
    namesBatch.map(async (name) => {
      const data = await getPokemonByNameOrId(name);
      return formatPokemonData(data);
    })
  );
  return pokemons;
};

const Layout = () => {
  const [pokedex, setPokedex] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Carregar pokedex ao montar
  useEffect(() => {
    const loadPokedex = async () => {
      try {
        const response = await getKantoPokedex();
        const names = response.map((entry) => entry.pokemon_species.name);
        setPokedex(names);
      } catch (error) {
        console.error("Erro ao carregar pokédex:", error);
      }
    };
    loadPokedex();
  }, []);

  // Carregar favoritos do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  // Salvar favoritos no localStorage sempre que mudam
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  // Função para carregar próximo lote de pokémons
  const fetchNextBatch = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextBatch = pokedex.slice(currentIndex, currentIndex + BATCH_SIZE);
      const newPokemons = await fetchPokemonsBatch(nextBatch);
      setPokemonsData((prev) => [...prev, ...newPokemons]);
      setCurrentIndex((prev) => prev + BATCH_SIZE);
    } catch (error) {
      console.error("Erro ao carregar dados dos pokémons:", error);
    } finally {
      setLoading(false);
    }
  }, [pokedex, currentIndex, loading]);

  // Carregar primeiro lote quando pokedex estiver disponível
  useEffect(() => {
    if (pokedex.length > 0 && currentIndex === 0) {
      fetchNextBatch();
    }
  }, [pokedex, currentIndex, fetchNextBatch]);

  // Buscar Pokémon pelo termo digitado
  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      setSearchResult(null);
      return;
    }
    setLoading(true);
    try {
      const data = await getPokemonByNameOrId(searchTerm.toLowerCase());
      setSearchResult(formatPokemonData(data));
    } catch {
      setSearchResult(null);
      console.error("Pokémon não encontrado");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  // Alternar favorito
  const toggleFavorite = useCallback(
    (pokemonId) => {
      setFavorites((prev) => {
        const updated = new Set(prev);
        if (updated.has(pokemonId)) updated.delete(pokemonId);
        else updated.add(pokemonId);
        return updated;
      });
    },
    []
  );

  // Aplicar filtros
  const filteredPokemons = useMemo(() => {
    const baseList = searchResult ? [searchResult] : pokemonsData;
    return baseList.filter((pokemon) => {
      const matchesType = typeFilter ? pokemon.types.includes(typeFilter) : true;
      const matchesFavorite = showOnlyFavorites ? favorites.has(pokemon.id) : true;
      return matchesType && matchesFavorite;
    });
  }, [searchResult, pokemonsData, typeFilter, showOnlyFavorites, favorites]);

  const abrirModal = async (pokemon) => {
    try {
      const fullData = await getPokemonByNameOrId(pokemon.name); // ou pokemon.id
      setSelectedPokemon(fullData);
      setModalOpen(true);
    } catch (error) {
      console.error("Erro ao carregar detalhes do pokémon:", error);
    }
  };

  const fecharModal = () => {
    setSelectedPokemon(null);
    setModalOpen(false);
  };

  return (
    <Container>
      <MainContent>
        <SearchInput
          placeholder="Buscar pokémon por nome ou ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FilterBar>
          <Dropdown value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            {POKEMON_TYPES.map((type) => (
              <option key={type} value={type}>
                {type ? type.charAt(0).toUpperCase() + type.slice(1) : "Type"}
              </option>
            ))}
          </Dropdown>

          <FavoritesButton onClick={() => setShowOnlyFavorites((prev) => !prev)} active={showOnlyFavorites}>
            {showOnlyFavorites ? "My Favorites" : "Favorites"}
          </FavoritesButton>
        </FilterBar>

        <GridContainer>
          {filteredPokemons.map((pokemon) => (
            <MiniCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemon.sprite}
              types={pokemon.types}
              isFavorite={favorites.has(pokemon.id)}
              onToggleFavorite={() => toggleFavorite(pokemon.id)}
              onClick={() => abrirModal(pokemon)}  // <- aqui
            />
          ))}
        </GridContainer>
        {isModalOpen && selectedPokemon && (
          <Modal isOpen={isModalOpen} onClose={fecharModal}>
            <PokemonDetail pokemon={selectedPokemon} />
          </Modal>
        )}
        {!searchResult && currentIndex < pokedex.length && !showOnlyFavorites && (
          <LoadMoreButton onClick={fetchNextBatch} disabled={loading}>
            {loading ? "..." : "More"}
          </LoadMoreButton>
        )}
      </MainContent>
    </Container>
  );
};

export default Layout;
