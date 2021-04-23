import {basicDeck} from "./cards";

export const TITAN = 0;

export const ennemies = [
  {
    name: "titan 1",
    hp: 20,
    image: 'images/titan.jpg',
    attack: 5,
  },
  {
    name: "titan 2",
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
  attack: 6,
  image: 'images/jhope.jfif',
  isSelecting: false,
  deck: basicDeck,
};
