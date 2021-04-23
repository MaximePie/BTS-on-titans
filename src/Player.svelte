<script>
  import {calculate} from "./damageCalculator.js";
  import {basicDeck, attacks, skills} from "./cards.js";
  const {BASIC_ATTACK} = attacks;
  const {BASIC_DEFENSE} = skills;

  const PLAYER = 0;
  const ENNEMY = 1;

  export let selectedEnnemyIndex;
  export let shouldPlay;
  export let onSelectAction;
  export let endTurn;
  export let updateField;
  export let player = {
    hp: 0,
    image: "",
  };
  export let ennemies = [];

  let cardsList = [];
  let graveyard = [];
  let deck = basicDeck.sort(() => Math.random() - 0.5);
  let selectedAction = undefined;

  /**
   * Si c'est au tour de l'utilisateur, on pioche des cartes.
   */
  $: if (shouldPlay) {
    initializeTurn();
  }

  $: if (selectedEnnemyIndex !== undefined) {
    attack()
  }
  $: if (player.mana === 0) {
    finishTurn()
  }

  /**
   * Sets the mana to default value
   * Picks the cards
   */
  function initializeTurn() {

    // On prend le deck
    // On retire les 5 dernières cartes du paquet
    // On les push dans la main du joueur
    const updatedCardsList = [];
    let updatedDeck = [...deck];

    const limit = deck.length > 5 ? 5 : deck.length;
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
    const selectedCard = cardsList[cardIndex];
    selectedAction = cardIndex;
    if (selectedCard.action === BASIC_ATTACK) {
      onSelectAction();
    }
    else if (selectedCard.action === BASIC_DEFENSE) {
      defend();
    }
  }

  /**
   * Adds defense until the next turn
   */
  function defend() {
    const defense = cardsList[selectedAction].action === BASIC_DEFENSE ? 6 : 0;
    player = {...player, defense: player.defense + defense}
    onActionFinished();
  }


  /**
   * Attacks the Ennemy
   * @param targetIndex The index of the target Ennemy;
   * @param action The action linked to the attack
   */
  function attack(action = BASIC_ATTACK) {
    const ennemy = ennemies[selectedEnnemyIndex];
    const {hp} = ennemy;

    if (hp > 0) {
      const hp = calculate(action, player, ennemy);
      let updatedEnnemies = [...ennemies];
      if (hp !== 0) {
        const updatedEnnemy = {...ennemy, hp};
        updatedEnnemies[selectedEnnemyIndex] = updatedEnnemy;
      } else {
        updatedEnnemies = updatedEnnemies.filter(currentEnnemy => currentEnnemy.name !== ennemy.name)
      }
      ennemies = [...updatedEnnemies];
      onActionFinished();
    }
  }

  /**
   * This method is triggered when the users has played something
   */
  function onActionFinished() {
    player = {...player, mana: player.mana - 1};
    updateField(player, ennemies);
    // Remove last card played from hand and put it in graveyard
    graveyard = [...graveyard, cardsList[selectedAction]];
    cardsList = [...cardsList.filter((card, index) => selectedAction !== index)]
    selectedAction = undefined;
  }

  function finishTurn() {
    graveyard = [...graveyard, ...cardsList];
    cardsList = [];
    endTurn({...player, isSelecting: false}, ennemies);
  }

</script>

<div>
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
          on:click={() => selectAction(index)}
        >
          {card.name}
        </button>
      {/each}
    </div>
  </div>
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

  .Player__action:hover {
    background-color: #1d75d7;
    transition: 250ms ease background-color;
    color: white;
    cursor: pointer;
  }
</style>
