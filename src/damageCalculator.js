import {attacks} from "./cards";

/**
 * Calculates the damage output based on entities and actions
 */
export function applyDamages(action, attacker, target) {
  const updatedTarget = target;
  let damage = action.damage;
  damage += attacker.attack;

  if (updatedTarget.defense && damage > updatedTarget.defense) {
    damage -= updatedTarget.defense;
    updatedTarget.defense = 0;
    updatedTarget.hp -= damage;
  }
  else if (!updatedTarget.defense) {
    updatedTarget.hp -= damage;
  }
  else {
    updatedTarget.defense -= damage;
  }

  if (updatedTarget.hp < 0) {
    updatedTarget.hp = 0;
  }

  return updatedTarget;
}


function baseDamageFromAction(action) {

  switch(action) {
    case attacks.BASIC_ATTACK:
      return 0;
    case attacks.ICE_TEA_ATTACK:
      return 4;
    default:
      return 0;
  }
}
