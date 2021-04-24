<script>
  import {attacks, skills} from "./cards.js";
  import {applyDamages} from "./damageCalculator";
  import {tick} from "svelte";

  const {BASIC_ATTACK} = attacks;
  const {BASIC_DEFENSE} = skills;

  export let player = {};
  export let enemies = {};
  export let shouldPlay = false;
  export let next;
  export let selectedTarget = undefined;

  let selectedAction = undefined;

  let deck = [...player.deck.sort(() => Math.random() - 0.5)];
  let cardsList = [];
  let graveyard = [];

  $: if (selectedTarget !== undefined && selectedAction !== undefined) attack();
  $: if (shouldPlay) initializeTurn();

  /*

    afterUpdate(() => {
      if (player.mana === 0) {
        console.log("Conditions vérifiées. On finit le tour.");
        finishTurn();
      }
    })
  */


  function initializeTurn() {
    player = {
      ...player,
      mana: 3,
      defense: 0,
    };

    // On prend le deck
    // On retire les 5 dernières cartes du paquet
    // On les push dans la main du joueur
    const updatedCardsList = [];
    let updatedDeck = [...deck];

    const limit = updatedDeck.length > 5 ? 5 : updatedDeck.length;
    for (let currentCard = 0; currentCard < limit; currentCard++) {
      const newCard = updatedDeck.pop();
      updatedCardsList.push(newCard);
    }

    /**
     * If there are not enough cards in Deck,
     * we shuffle the graveyard and put the cards in the
     * deck
     */

    if (updatedCardsList.length < 5) {
      restoreDeck();
      updatedDeck = [...deck];
      while (updatedCardsList.length < 5) {
        const newCard = updatedDeck.pop();
        updatedCardsList.push(newCard);
      }
    }

    deck = updatedDeck;
    cardsList = updatedCardsList;
  }

  /**
   * Removes every card from the Graveyard and put
   * them into the deck, then shuffles it
   */
  function restoreDeck() {
    deck = [...graveyard.sort(() => Math.random() - 0.5)];
    graveyard = [];
  }

  /**
   * Selects the current action
   * @cardIndex represents the index of the selected card in the Cards List
   */
  function selectAction(cardIndex) {
    selectedAction = cardIndex;
    selectedTarget = undefined;
    player = {
      ...player,
      isSelecting: true,
    };
    if (cardsList[selectedAction].action === BASIC_DEFENSE) {
      defend();
    }
  }

  function finishTurn() {
    graveyard = [...graveyard, ...cardsList];
    cardsList = [];
    next();
    /*    tick().then(() => {
          console.log("Le joueur next");
          next();
        });*/
  }

  /**
   * Adds defense until the next turn
   */
  function defend() {
    const defense = cardsList[selectedAction].action === BASIC_DEFENSE ? 6 : 0;
    player = {...player, defense: player.defense + defense};
    finishAction();
  }


  /**
   * Attacks the Ennemy
   * @param action The action linked to the attack
   */
  function attack(action = BASIC_ATTACK) {
    const enemy = enemies[selectedTarget];
    const {hp} = enemy;

    if (hp > 0) {
      const updatedEnemy = applyDamages(action, player, enemy);
      let updatedEnemies = [...enemies];
      if (hp !== 0) {
        updatedEnemies[selectedTarget] = {...updatedEnemy};
      } else {
        updatedEnemies = updatedEnemies.filter(currentEnemy => currentEnemy.name !== enemy.name)
      }
      enemies = [...updatedEnemies];
      finishAction();
    }
  }

  /**
   * This method is triggered when the users has played something
   */
  function finishAction() {

    // Remove last card played from hand and put it in graveyard
    player = {...player, mana: player.mana - 1};
    graveyard = [...graveyard, cardsList[selectedAction]];
    cardsList = [...cardsList.filter((card, index) => selectedAction !== index)];
    tick().then(() => {
      selectedAction = undefined;
      selectedTarget = undefined;
    })
  }
</script>


<div class="Player">
  <h4>{player.name}</h4>
  <img src={player.image} alt="Jhope"/>
  <p>
      <span>
        ❤ {player.hp}
      </span>
    <span>
        🛡️ {player.defense}
      </span>
    <span>
        💧 {player.mana}
      </span>
    <span>
        🗃️
      {deck.length}
      </span>
    <span>
        ☠️
      {graveyard.length}
      </span>
  </p>
  <div class="Player__actions">
    {#each cardsList as card, index}
      <button
        class="Player__action"
        class:Player__action--isDisabled={player.mana === 0}
        disabled={player.mana === 0}
        on:click={() => selectAction(index)}
      >
        {card.name}
      </button>
    {/each}
  </div>
  <button on:click={finishTurn}>Fin du tour</button>
</div>


<style>
  h4 {
    text-align: center;
  }

  .Player {
    border: solid 1px gray;
    padding: 1rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .Player__action {
    border: none;
    border-radius: 4px;
    background-color: dodgerblue;
    transition: 250ms ease background-color;
    color: white;
    cursor: pointer;
    margin: 0.25rem 0.5rem;
  }

  .Player__action--isDisabled {
    pointer-events: none;
    background-color: #999999;
  }

  .Player__action:hover {
    background-color: #1d75d7;
    transition: 250ms ease background-color;
    color: white;
    cursor: pointer;
  }
</style>
