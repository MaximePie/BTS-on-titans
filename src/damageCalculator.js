import {attacks, skills} from "./cards";

/**
 * Calculates the damage output based on entities and actions
 */
export function applyDamages(action, attacker, target) {
  const updatedTarget = target;
  let damage = action === attacks.BASIC_ATTACK ? attacker.attack : 0;

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
