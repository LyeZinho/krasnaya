<script lang="ts">
  import Card from '$lib/atoms/Card.svelte';
  import Button from '$lib/atoms/Button.svelte';
  import Input from '$lib/atoms/Input.svelte';
  import FormGroup from '$lib/atoms/FormGroup.svelte';

  // TODO: Implementar sistema de itens, loja e badges
</script>

<div class="economy-page">
  <header>
    <h1>ECONOMIA</h1>
  </header>

  <section class="economy-tabs">
    <Card title="ITENS DA LOJA">
      <p>Gerenciamento de itens e preços</p>
      <Button variant="primary">+ NOVO ITEM</Button>
    </Card>

    <Card title="BADGES">
      <p>Gerenciamento de badges e ranks</p>
      <Button variant="primary">+ NOVA BADGE</Button>
    </Card>

    <Card title="BOOSTS">
      <p>Gerenciamento de multiplicadores temporários</p>
      <Button variant="primary">+ NOVO BOOST</Button>
    </Card>
  </section>
</div>

<style>
  .economy-page {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  header {
    border-bottom: 4px solid var(--color-brutal-black);
    padding-bottom: 1rem;
  }

  h1 {
    margin: 0;
  }

  .economy-tabs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
</style>
