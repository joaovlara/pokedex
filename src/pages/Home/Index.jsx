import React, { useEffect, useState } from "react";
import {
  Container,
  MainContent,
  SearchInput,
  Dropdown,
  GridContainer,
} from "./styles.home";
import MiniCard from "@/components/MiniCard/Index";
import { getKantoPokedex } from "@/services/pokedexService";
import { getPokemonByName } from "@/services/pokemonService";
import { saveToLocalStorage, loadFromLocalStorage } from "@/utils/localStorage";

const Layout = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //carrega nomes do localStorage ou API
        let names = loadFromLocalStorage("kanto_pokedex");
        if (!names) {
          const entries = await getKantoPokedex();
          names = entries.map((entry) => entry.pokemon_species.name);
          saveToLocalStorage("kanto_pokedex", names);
        }

        const first20 = names.slice(0, 20);

        //busca detalhes de cada Pokémon
        const pokemonDetails = await Promise.all(
          first20.map(async (name) => {
            const data = await getPokemonByName(name);
            return {
              id: data.id,
              name: data.name,
              sprite: data.sprites.front_default,
              types: data.types.map((t) => t.type.name),
            };
          })
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Erro ao carregar pokémons:", error);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (index) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };

  return (
    <Container>
      <MainContent>
        <SearchInput placeholder="Buscar pokemon" />
        <Dropdown>
          <option value="">Tipo</option>
        </Dropdown>
        <GridContainer>
          {pokemonList.map((pokemon, index) => (
            <MiniCard
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemon.sprite}
              types={pokemon.types}
              isFavorite={favorites.has(index)}
              onToggleFavorite={() => toggleFavorite(index)}
            />
          ))}
        </GridContainer>
      </MainContent>
    </Container>
  );
};

export default Layout;