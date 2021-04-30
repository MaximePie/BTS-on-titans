import {basicDeck} from "./cards";

export const TITAN = 0;

export const enemies = [
  {
    name: "titan basique",
    hp: 20,
    image: 'images/titan.jpg',
    attack: 6,
  },
  {
    name: "titan colossal",
    hp: 30,
    image: 'images/titan2.jpg',
    attack: 4,
  }
];

const basePlayer = {
  hp: 60,
  mana: 3,
  defense: 0,
  attack: 5,
  isSelecting: false,
  deck: basicDeck,
};

const JHOPE = {
  ...basePlayer,
  name: "Jiwups",
  image: 'images/jhope.jfif',
  description: "Toujours le mot pour rire, il va envoyer des coeurs à tout le monde !",
};


const JIN = {
  ...basePlayer,
  name: "Ging",
  image: 'images/jin.jpg',
  description: "Il peut devenir tout rouge, et a toujours des réactions drôles !",
};

const VI = {
  ...basePlayer,
  name: "Vi-va la vida",
  image: 'images/vi.jpg',
  description: "Fait littéralement buguer le PC quand on essaie d'afficher son portrait tellement il est bow!",
};


const RM = {
  ...basePlayer,
  name: "RM-iste",
  image: 'images/rm.jpg',
  description: "La classe à l'état pur. Mais magnez-vous de jouer, il doit aller chercher ses enfants à l'école !",
};


const SUGA = {
  ...basePlayer,
  name: "Suga, yes please",
  image: 'images/suga.jpg',
  description: "Ne le regardez pas trop dans les yeux sinon il vous arrivera malheur !",
};

const JUNGKOOK = {
  ...basePlayer,
  name: "Jaune cookie",
  image: 'images/jungkook.jpg',
  description: "Hyper attachant, l'essayer, c'est l'adopter !",
};


const JIMIN = {
  ...basePlayer,
  name: "Jiminouche",
  image: 'images/jimin.jpg',
  description: "Laissez-vous tenter par la \"simplicité\". Jamais dans l'excès Jimin, jamais !",
};


export const players = [
  JHOPE,
  JIN,
  VI,
  RM,
  SUGA,
  JUNGKOOK,
  JIMIN
];
