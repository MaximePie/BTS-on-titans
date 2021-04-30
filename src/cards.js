export const attacks = {
  BASIC_ATTACK: {
    id: 1,
    damage: 0,
    name: "Attaque",
  },

  ICE_TEA_ATTACK: {
    id: 10,
    damage: 4,
    name: "Ice tea and a game of ping pong",
  },

  LOVE_MYSELF_ATTACK: {
    id: 11,
    damage: 10,
    name: "I love myself",
  },

  DYNAMITE: {
    id: 12,
    damage: 20,
    name: "Light it up like Dynamite",
  }
};

export const skills = {
  BASIC_DEFENSE: {
    id: 2,
    defense: 6,
    name: "Defense",
  },
  POGOSHIPDA: {
    id: 20,
    defense: 10,
    name: "보고 싶다 (Bogo Shipda)"
  },

  DID_YOU_SEE_MY_BAG: {
    id: 21,
    defense: 8,
    name: "Did you see my bag ?",
  }
};

const {
  BASIC_ATTACK,
  ICE_TEA_ATTACK,
  DYNAMITE,
  LOVE_MYSELF_ATTACK
} = attacks;
const {
  BASIC_DEFENSE,
  DID_YOU_SEE_MY_BAG,
  POGOSHIPDA,
} = skills;

export const rewards = [
  {},
  {
    step: 1,
    cards: [
      DYNAMITE,
      LOVE_MYSELF_ATTACK,
      DID_YOU_SEE_MY_BAG,
      POGOSHIPDA,
    ]
  }
]

export const basicDeck = [
  BASIC_ATTACK,
  BASIC_ATTACK,
  BASIC_ATTACK,
  ICE_TEA_ATTACK,
  BASIC_DEFENSE,
  BASIC_DEFENSE,
  BASIC_DEFENSE,
];

