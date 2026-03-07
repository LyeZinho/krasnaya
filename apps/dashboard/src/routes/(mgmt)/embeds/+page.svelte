<script lang="ts">
  import Card from '$lib/atoms/Card.svelte';
  import Button from '$lib/atoms/Button.svelte';

  // TODO: Implementar criador visual de embeds Discord
</script>

<div class="embeds-page">
  <header>
    <h1>CRIADOR DE EMBEDS</h1>
  </header>

  <section class="embed-editor">
    <Card title="NOVO EMBED">
      <p>Editor visual para criar embeds reutilizáveis</p>
      <Button variant="primary">+ NOVO TEMPLATE</Button>
    </Card>
  </section>
</div>

<style>
  .embeds-page {
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
</style>
