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
} from "./styles.pokemonDetail";

const PokemonDetail = ({ pokemon }) => {
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
          <Title>
            {name} <span>#{String(id).padStart(3, "0")}</span>
          </Title>
          <div>
            {types.map((type) => (
              <TypeBadge key={type.type.name} type={type.type.name}>
                {type.type.name}
              </TypeBadge>
            ))}
          </div>
        </div>
      </Header>

      <Section>
        <strong>Altura:</strong> {height / 10} m <br />
        <strong>Peso:</strong> {weight / 10} kg
      </Section>

      <Section>
        <strong>Habilidades:</strong> {abilities.map((a) => a.ability.name).join(", ")}
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
