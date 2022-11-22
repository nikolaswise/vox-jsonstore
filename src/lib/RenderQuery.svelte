<script>
  import { onMount } from 'svelte'
  import { query } from '$lib/query.js'

  export let q
  let result

  onMount(async() => {
    result = await query(q)
  })

  const update = async () => {
    result = await query(q)
  }
</script>

<textarea bind:value={q}></textarea>
<p>
<button on:click={update}>Re-Run</button>
</p>
{#if result}
  <pre><code>{JSON.stringify(result, null, 2)}</code></pre>
{/if}

<style type="text/css">
  textarea {
    min-width: 24rem;
    min-height: 8rem;
  }
</style>