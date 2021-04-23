<script>
  import Battlefield from "./old/Battlefield.svelte"
  import Map from "./Map.svelte"
  import Test from "./Test.svelte"
  import Battle from "./Battle.svelte"
  import {
    player as initialPlayer,
    ennemies as initialEnnemies
  } from "./entities.js";

  let player = initialPlayer;
  let enemies = initialEnnemies;
  let currentBattle = undefined;
  let currentStep = 1;


  /**
   * This method updates the player once the battle is over
   */
  function onBattleEnd(updatedPlayer) {
    player = {...updatedPlayer};
    currentBattle = undefined;
  }

  /**
   * Updates the currentBattle
   * Triggered by the Map component
   * @param battle
   */
  function onBattlePick(battle) {
    currentBattle = battle;
  }

</script>

<div>
  <h2>Ready to fight ? Fight !</h2>
  <!--  {#if !currentBattle}
      <Map {currentStep} {onBattlePick}/>
    {:else}-->
<!--  <Battlefield bind:player={player} {onBattleEnd}/>-->
  <Battle bind:player={player} {onBattleEnd} enemies={enemies}/>
  <!--  {/if}-->

</div>

<style>

</style>
