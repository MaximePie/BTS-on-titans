<script>
  import {applyDamages} from "./damageCalculator";
  import {attacks, skills} from "./cards";
  import {tick} from "svelte";

  const {BASIC_ATTACK} = attacks;
  const {BASIC_DEFENSE} = skills;

  export let shouldPlay = false;
  export let index;
  export let enemy;
  export let player;
  export let selectedTarget = undefined;
  export let next = () => null;

  $: if (shouldPlay) attack();


  /**
   * The ennemy attacks the player
   * @param action The action linked to the attack
   */
  function attack(action = BASIC_ATTACK) {
    const updatedPlayer = applyDamages(action, enemy, player);
    player = {...updatedPlayer};
    tick().then(next);
  }

  /**
   * Selects the current enemy
   */
  function selectEnemy() {
    selectedTarget = index;
  }
</script>

<div
  class="Ennemy"
  class:Ennemy--dead={enemy.hp < 10}
  on:click={selectEnemy}
>
  <!--  on:click={onSelect}-->
  <div>
    <h4>{enemy.name}</h4>
    <img class="Ennemy__image" src={enemy.image} alt="Titan"/>
  </div>
  <p>
    <span>
      ❤ {enemy.hp}
    </span>
    <span>
      🗡️ {enemy.attack}
    </span>
  </p>
  {#if enemy.hp === 0}
    <p class="Ennemy__death-text">L'ennemi a été vaincu !</p>
  {/if}
</div>


<style>

  h4 {
    text-align: center;
  }

  .Ennemy {
    border: solid 1px lightgray;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: transform 100ms ease;
  }

  .Ennemy:hover {
    transition: transform 100ms ease;
    transform: translateY(-20px);
  }

  .Ennemy--dead {
    border: red solid 3px;
  }


  .Ennemy__image {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .Ennemy {
      margin: 1rem 0;
      padding: 0;
    }
  }
</style>
