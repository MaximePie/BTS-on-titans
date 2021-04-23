<script>
  import Battlefield from "./Battlefield.svelte"
  import Map from "./Map.svelte"
  import {player as initialPlayer} from "./entities";

  let player = initialPlayer;
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
    console.log(battle);
  }

</script>

<div>
  <h2>Ready to fight ? Fight !</h2>
  {#if !currentBattle}
    <Map {currentStep} {onBattlePick}/>
  {:else}
    <Battlefield {onBattleEnd}/>
  {/if}
</div>

<style>

</style>
