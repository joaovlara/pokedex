import React, { useEffect, useState } from "react";
import {
  Container,
  MainContent,
  SearchInput,
  Dropdown,
  GridContainer,
  LoadMoreButton,
} from "./styles.home";
import MiniCard from "@/components/MiniCard/Index";
import { getKantoPokedex } from "@/services/pokedexService";
import { getPokemonByNameOrId } from "@/services/pokemonService";

const BATCH_SIZE = 20;

const Layout = () => {
  const [pokedex, setPokedex] = useState([]); // nomes dos pokemons
  const [pokemonsData, setPokemonsData] = useState([]); // dados dos pokemons
  const [currentIndex, setCurrentIndex] = useState(0); // controle de offset
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // estado da busca
  const [searchResult, setSearchResult] = useState(null); // resultado da busca
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Montagem: busca nomes da Pokédex
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

  // busca os primeiros 20
  useEffect(() => {
    if (pokedex.length > 0) {
      fetchNextBatch();
    }
  }, [pokedex]);

  // carregar o próximo lote de pokémons
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

  // Função para buscar o Pokémon quando o usuário pressionar Enter
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

  // Handler para o evento keyDown no input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Decide qual lista mostrar: resultado da busca ou lista paginada
  const displayPokemons = searchResult ? [searchResult] : pokemonsData;

  return (
    <Container>
      <MainContent>
        <SearchInput
          placeholder="Buscar pokémon por nome ou ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Dropdown>
          <option value="">Tipo</option>
        </Dropdown>

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

        {!searchResult && currentIndex < pokedex.length && (
          <LoadMoreButton onClick={fetchNextBatch} disabled={isLoading}>
            {isLoading ? "Carregando..." : "Carregar mais"}
          </LoadMoreButton>
        )}
      </MainContent>
    </Container>
  );
};


export default Layout;
