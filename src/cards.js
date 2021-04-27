export const attacks = {
  BASIC_ATTACK: {
    id: 1,
    damage: 0,
    name: "Attaque",
  },

  ICE_TEA_ATTACK: {
    id: 10,
    damage: 4,
    name: "Ice tea and a game of ping pong"
  },
};

export const skills = {
  BASIC_DEFENSE: {
    id: 2,
    defense: 6,
    name: "Defense",
  },
};

const {BASIC_ATTACK, ICE_TEA_ATTACK} = attacks;
const {BASIC_DEFENSE} = skills;

export const basicDeck = [
  BASIC_ATTACK,
  BASIC_ATTACK,
  BASIC_ATTACK,
  ICE_TEA_ATTACK,
  BASIC_DEFENSE,
  BASIC_DEFENSE,
  BASIC_DEFENSE,
]
