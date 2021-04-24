import {basicDeck} from "./cards";

export const TITAN = 0;

export const enemies = [
  {
    name: "titan basique",
    hp: 20,
    image: 'images/titan.jpg',
    attack: 30,
  },
  {
    name: "titan colossal",
    hp: 30,
    image: 'images/titan2.jpg',
    attack: 4,
  }
];

export const player = {
  name: "Jiwups",
  hp: 60,
  mana: 3,
  defense: 0,
  attack: 15,
  image: 'images/jhope.jfif',
  isSelecting: false,
  deck: basicDeck,
};
