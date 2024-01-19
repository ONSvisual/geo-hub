<script>
  import { base } from "$app/paths";
  import { Breadcrumb, Titleblock, NavSections, NavSection } from "@onsvisual/svelte-components";
  import Subhead from "$lib/layout/partial/Subhead.svelte";
  import Indicators from "$lib/layout/Indicators.svelte";

  export let data;
</script>

<Breadcrumb links={[{label: 'Home', href: '/', refresh: true}, {label: "Explore local statistics", href: `${base}/`}, {label: data.indicator.label}]} background="#eaeaea"/>
<Titleblock title="{data.indicator.label}" meta={[
  {
    "key": "Data source",
    "value": "ONS",
  },
  {
    "key": "Last updated",
    "value": `${data.indicator.endYear}`,
  }
  ]} background="#eaeaea">
  <Subhead margin>
    {data.indicator.subtitle}.
	</Subhead>
</Titleblock>

<Indicators {data} title="Find another dataset" compact/>

<NavSections contentsLabel="Data for this area" marginTop>
  {#each ["Map", "Timeseries", "Beeswarm", "Table", "Get the data"] as section}
  <NavSection title="{section}">
    <div class="section-placeholder">Placeholder</div>
  </NavSection>
  {/each}
</NavSections>

<style>
  :global(div.ons-grid__col > section:first-of-type > h2) {
    margin-top: 0 !important;
  }
</style>