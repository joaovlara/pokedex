import React from "react";
import {
  Container,
  Header,
  Sprite,
  Title,
  Section,
  StatList,
  StatItem,
  TypeBadge,
  FavoriteButton
} from "./styles.pokemonDetail";

const PokemonDetail = ({ pokemon, isFavorite, onToggleFavorite }) => {
  if (!pokemon) return null;

  const { id, name, height, weight, sprites, types, abilities, stats } = pokemon;

  return (
    <Container>
      <Header>
        <Sprite
          src={sprites?.other?.["official-artwork"]?.front_default}
          alt={name}
        />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Title>
              {name} <span>#{String(id).padStart(3, "0")}</span>
            </Title>

            {/* Botão de favorito ao lado do nome */}
            <FavoriteButton onClick={() => onToggleFavorite(id)}>
              {isFavorite ? "★" : "☆"}
            </FavoriteButton>
          </div>

          <div style={{ marginTop: "0.5rem" }}>
            {types.map((type) => (
              <TypeBadge key={type.type.name} type={type.type.name}>
                {type.type.name}
              </TypeBadge>
            ))}
          </div>
        </div>
      </Header>
      <Section>
        <strong>Height:</strong> {height / 10} m <br />
        <strong>Weight:</strong> {weight / 10} kg
      </Section>

      <Section>
        <strong>Abilities:</strong> {abilities.map((a) => a.ability.name).join(", ")}
      </Section>

      <Section>
        <strong>Status Base:</strong>
        <StatList>
          {stats.map((stat) => (
            <StatItem key={stat.stat.name}>
              <span>{stat.stat.name}</span>
              <span>{stat.base_stat}</span>
            </StatItem>
          ))}
        </StatList>
      </Section>
    </Container>
  );
};

export default PokemonDetail;