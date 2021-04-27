<script>
  import Map from "./Map.svelte"
  import Battle from "./Battle.svelte"
  import Rewards from "./Rewards.svelte"
  import {
    player as initialPlayer,
  } from "./entities.js";

  let player = initialPlayer;
  let enemies = [];
  let currentBattle = undefined;
  let currentStep = 1;
  let isRewardsScreenDisplayed = false;


  /**
   * Triggered when the battle is over
   */
  function onBattleEnd() {
    currentBattle = undefined;
    isRewardsScreenDisplayed = true;
  }

  /**
   * Triggered when the user picks a rewards after a battle
   */
  function onRewardChoosen() {
    currentStep++;
    isRewardsScreenDisplayed = false;
  }

  /**
   * Updates the currentBattle
   * Triggered by the Map component
   * @param battle
   */
  function onBattlePick(battle) {
    currentBattle = battle;
    enemies = battle.enemies;
  }

</script>

<div>
  {#if isRewardsScreenDisplayed}
    <Rewards {currentStep} {onRewardChoosen}/>
  {:else if !currentBattle }
    <Map {currentStep} {onBattlePick}/>
  {:else}
    <Battle bind:player={player} {onBattleEnd} enemies={enemies}/>
  {/if}

</div>

<style>

</style>
