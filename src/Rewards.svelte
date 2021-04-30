<script>
  import {rewards} from "./cards";

  export let onRewardChoosen = () => null;
  export let currentStep = 0;
  const availableCards = rewards[currentStep]?.cards.sort(() => Math.random() - 0.5);
  availableCards.length = 3;

  function pickReward(index) {
    onRewardChoosen(availableCards[index]);
  }
</script>
<div>
  <h1>Vous avez réussi !</h1>
  <h2>Choisissez une carte à ajouter à votre paquet !</h2>
  {#if !availableCards}
    <h2>Félicitations, vous avez terminé le jeu, merci d'avoir joué j'espère que ça vous a plu ! </h2>
  {/if}
  <div class="Rewards">
    {#each availableCards as card, index}
      <div class="Rewards__card" on:click={() => pickReward(index)}>
        <h3>{card.name}</h3>
        {#if card.damage}
          <p>🗡️{card.damage}</p>
        {:else}
          <p> 🛡️ {card.defense}</p>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>

  h1, h2 {
    text-align: center;
  }

  .Rewards {
    margin: auto;
    width: 300px;
  }

  .Rewards__card {
    cursor: pointer;
    border: solid 1px lightgray;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: transform 100ms ease;
  }
</style>
