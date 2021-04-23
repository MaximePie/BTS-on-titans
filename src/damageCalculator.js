import {attacks, skills} from "./cards";

/**
 * Calculates the damage output based on entities and actions
 */
export function calculate(action, attacker, target) {
  const {hp} = target;
  let damage = action === attacks.BASIC_ATTACK ? attacker.attack : 0;
  damage -= target.defense || 0;
  damage = damage < 0 ? 0 : damage;
  return (hp - damage) < 0 ? 0 : hp - damage;
}
