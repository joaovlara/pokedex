import React from "react";
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

import Bug from "@/assets/img/typeIcon/Bug_icon_SwSh.png";
import Dark from "@/assets/img/typeIcon/Dark_icon_SwSh.png";
import Dragon from "@/assets/img/typeIcon/Dragon_icon_SwSh.png";
import Electric from "@/assets/img/typeIcon/Electric_icon_SwSh.png";
import Fairy from "@/assets/img/typeIcon/Fairy_icon_SwSh.png";
import Fighting from "@/assets/img/typeIcon/Fighting_icon_SwSh.png";
import Fire from "@/assets/img/typeIcon/Fire_icon_SwSh.png";
import Flying from "@/assets/img/typeIcon/Flying_icon_SwSh.png";
import Ghost from "@/assets/img/typeIcon/Ghost_icon_SwSh.png";
import Grass from "@/assets/img/typeIcon/Grass_icon_SwSh.png";
import Ground from "@/assets/img/typeIcon/Ground_icon_SwSh.png";
import Ice from "@/assets/img/typeIcon/Ice_icon_SwSh.png";
import Normal from "@/assets/img/typeIcon/Normal_icon_SwSh.png";
import Poison from "@/assets/img/typeIcon/Poison_icon_SwSh.png";
import Psychic from "@/assets/img/typeIcon/Psychic_icon_SwSh.png";
import Rock from "@/assets/img/typeIcon/Rock_icon_SwSh.png";
import Steel from "@/assets/img/typeIcon/Steel_icon_SwSh.png";
import Water from "@/assets/img/typeIcon/Water_icon_SwSh.png";

const typeIcons = {
    bug: Bug,
    dark: Dark,
    dragon: Dragon,
    electric: Electric,
    fairy: Fairy,
    fighting: Fighting,
    fire: Fire,
    flying: Flying,
    ghost: Ghost,
    grass: Grass,
    ground: Ground,
    ice: Ice,
    normal: Normal,
    poison: Poison,
    psychic: Psychic,
    rock: Rock,
    steel: Steel,
    water: Water,
};


const MiniCard = ({ id, name, sprite, types, isFavorite, onToggleFavorite }) => {
    return (
        <Card>
            <InfoSection>
                <Number>Nº{String(id).padStart(3, "0")}</Number>
                <Name>{name}</Name>
                <Types>
                    {types.map((type) => (
                        <TypeBadge key={type} type={type}>
                            <img
                                src={typeIcons[type]}
                                alt={type}
                                style={{ width: 16, height: 16 }}
                            />
                            {type}
                        </TypeBadge>
                    ))}
                </Types>
            </InfoSection>
            <ImageSection>
                <Sprite src={sprite} alt={name} />
                <FavoriteIcon isFavorite={isFavorite} onClick={onToggleFavorite}>
                    {isFavorite ? "★" : "☆"}
                </FavoriteIcon>
            </ImageSection>
        </Card>
    );
};

export default MiniCard;