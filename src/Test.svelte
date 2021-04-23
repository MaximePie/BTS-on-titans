<script>
  export let player;

  function removeHealth() {
    player = {...player, hp: player.hp - 1};
  }

  $: if (player.hp === 58) {
    alert("HAHA");
  }
</script>

<style>

</style>

<div>
  <p> HP du joueur : {player.hp} <button on:click={removeHealth}>Poison</button></p>
</div>
