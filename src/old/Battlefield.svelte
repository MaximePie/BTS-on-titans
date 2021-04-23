<script>
  import {
  player as initialPlayer,
  ennemies as initialEnnemies
  } from "../entities.js";
  import Player from "./Player.svelte"
  import Ennemy from "./Ennemy.svelte"

  export let player = {
    ...initialPlayer,
    isSelecting: false,
  };

  let ennemies = initialEnnemies;

  let currentTurn = player;
  let selectedEnnemyIndex = undefined;

/*  function onSelectAction() {
    player = {...player, isSelecting: true};
  }*/

  /**
   * Is called by the Player file when the player does something
   */
  function updateField(updatedPlayer = player, updatedEnnemies = ennemies) {
/*    player = {...updatedPlayer, isSelecting: false};
    ennemies = [...updatedEnnemies];
    selectedEnnemyIndex = undefined;
    if (!ennemies.length) {
      endBattle();
    }*/
  }

/*
  /!**
   * Triggered when the user is Selecting and has clicked on
   * an ennemy target
   * @index The index of the ennemy target
   *!/
  function onSelectTarget(index) {
    if (player.isSelecting) {
      selectedEnnemyIndex = index;
    }
  }*/

  function endTurn(updatedPlayer = player, updatedEnnemies = ennemies) {
    // updateField(updatedPlayer, updatedEnnemies);
    if (ennemies.length) {
      next();
    }
    else {
      endBattle();
    }
  }

  function endBattle() {
    currentTurn = undefined;
  }

  /**
   * Resets the player's state before beginning the next turn
   */
  function resetPlayer() {
    player = {
      ...player,
      mana: 3,
      defense: 0,
    }
  }

  /**
   * Goes to the next entity
   */
  function next() {
    // Either it's the player's turn
    // If every ennemies have played
    if (currentTurn === ennemies[ennemies.length - 1]) {
      currentTurn = player;
      resetPlayer();
    }
    else if (currentTurn.name === player.name) {
      currentTurn = ennemies[0];
    }
    // Either it's ennemy X's turn
    // If the current turn is not equal to the last ennemy in the array
    else if (currentTurn.name !== ennemies[ennemies.length - 1].name) {
      // Trouver l'index du currentTurn
      let indexOfCurrentTurnEnnemy = undefined;
      ennemies.map((ennemy, index) => {
        if (ennemy.name === currentTurn.name) {
          indexOfCurrentTurnEnnemy = index
        }
      });

      // Lui ajouter + 1
      currentTurn = ennemies[indexOfCurrentTurnEnnemy + 1];
    }
  }
</script>

<div class="Battlefield">
  <h3>Selected enemy index : {selectedEnnemyIndex}</h3>
  <h3>L'utilisateur attaque : {player.isSelecting ? "Oui" : "non"}</h3>
  <Player
    bind:ennemies={ennemies}
    bind:player={player}
    bind:selectedEnemyIndex={selectedEnnemyIndex}
    {endTurn}
    {updateField}
    shouldPlay={currentTurn?.name === player.name}
  />
  {#each ennemies as ennemy, index}
    <Ennemy
      {index}
      shouldPlay={currentTurn.name === ennemy.name}
      bind:ennemy={ennemy}
      bind:player={player}
      bind:selectedEnemyIndex={selectedEnnemyIndex}
      {endTurn}
    />
  {/each}
</div>

<style>
  .Battlefield {
    display: grid;
    grid-template-columns: 400px 400px;
  }
</style>
