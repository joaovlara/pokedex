import React from "react";
import { TYPE_DATA } from "@/data/data";
import {
  Card,
  InfoSection,
  Number,
  Name,
  Types,
  TypeBadge,
  ImageSection,
  Sprite,
  FavoriteIcon,
} from "./styles.miniCard";

const MiniCard = ({ id, name, sprite, types, isFavorite, onToggleFavorite, onClick }) => {
  return (
    <Card onClick={onClick}>
      <InfoSection>
        <Number>Nº{String(id).padStart(3, "0")}</Number>
        <Name>{name}</Name>
        <Types>
          {types.map((type) => {
            const { label, icon, color } = TYPE_DATA[type] || {};
            return (
              <TypeBadge key={type} type={type} style={{ backgroundColor: color }}>
                {icon && <img src={icon} alt={label} style={{ width: 16, height: 16 }} />}
                {label || type}
              </TypeBadge>
            );
          })}
        </Types>
      </InfoSection>
      <ImageSection>
        <Sprite src={sprite} alt={name} />
        <FavoriteIcon
          isFavorite={isFavorite}
          onClick={(e) => {
            e.stopPropagation(); // evita disparar o onClick do Card
            onToggleFavorite();
          }}
        >
          {isFavorite ? "★" : "☆"}
        </FavoriteIcon>
      </ImageSection>
    </Card>
  );
};

export default MiniCard;