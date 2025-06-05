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

import { theme } from "@/theme/theme";
export const POKEMON_TYPES = [
  "",
  "normal", "fire", "water", "grass", "electric",
  "ice", "fighting", "poison", "ground", "flying",
  "psychic", "bug", "rock", "ghost", "dragon",
  "dark", "steel", "fairy"
];
export const TYPE_DATA = {
  bug: { label: "Inseto", icon: Bug, color: theme.colors.bug },
  dark: { label: "Sombrio", icon: Dark, color: theme.colors.dark },
  dragon: { label: "Dragão", icon: Dragon, color: theme.colors.dragon },
  electric: { label: "Elétrico", icon: Electric, color: theme.colors.electric },
  fairy: { label: "Fada", icon: Fairy, color: theme.colors.fairy },
  fighting: { label: "Lutador", icon: Fighting, color: theme.colors.fighting },
  fire: { label: "Fogo", icon: Fire, color: theme.colors.fire },
  flying: { label: "Voador", icon: Flying, color: theme.colors.flying },
  ghost: { label: "Fantasma", icon: Ghost, color: theme.colors.ghost },
  grass: { label: "Planta", icon: Grass, color: theme.colors.grass },
  ground: { label: "Terrestre", icon: Ground, color: theme.colors.ground },
  ice: { label: "Gelo", icon: Ice, color: theme.colors.ice },
  normal: { label: "Normal", icon: Normal, color: theme.colors.normal },
  poison: { label: "Venenoso", icon: Poison, color: theme.colors.poison },
  psychic: { label: "Psíquico", icon: Psychic, color: theme.colors.psychic },
  rock: { label: "Pedra", icon: Rock, color: theme.colors.rock },
  steel: { label: "Metálico", icon: Steel, color: theme.colors.steel },
  water: { label: "Água", icon: Water, color: theme.colors.water },
};