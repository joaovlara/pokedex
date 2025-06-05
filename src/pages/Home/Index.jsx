import React, { useEffect, useState } from "react";
import { Container, MainContent, SearchInput, Dropdown, GridContainer, LoadMoreButton, FilterBar, FavoritesButton } from "./styles.home";
import MiniCard from "@/components/MiniCard/Index";
import { getKantoPokedex } from "@/services/pokedexService";
import { getPokemonByNameOrId } from "@/services/pokemonService";

const BATCH_SIZE = 20;

const Layout = () => {
  const [pokedex, setPokedex] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    const fetchPokedexNames = async () => {
      try {
        const response = await getKantoPokedex();
        const names = response.map((entry) => entry.pokemon_species.name);
        setPokedex(names);
      } catch (error) {
        console.error("Erro ao carregar pokédex:", error);
      }
    };

    fetchPokedexNames();
  }, []);

  useEffect(() => {
    if (pokedex.length > 0) {
      fetchNextBatch();
    }
  }, [pokedex]);

  const fetchNextBatch = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const nextBatch = pokedex.slice(currentIndex, currentIndex + BATCH_SIZE);

    try {
      const newPokemons = await Promise.all(
        nextBatch.map(async (name) => {
          const data = await getPokemonByNameOrId(name);
          return {
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default,
            types: data.types.map((t) => t.type.name),
          };
        })
      );

      setPokemonsData((prev) => [...prev, ...newPokemons]);
      setCurrentIndex((prev) => prev + BATCH_SIZE);
    } catch (error) {
      console.error("Erro ao carregar dados dos pokémons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (pokemonId) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(pokemonId)) {
        updated.delete(pokemonId);
      } else {
        updated.add(pokemonId);
      }
      localStorage.setItem("favorites", JSON.stringify([...updated]));
      return updated;
    });
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResult(null);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getPokemonByNameOrId(searchTerm.toLowerCase());
      const pokemon = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
      };
      setSearchResult(pokemon);
    } catch (error) {
      setSearchResult(null);
      console.error("Pokémon não encontrado", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const pokemonTypes = [
    "",
    "normal", "fire", "water", "grass", "electric",
    "ice", "fighting", "poison", "ground", "flying",
    "psychic", "bug", "rock", "ghost", "dragon",
    "dark", "steel", "fairy"
  ];

  const applyFilters = (pokemons) => {
    let filtered = [...pokemons];

    if (typeFilter) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.includes(typeFilter)
      );
    }

    if (showOnlyFavorites) {
      filtered = filtered.filter((pokemon) => favorites.has(pokemon.id));
    }

    return filtered;
  };

  const displayPokemons = applyFilters(searchResult ? [searchResult] : pokemonsData);

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
          <Dropdown
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>
                {type ? type.charAt(0).toUpperCase() + type.slice(1) : "Tipo"}
              </option>
            ))}
          </Dropdown>

          <FavoritesButton
            onClick={() => setShowOnlyFavorites((prev) => !prev)}
            active={showOnlyFavorites}
          >
            {showOnlyFavorites ? "Favoritos ativos" : "Favoritos"}
          </FavoritesButton>
        </FilterBar>
        <GridContainer>
          {displayPokemons.map((pokemon) => (
            <MiniCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemon.sprite}
              types={pokemon.types}
              isFavorite={favorites.has(pokemon.id)}
              onToggleFavorite={() => toggleFavorite(pokemon.id)}
            />
          ))}
        </GridContainer>
        {!searchResult && currentIndex < pokedex.length && !showOnlyFavorites && (
          <LoadMoreButton onClick={fetchNextBatch} disabled={isLoading}>
            {isLoading ? "Carregando..." : "Carregar mais"}
          </LoadMoreButton>
        )}
      </MainContent>
    </Container>
  );
};

export default Layout;