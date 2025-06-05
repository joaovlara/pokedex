import React, { useEffect, useState } from "react";
import { Container, MainContent, SearchInput, Dropdown, GridContainer, LoadMoreButton } from "./styles.home";
import MiniCard from "@/components/MiniCard/Index";
import { getKantoPokedex } from "@/services/pokedexService";
import { getPokemonByName } from "@/services/pokemonService";

const BATCH_SIZE = 20;

const Layout = () => {
  const [pokedex, setPokedex] = useState([]); // nomes dos pokemons
  const [pokemonsData, setPokemonsData] = useState([]); // dados dos pokemons
  const [currentIndex, setCurrentIndex] = useState(0); // controle de offset
  const [isLoading, setIsLoading] = useState(false);

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
          const data = await getPokemonByName(name);
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
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

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

  return (
    <Container>
      <MainContent>
        <SearchInput placeholder="Buscar pokémon" />
        <Dropdown>
          <option value="">Tipo</option>
        </Dropdown>

        <GridContainer>
          {pokemonsData.map((pokemon) => (
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
        {currentIndex < pokedex.length && (
          <LoadMoreButton onClick={fetchNextBatch} disabled={isLoading}>
            {isLoading ? "Carregando..." : "Carregar mais"}
          </LoadMoreButton>
        )}
      </MainContent>
    </Container>
  );
};

export default Layout;