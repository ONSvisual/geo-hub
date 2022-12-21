<script>
	import { onMount } from "svelte";
	import { afterNavigate, goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { assets, geoTypes } from "$lib/config";
	import { capitalise, makeGeoJSON, getName, filterLinks, parseTemplate, addArticle, getPlace, makePath } from "$lib/utils";
	import topojson from "$lib/data/ew-ctry-rgn.json";

	import Titleblock from "$lib/layout/Titleblock.svelte";
	import Headline from "$lib/layout/partial/Headline.svelte";
	import Subhead from "$lib/layout/partial/Subhead.svelte";
	import Content from "$lib/layout/Content.svelte";
	import Article from "$lib/layout/Article.svelte";
	// import Section from "$lib/layout/Section.svelte";
	import Cards from "$lib/layout/Cards.svelte";
	import Card from "$lib/layout/partial/Card.svelte";
	import CardFeature from "$lib/layout/partial/CardFeature.svelte";
	import Select from "$lib/ui/Select.svelte";
  import AreaList from "$lib/ui/AreaList.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	import { Map, MapSource, MapLayer } from "@onsvisual/svelte-maps";
	import MapTooltip from "@onsvisual/svelte-maps/src/MapTooltip.svelte";

	export let data;
	let { places, lookup, links } = data;
	let place, type, childType, postcode;

	async function pageLoad() {
    postcode = null;
    let code = $page.url.searchParams.get("code");
		if (!data.place && code) {
      let newData = await getPlace(code);
      type = newData.type;
      place = newData.place;
    } else {
      place = data.place;
      type = data.type;
    }
    if (!place) {
			goto(`${base}/`)
		} else if (place && place.childTypes[0]) {
			if (!place.childTypes.includes(childType)) childType = place.childTypes[0];
		} else {
			childType = null;
		}
		if (place && map) map.fitBounds(place.bounds, {padding: 20});
	}
	onMount(pageLoad);
	afterNavigate(pageLoad);
	
	// DOM Elements
	let map = null;
	let hovered = null;

	// Functions etc
	function navTo(e, options = {}) {
    if (e.detail.type ==="postcode") {
      postcode = e.detail;
    } else {
      postcode = null;
      goto(`${base}/${makePath(e.detail.areacd)}`, options);
    }
	}
	function mapSelect(e) {
    e.detail.areacd = e.detail.id;
		navTo(e, {noScroll: true});
	}
</script>

<svelte:head>
  {#if place}
	<title>{`${getName(place)} (${place.areacd}) - ONS`}</title>
	<link rel="icon" href="{assets}/favicon.ico" />
	<meta property="og:title" content="{`${getName(place)} - ONS`}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{`${assets}/${place.areacd}/`}" />
	<meta property="og:image" content="{assets}/img/og.png" />
	<meta property="og:image:type" content="image/png" />
	<meta name="description" content="{`Explore content for ${getName(place, 'the')} from the ONS`}">
	<meta property="og:description" content="{`Explore content for ${getName(place, 'the')} from the ONS`}" />
  {/if}
</svelte:head>

{#if place}
<Titleblock
	breadcrumb="{[{label: 'Home', url: '/', refresh: true}, ...[...place.parents].reverse().map(p => ({label: getName(p), url: `${base}/${makePath(p.areacd)}`})), {label: getName(place)}]}">
	<Headline>{getName(place)}</Headline>
  <Subhead>Facts and figures about people living {getName(place, "in")}</Subhead>
</Titleblock>

<Content>
  <p class="subtitle">
		{#if place.areacd != "K04000001"}
		<strong>{capitalise(getName(place, "the"))}</strong> ({place.areacd}) is {addArticle(place.typenm)} <a href="{base}/{place.parents[0].areacd}/"  data-sveltekit-noscroll>{getName(place.parents[0], "in")}</a>.
		{/if}
	</p>
  <label for="search" class="lbl-search">
    Find another area
  </label>
	<Select id="search" items={places} mode="search" idKey="areacd" labelKey="areanm" groupKey="group" autoClear on:select={navTo}/>
  {#if postcode}
  <AreaList {postcode} on:clear={() => postcode = null}/>
  {/if}
  <hr class="ons-divider"/>

	<Cards title="Facts and figures for {getName(place, "the")}" id="interactive">
    {#each filterLinks(links, place) as link}
    <CardFeature title={link.title} url="{parseTemplate(link.url, link.place)}" description="{parseTemplate(link.description, link.place)}" image="{link.image}"/>
    {/each}
	</Cards>
  
	<Cards title="Areas related to {getName(place, "the")}" id="related">
		<Card colspan={2} rowspan={2} blank>
			<div style:height="450px">
				<Map bind:map style="{base}/data/mapstyle.json" location={{bounds: place.bounds}} options={{fitBoundsOptions: {padding: 20}, maxBounds: [-12,47,7,62]}} controls>
					{#each geoTypes as geo}
					{console.log(geo.key)}
					<MapSource
						id={geo.key}
						type={geo.source.type}
						url={geo.source.type === "vector" ? geo.source.url : null}
						data={geo.source.type === "geojson" ? makeGeoJSON(topojson, geo.key) : null}
						layer={geo.source.type === "vector" ? geo.key : null} promoteId={geo.source.promoteId}
						minzoom={geo.source.minzoom ? geo.source.minzoom : 0} maxzoom={12}
						props={geo.source.type === "vector" ? {bounds: [-6.3603,49.88234,1.76357,55.8112]} : {}}>
						<MapLayer
							id="{geo.key}-fill"
							type="fill"
							paint={{
								'fill-color': geo.key === type.key ? ['case', ['==', ['feature-state', 'selected'], true], 'rgb(17,140,123)', 'grey'] : 'rgb(17,140,123)',
								'fill-opacity': ['case', ['==', ['feature-state', 'hovered'], true], 0.3, 0.1]
							}}
							visible={geo.key === type.key || geo.key == childType?.key}
							filter={!childType ? null :
								geo.key === type.key ? ["!=", "areacd", place.areacd] : 
								["in", "areacd", ...place.children.map(d => d.areacd)]}
							hover on:hover={(e) => hovered = e.detail.feature} select selected={place.areacd}
							on:select={mapSelect}>
							<MapTooltip content={hovered ? getName(hovered.properties) : ''}/>
						</MapLayer>
						<MapLayer
							id="{geo.key}-line"
							type="line"
							paint={{'line-color': geo.key == type.key ? 'grey' : 'rgb(17,140,123)', 'line-width': 1}}
							visible={geo.key === type.key || geo.key == childType?.key}
							filter={geo.key == type.key ?
								["!=", "areacd", place.areacd] : 
								["in", "areacd", ...place.children.map(d => d.areacd)]}/>
						<MapLayer
							id="{geo.key}-active"
							type="line"
							paint={{'line-color': 'rgb(17,140,123)', 'line-width': 2}}
							visible={geo.key === type.key}
							filter={["==", "areacd", place.areacd]}/>
					</MapSource>
					{/each}
				</Map>
			</div>
		</Card>
		<Card title="Parent areas of {getName(place, "the")}">
			{#if place.parents[0]}
			{#each [...place.parents].reverse() as parent, i}
			<span class="parent" style:margin-left="{i == 0 ? 0 : `${(i - 1) * 20}px`}">
				{#if i != 0}<Icon type="subdir"/>{/if}
				<a href="{base}/{makePath(parent.areacd)}" data-sveltekit-noscroll>{getName(parent)}</a>
			</span>
			{/each}
			{:else}
			<span class="muted">No parent areas</span>
			{/if}
		</Card>
		<Card title="Areas {getName(place, "in")}">
			{#if childType}
			{#if place.childTypes[1]}
			<select bind:value={childType} style:display="block">
				{#each place.childTypes as type}
				<option value={type}>{capitalise(type.plural)}</option>
				{/each}
			</select>
			{:else}
			<span class="type-label">{capitalise(childType.plural)}</span><br/>
			{/if}
			{#each place.children.filter(c => childType.codes.includes(c.areacd.slice(0, 3))) as child, i}
			<a href="{base}/{makePath(child.areacd)}" data-sveltekit-noscroll>{getName(child)}</a>{i == place.children.length - 1 ? '' : ', '} 
			{/each}
			{:else}
			<span class="muted">No areas available within {getName(place)}</span>
			{/if}
		</Card>
	</Cards>

  <!-- <Section>
    <h2>Get {getName(place)} Census 2021 data</h2>
    <p>
      You can get and use data about England in different ways, you can:
    </p>
    <ul>
      {#each links as link}
      {#if link.geocodes.includes(place.typecd)}
      <li>
        <a href="{parseTemplate(link.url, place)}">{parseTemplate(link.description, place)}</a>
      </li>
      {:else}
      {#each getParent(link.geocodes, place.parents) as parent}
      <li>
        <a href="{parseTemplate(link.url, parent)}">{parseTemplate(link.description, parent)}</a>
      </li>
      {/each}
      {/if}
      {/each}
    </ul>
  </Section> -->
</Content>
{/if}