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
  bug: { label: "Bug", icon: Bug, color: theme.colors.bug },
  dark: { label: "Dark", icon: Dark, color: theme.colors.dark },
  dragon: { label: "Dragon", icon: Dragon, color: theme.colors.dragon },
  electric: { label: "Electric", icon: Electric, color: theme.colors.electric },
  fairy: { label: "Fairy", icon: Fairy, color: theme.colors.fairy },
  fighting: { label: "Fighting", icon: Fighting, color: theme.colors.fighting },
  fire: { label: "Fire", icon: Fire, color: theme.colors.fire },
  flying: { label: "Flying", icon: Flying, color: theme.colors.flying },
  ghost: { label: "Ghost", icon: Ghost, color: theme.colors.ghost },
  grass: { label: "Grass", icon: Grass, color: theme.colors.grass },
  ground: { label: "Ground", icon: Ground, color: theme.colors.ground },
  ice: { label: "Ice", icon: Ice, color: theme.colors.ice },
  normal: { label: "Normal", icon: Normal, color: theme.colors.normal },
  poison: { label: "Poison", icon: Poison, color: theme.colors.poison },
  psychic: { label: "Psychic", icon: Psychic, color: theme.colors.psychic },
  rock: { label: "Rock", icon: Rock, color: theme.colors.rock },
  steel: { label: "Steel", icon: Steel, color: theme.colors.steel },
  water: { label: "Water", icon: Water, color: theme.colors.water },
};
