<script>
  import {players} from "./entities";

  export let player = undefined;

  /**
   * Is called when the users pick a player.
   * @param selectedPlayer
   */
  function selectPlayer(selectedPlayer) {
    player = {...selectedPlayer}
  }
</script>

<div>
  <h2>
    Choisissez votre personnage !
  </h2>
  <p>(Vous ne pouvez en choisir qu'un, hé oui, c'est ballot !)</p>
  <div class="PlayerPick__players">
    {#each players as player}
      <div class="PlayerPick__player-card Card">
        <img src={player.image} alt="" class="Card__image">
        <div class="Card__body">
          <h3>{player.name}</h3>
          <p>{player.description}</p>
          <button on:click={() => selectPlayer(player)}>Sélectionner</button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .PlayerPick__players {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .PlayerPick__player-card {
    border-radius: 8px;
    border: solid 1px lightgray;
    margin: 1rem;
  }

  .Card {
    max-width: 300px;
  }

  .Card__body {
    padding: 1rem;
    text-align: center;
  }

  .Card__image {
    width: 100%;
    border-radius: 4px 4px 0 0;
  }
</style>
