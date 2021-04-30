<script>
  import Map from "./Map.svelte"
  import Battle from "./Battle.svelte"
  import Rewards from "./Rewards.svelte"
  import PlayerPick from "./PlayerPick.svelte"

  import {players} from "./entities";
  import {battles} from "./battles";

  let player = undefined;
  let currentBattle = undefined;
  let enemies = [];

  // Testing config
  // let currentBattle = battles[0];
  // let player = players.sort(() => Math.random() - 0.5)[0];
  // let enemies = battles[0].enemies;

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
  function onRewardChoosen(card) {
    player = {
      ...player,
      deck: [...player.deck, card],
    }
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
  {#if !player}
    <PlayerPick bind:player={player}/>
  {:else if isRewardsScreenDisplayed}
    <Rewards {currentStep} {onRewardChoosen} bind:player={player}/>
  {:else if !currentBattle }
    <Map {currentStep} {onBattlePick}/>
  {:else}
    <Battle bind:player={player} {onBattleEnd} enemies={enemies}/>
  {/if}

</div>

<style>

</style>
