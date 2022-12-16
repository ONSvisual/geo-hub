<script>
  import { createEventDispatcher } from "svelte";
	import { base } from "$app/paths";
	import { makePath, capitalise } from "$lib/utils";
	import Icon from "$lib/ui/Icon.svelte";

  const dispatch = createEventDispatcher();

  export let postcode;
</script>

<table class="tbl-results">
  <tbody>
    <tr>
      <td>Areas covering <strong>{postcode.postcd}</strong></td>
      <td style:text-align="right"><button class="btn-link no-border" title="Close area list" on:click={() => dispatch("clear")}><Icon type="close"/></button></td>
    </tr>
    {#each postcode.places as p}
    <tr>
      <td><strong>{capitalise(p.typenm)}</strong></td>
      <td><a href="{base}/{makePath(p.areacd)}">{p.areanm}</a></td>
    </tr>
    {/each}
  </tbody>
</table>