<script>
  import { createEventDispatcher } from "svelte";
	import { base } from "$app/paths";
  import { geoCodesLookup } from "$lib/config";
	import { makePath, capitalise } from "$lib/utils";
  import { analyticsEvent } from "$lib/layout/AnalyticsBanner.svelte";
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
      {#if geoCodesLookup[p.areacd.slice(0, 3)]}
      <tr>
        <td><strong>{capitalise(p.typenm)}</strong></td>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <td><a
          href="{base}/{makePath(p.areacd)}"
          on:click={() => analyticsEvent({
            event: "postcodeSelect",
            areaCode: p.areacd,
            areaName: p.areanm,
            areaType: geoCodesLookup[p.areacd.slice(0, 3)].label
          })}>{p.areanm}</a></td>
      </tr>
      {/if}
    {/each}
  </tbody>
</table>