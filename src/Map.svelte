<script>
  import {battles} from "./battles.js";
  export let currentStep = 1;
  export let onBattlePick;

  let availableBattles = battles.filter(battle => battle.step === currentStep);

</script>

<div class="Map">
  <h3>Choisissez un chemin !</h3>
  <div class="Map__step">
    {#each availableBattles as battle, index}
      <span class="Map__battle" on:click={() => onBattlePick(battle)}>Bataille {index + 1}</span>
    {/each}
  </div>
</div>

<style>
  .Map {
    width: 500px;
    height: 500px;
    border: solid;
    padding: 1rem;
    margin: auto;
  }

  .Map__step {
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .Map__battle {
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px gray;
    border-radius: 4px;
    height: 100px;
    margin: 1rem;

    cursor: pointer;
    transition: transform 100ms ease;
  }


  .Map__battle:hover {
    transition: transform 100ms ease;
    transform: translateY(-10px);
  }
</style>
