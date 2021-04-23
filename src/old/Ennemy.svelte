<script>
  import {calculateFinalHp,} from "../damageCalculator.js";
  import {attacks, skills} from "../cards";
  const {BASIC_ATTACK} = attacks;
  const {BASIC_DEFENSE} = skills;

  export let ennemy;
  export let index;
  export let player;
  export let shouldPlay;
  export let endTurn;
  export let selectedEnemyIndex;

  const PLAYER = 0;
  const ENNEMY = 1;

  $: if (shouldPlay) attack();

  /**
   * The ennemy attacks the player
   * @param action The action linked to the attack
   */
  function attack(action = BASIC_ATTACK) {
    if (player.hp > 0) {
      const hp = calculateFinalHp(action, ennemy, player);
      player = {...player, hp};
      endTurn(player);
    }
  }

  function onSelect() {
    selectedEnemyIndex = index;
  }

</script>

<div
  class="Ennemy"
  class:Ennemy--dead={ennemy.hp < 10}
  on:click={onSelect}
>
  <div>
    <h4>{ennemy.name}</h4>
    <img class="Ennemy__image" src={ennemy.image} alt="Titan"/>
  </div>
  <p>PV : {ennemy.hp}</p>
  {#if ennemy.hp === 0}
    <p class="Ennemy__death-text">L'ennemi a été vaincu !</p>
  {/if}
</div>

<style>

  h4 {
    text-align: center;
  }

  .Ennemy {
    border: solid 1px gray;
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
</style>
