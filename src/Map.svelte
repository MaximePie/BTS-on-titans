<script>
  import {battles} from "./battles.js";
  export let currentStep = 1;
  export let onBattlePick;

  let availableBattles = battles.filter(battle => battle.step === currentStep);

</script>

<div>
  MAP !
  {availableBattles[0].reward};
  {#each availableBattles as battle, index}
    <span on:click={() => onBattlePick(battle)}>Map {index}</span>
  {/each}
</div>

<style>

</style>
