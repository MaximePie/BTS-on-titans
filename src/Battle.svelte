<script>
  import Player from "./Player.svelte";
  import Ennemy from "./Ennemy.svelte";

  export let onBattleEnd;
  export let player = {};
  export let enemies = [];

  let currentTurn = player;
  let selectedTarget = undefined;

  $: if (!enemies.length) onBattleEnd();

  /**
   * Resets the player's state before beginning the next turn
   */
  function resetPlayer() {
    player = {
      ...player,
      hp: 50,
      mana: 3,
      defense: 0,
    }
  }

  /**
   * Goes to the next entity
   */
  function next() {
    const {name: currentName} = currentTurn;
    const {name: playerName} = player;
    const {name: lastEnnemyName} = enemies[enemies.length - 1];

    // Either it's the player's turn
    // If every ennemies have played
    if (currentName === lastEnnemyName) {
      // resetPlayer();
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
</style>


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
<!--      bind:selectedEnemyIndex={selectedEnnemyIndex}-->
<!--      {endTurn}-->
  {/each}
</div>
