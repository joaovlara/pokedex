import React, { useState } from "react";
import Sidebar from "@/components/sideBar/Index";
import {
  Container,
  MainContent,
  SearchInput,
  Dropdown,
  GridContainer,
} from "./styles.home";
import MiniCard from "@/components/MiniCard/Index";

const bulbasaur = {
  id: 1,
  name: "bulbasaur",
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  types: ["grass", "poison"],
};

const Layout = () => {
  const [favorites, setFavorites] = useState(new Set());

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

  // Criar array com 20 Bulbasaurs
  const bulbasaur20x = Array(20).fill(bulbasaur);

  return (
    <Container>
      {/* <Sidebar /> */}
      <MainContent>
        <SearchInput placeholder="Buscar pokemon" />
        <Dropdown>
          <option value="">Tipo</option>
        </Dropdown>
        <GridContainer>
          {bulbasaur20x.map((pokemon, index) => (
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