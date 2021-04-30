<script>
  import Player from "./Player.svelte";
  import Ennemy from "./Ennemy.svelte";
  import {onMount} from "svelte";

  export let onBattleEnd;
  export let player = {};
  export let enemies = [];

  let currentTurn = player;
  let selectedTarget = undefined;

  onMount(() => {
    enemies = enemies.map((enemy, index) => {
      return {...enemy, name: enemy.name + " " + (index + 1)};
    })
  });

  $: if (!enemies.length) onBattleEnd();

  /**
   * Goes to the next entity
   */
  function next() {
    const {name: currentName} = currentTurn;
    const {name: playerName} = player;
    const {name: lastEnnemyName} = enemies[enemies.length - 1] || null;
    // Either it's the player's turn
    // If every ennemies have played
    if (currentName === lastEnnemyName) {
      currentTurn = player;
    } else if (currentName === playerName) {
      currentTurn = enemies[0];
    }
    // Either it's ennemy X's turn
    // If the current turn is not equal to the last ennemy in the array
    else if (currentName !== lastEnnemyName) {
      // Trouver l'index du currentTurn
      let indexOfCurrentTurnEnnemy = undefined;
      enemies.map((enemy, index) => {
        if (enemy.name === currentName) {
          indexOfCurrentTurnEnnemy = index
        }
      });

      // passer au suivant
      currentTurn = enemies[indexOfCurrentTurnEnnemy + 1];
    }
  }

</script>

<style>
  .Battlefield {
    display: grid;
    grid-template-columns: 400px 400px;
  }

  @media screen and (max-width: 768px) {
    .Battlefield {
      display: flex;
      flex-direction: column;
    }
  }
</style>

<div>
  <div class="Battlefield">
    <Player
      shouldPlay={currentTurn.name === player.name}
      bind:player={player}
      bind:enemies={enemies}
      bind:selectedTarget={selectedTarget}
      {next}
    />
    {#each enemies as enemy, index}
      <Ennemy
        {index}
        shouldPlay={currentTurn.name === enemy.name}
        bind:enemy={enemy}
        bind:player={player}
        bind:selectedTarget={selectedTarget}
        {next}
      />
    {/each}
  </div>
</div>
