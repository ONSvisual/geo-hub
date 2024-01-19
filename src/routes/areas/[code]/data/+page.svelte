<script>
  import { base } from "$app/paths";
  import { goto, afterNavigate } from "$app/navigation";
  import { Breadcrumb, Titleblock, NavSections, NavSection, Cards, Card, Button, analyticsEvent } from "@onsvisual/svelte-components";
  import Subhead from "$lib/layout/partial/Subhead.svelte";
  import Select from "$lib/ui/Select.svelte";
  import AreaList from "$lib/ui/AreaList.svelte";
  import { aAn, capitalise, getName } from "@onsvisual/robo-utils";
  import { Map, MapSource, MapLayer } from "@onsvisual/svelte-maps";
  import { makePath } from "$lib/utils";
  import { geoCodesLookup } from "$lib/config";

  export let data;
	let { place, type, geometry } = data;
  let postcode;

  function navTo(e, options = {}, type = "search") {
		if (e.detail.type === "postcode") {
			postcode = e.detail;
		} else {
			postcode = null;
			analyticsEvent({
				event: type === "map" ? "mapSelect" : "searchSelect",
				areaCode: e.detail.areacd,
				areaName: e.detail.areanm,
				areaType: geoCodesLookup[e.detail.areacd.slice(0, 3)].label,
			});
			goto(`${base}/${makePath(e.detail.areacd)}data`, options);
		}
	}

  function pageLoad() {
    place = data.place;
    type = data.type;
    geometry = data.geometry;
  }
  afterNavigate(pageLoad);

  $: console.log(data);
</script>

{#if place}
<Breadcrumb links={[{label: 'Home', href: '/', refresh: true}, {label: "Explore local statistics", href: `${base}/`}, ...[...place.parents].reverse().map(p => ({label: getName(p), href: `${base}/${makePath(p.areacd)}`})), {label: getName(place), href: `${base}/${makePath(place.areacd)}`}, {label: 'Data'}]} background="#eaeaea"/>
<Titleblock title="{getName(place)} data" background="#eaeaea">
	{#if place.areacd !== "K02000001"}
  <Subhead>
    Localised data, insights and trends for
    <a href="{base}/{makePath(place.areacd)}">{getName(place, "the")}</a>
    ({place.areacd}).
	</Subhead>
	{/if}
</Titleblock>

<Cards marginTop>
  <Card noBackground>
    <div style:height="200px">
      {#key geometry}
      <Map
        style="{base}/data/mapstyle.json"
        location={{bounds: place.bounds}}
        interactive={false}
        options={{fitBoundsOptions: {padding: 20}}}>
        <MapSource
          id="boundary"
          type="geojson"
          data={geometry}>
          <MapLayer
            id="boundary-fill"
            type="fill"
            paint={{'fill-color': 'rgb(17,140,123)', 'fill-opacity': 0.2}}/>
          <MapLayer
            id="boundary-line"
            type="line"
            paint={{'line-color': 'rgb(17,140,123)', 'line-width': 2}}/>
        </MapSource>
      </Map>
      {/key}
    </div>
  </Card>
  <Card title="About this area">
    <p>{getName(place)} is {aAn(place.typenm)} {getName(place.parents[0], "in", "prefix")} <a href="{base}/{makePath(place.parents[0].areacd)}data/" data-sveltekit-noscroll>{getName(place.parents[0])}</a>.</p>
    <Button variant="secondary" icon="arrow" iconPosition="after" href="{base}/{makePath(place.areacd)}" small>Read more</Button>
  </Card>
  <Card title="Data for other areas">
    <Select id="search" mode="search" idKey="areacd" labelKey="areanm" groupKey="group" label="Type an area name or postcode" placeholder="Eg. Titchfield or PO15 5RR" autoClear on:select={navTo}/>
		{#if postcode}
		<AreaList {postcode} on:clear={() => postcode = null}/>
		{/if}
  </Card>
</Cards>

<NavSections contentsLabel="Data for this area">
  {#each ["Population", ...data.topics, "Explore charts", "Get the data"] as section}
  <NavSection title="{capitalise(section)}">
    <div class="section-placeholder">Placeholder</div>
  </NavSection>
  {/each}
</NavSections>
{/if}

<style>
  :global(div.ons-grid__col > section:first-of-type > h2) {
    margin-top: 0 !important;
  }
  :global(.tile) {
    overflow: visible !important;
  }
  :global(.ons-card .ons-label) {
    font-weight: normal;
  }
</style>