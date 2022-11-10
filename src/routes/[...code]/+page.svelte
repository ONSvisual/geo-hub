<script>
	import { onMount, setContext } from "svelte";
	import { format } from "d3-format";
	import { afterNavigate, goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { themes, geoTypes } from "$lib/config";
	import { capitalise, makeGeoJSON, getName } from "$lib/utils";
	import topojson from "$lib/data/ew-ctry-rgn.json";

	import Titleblock from "$lib/layout/Titleblock.svelte";
	import Headline from "$lib/layout/partial/Headline.svelte";
	import Content from "$lib/layout/Content.svelte";
	import Cards from "$lib/layout/Cards.svelte";
	import Card from "$lib/layout/partial/Card.svelte";
	import Em from "$lib/ui/Em.svelte";
	import Select from "$lib/ui/Select.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	import { Map, MapSource, MapLayer } from "@onsvisual/svelte-maps";
	import MapTooltip from "@onsvisual/svelte-maps/src/MapTooltip.svelte";
    import CardFeature from "$lib/layout/partial/CardFeature.svelte";

	export let data;
	let { places, lookup, place, type } = data;
	$: ({ places, lookup, place, type } = data);
	let childType;

	const assets = "https://onsvisual.github.io/geo-hub";

	onMount(() => {
		if (!place) goto(`${base}/K04000001/`);
		if (place.childTypes[0]) childType = place.childTypes[0];
	});

	afterNavigate(() => {
		if (!place) goto(`${base}/K04000001/`);
		if (place.childTypes[0]) childType = place.childTypes[0];
		if (map) map.fitBounds(place.bounds, {padding: 20});
	});

	// STYLE CONFIG
	// Set theme globally (options are 'light' or 'dark')
	let theme = "light";
	setContext("theme", themes[theme]);
	
	// DOM Elements
	let map = null;

	// Functions etc
	function navTo(code) {
		if (code && code != place.areacd) {
			goto(`${base}/${code}/`, {noScroll: true});
		}
	}

	// Postcode multi-select
	let placeholder = "Type a place name or postcode";
	let filterText = "";
	async function getPostcodes(filterText) {
		if (filterText.length > 2 && /\d/.test(filterText)) {
			let res = await fetch(`https://api.postcodes.io/postcodes/${filterText}/autocomplete`);
			let json = await res.json();
			return json.result.map(d => ({areacd: d, areanm: d, postcode: true}));
		} else if (filterText.length > 2) {
			return places.filter(p => p.areanm.toLowerCase().slice(0, filterText.length) == filterText.toLowerCase());
		}
		return [];
	}
	async function doSelect(e) {
		if (e.detail.postcode) {
			let res = await fetch(`https://api.postcodes.io/postcodes/${e.detail.areacd}`);
			let json = await res.json();
			if (json.result) {
				let place = places.find(p => p.areacd == json.result.codes.admin_district);
				if (place) {
					if (window.dataLayer) window.dataLayer.push({event: "postcodeSelect", name: place.areanm, code: place.areacd});
					placeholder = "Type a place name or postcode";
					navTo(place.areacd);
				} else {
					placeholder = "Postcode must be in England or Wales";
				}
			}
		} else {
			if (window.dataLayer) window.dataLayer.push({event: "nameSelect", name: e.detail.areanm, code: e.detail.areacd});
			navTo(e.detail.areacd);
			placeholder = "Type a place name or postcode";
		}
	}
	function mapSelect(e) {
		if (window.dataLayer && e.detail.feature) window.dataLayer.push({event: "nameSelect", name: e.detail.feature.properties.areanm, code: e.detail.id});
		navTo(e.detail.id);
	}
</script>

<svelte:head>
	<title>{place ? `${getName(place)} census population profile` : 'Census population profiles'}</title>
	<link rel="icon" href="{assets}/favicon.ico" />
	<meta property="og:title" content="{place ? `${getName(place)} census population profile` : 'Census population profiles'}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{place ? `${assets}/${place.areacd}/` : `${assets}/`}" />
	<meta property="og:image" content="{assets}/img/og.png" />
	<meta property="og:image:type" content="image/png" />
	<meta name="description" content="{place ? `Explore census data and demographic trends for ${getName(place)}` : `Explore census data and demographic trends for places in England and Wales`}">
	<meta property="og:description" content="{place ? `Explore census data and demographic trends for ${getName(place)}` : `Explore census data and demographic trends for places in England and Wales`}" />
</svelte:head>

{#if place && childType}
<Titleblock
	background="none"
	breadcrumb="{[{label: 'Area hub', url: `${base}/`}, ...[...place.parents].reverse().map(p => ({label: getName(p), url: `${base}/${p.areacd}/`})), {label: getName(place)}]}">
	<Headline>{getName(place)}</Headline>
	<Select items={places} mode="search" idKey="areacd" labelKey="areanm" {placeholder} bind:filterText loadOptions={getPostcodes} autoClear on:select={doSelect}/>
	<p class="subtitle">
		{#if place.areacd != "K04000001"}
		<strong>{capitalise(getName(place, "text"))}</strong> <small>({place.areacd})</small> is a {place.typenm} {getName(place.parents[0], "in")}.
		{/if}
	</p>
</Titleblock>

<Content>
	<Cards title="Explore related areas">
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
							hover let:hovered select selected={place.areacd}
							on:select={mapSelect}>
							<!-- <MapTooltip content={hovered ? lookup[hovered].areanm : ''}/> -->
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
		<Card title="Parent areas of {getName(place)}">
			{#if place.parents[0]}
			{#each [...place.parents].reverse() as parent, i}
			<span class="parent" style:margin-left="{i == 0 ? 0 : `${(i - 1) * 20}px`}">
				{#if i != 0}<Icon type="subdir"/>{/if}
				<a href="{base}/{parent.areacd}/" data-sveltekit-noscroll>{getName(parent)}</a>
			</span>
			{/each}
			{:else}
			<span class="muted">No parent areas</span>
			{/if}
		</Card>
		<Card title="Areas {getName(place, "in")}">
			{#if place.children[0]}
			{#if place.childTypes[1]}
			<select bind:value={childType} style:display="block">
				{#each place.childTypes as type}
				<option value={type}>{capitalise(type.plural)}</option>
				{/each}
			</select>
			{:else}
			<span class="type-label">{childType.plural}</span><br/>
			{/if}
			{#each place.children.filter(c => childType.codes.includes(c.areacd.slice(0, 3))) as child, i}
			<a href="{base}/{child.areacd}/" data-sveltekit-noscroll>{getName(child)}</a>{i == place.children.length - 1 ? '' : ', '} 
			{/each}
			{:else}
			<span class="muted">No areas available within {getName(place)}</span>
			{/if}
		</Card>
	</Cards>

	<Cards title="Interactive content for {getName(place, "text")}">
		{#if ["ew", "lad", "msoa", "oa"].includes(type.key)}
		<CardFeature title="Census maps" url="https://www.ons.gov.uk/census/maps/?{type.key}={place.areacd}" description="See how {getName(place, "text")} compares to other areas" image="https://www.ons.gov.uk/resource?uri=/peoplepopulationandcommunity/populationandmigration/populationestimates/articles/censusmaps/2022-11-02/b178c24d.png"/>
		{/if}
		{#if !["ew", "ctry", "rgn"].includes(type.key)}
		<CardFeature title="Custom profiles" url="https://stately-salamander-b9768e.netlify.app/build/#{place.areacd}" description="Build a custom area profile for {getName(place, "text")}" image="https://www.ons.gov.uk/resource?uri=/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/articles/mappingincomedeprivationatalocalauthoritylevel/2021-05-24/96c97858.png"/>
		{/if}
		{#if type.key === "lad"}
		<CardFeature title="Area reports" url="https://area-reports.netlify.app/{place.areacd}" description="Read how {getName(place, "text")} has changed since the 2011 Census" image="https://www.ons.gov.uk/resource?uri=/peoplepopulationandcommunity/populationandmigration/populationestimates/articles/howthepopulationchangedwhereyoulivecensus2021/2022-06-28/fb1398a9.png"/>
		<CardFeature title="Census quiz" url="https://census-quiz.netlify.app/#{place.areacd}" description="Build a custom area profile for {getName(place, "text")}" image="https://www.ons.gov.uk/resource?uri=/peoplepopulationandcommunity/wellbeing/articles/areyoungpeopledetachedfromtheirneighbourhoods/2019-07-24/d083b77e.png"/>
		{/if}
		<CardFeature title="Census map game" url="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/articles/playthecensus2021populationmapgame/2022-06-28" description="Play the higher-or-lower map game with census data" image="https://www.ons.gov.uk/resource?uri=/peoplepopulationandcommunity/populationandmigration/populationestimates/articles/playthecensus2021populationmapgame/2022-06-28/cb85ea78.png"/>
		<CardFeature title="Story of the census" url="https://www.ons.gov.uk/visualisations/storyofthecensus/" description="A history of the census, from 1801 to 2021" image="https://www.ons.gov.uk/resource?uri=/peoplepopulationandcommunity/populationandmigration/populationestimates/articles/historyofthecensus1801to2021/2022-06-20/e8d29221.png"/>
	</Cards>
</Content>
{:else if !place}
<Content>
	<a class="redirect" href="{base}/K04000001/">Loading England and Wales...</a>
</Content>
{/if}

<style>
	:global(.tile) {
		color: black;
		font-size: 1rem;
	}
	:global(p) {
		font-size: 1rem;
	}
	:global(.mapboxgl-ctrl-icon, .maplibregl-ctrl-icon) {
		visibility: visible !important;
	}
	a {
		color: #206095;
		text-decoration: underline;
	}
	a:hover {
		color: rgb(0, 60, 87);
	}
	a.redirect {
		display: block;
		margin-top: 20px !important;
	}
	.subtitle {
		margin: 8px 0;
	}
	.parent {
		display: block;
	}
	.muted {
		color: grey;
	}
	select {
		appearance: none;
		background: rgb(144, 32, 130) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path d="M1.5.3L6 5.4 10.5.3c.2-.2.4-.2.6 0l.7.7c.1.2.1.4 0 .5L6.3 7.7c-.2.2-.4.2-.6 0L.2 1.6C.1 1.4.1 1.2.2 1L.9.3c.2-.1.4-.1.6 0z" fill="white"/></svg>') padding-box no-repeat;
		background-position: calc(100% - 10px) 50%;
		background-size: 16px;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 3px;
		padding: 4px 33px 4px 6px;
		margin: 0;
		font-size: 1rem;
	}
	select:focus {
		outline: 4px solid orange;
	}
	.type-label {
		display: inline-block;
		background-color: rgb(144, 32, 130);
		color: white;
		font-weight: bold;
		padding: 1px 10px;
		margin: 0;
		border-radius: 3px;
		font-size: 1rem;
	}
	.num-big {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		font-size: 3rem;
		font-weight: bold;
		line-height: 1.2;
	}
	.num-suffix {
		display: block;
		max-width: 100%;
		line-height: 1.1;
	}
	.num-desc {
		display: block;
		margin-top: 18px;
		color: #666;
		line-height: 1.6;
	}
	.btn-group {
		display: inline-flex;
		flex-direction: column;
		overflow: hidden;
		margin: 4px -5px 4px 0;
	}
	.btn-chevron {
		background: none;
		border: none;
		font-size: 20px;
		margin: 0;
		padding: 0;
		color: #206095;
	}
	.btn-chevron:disabled {
		color: #bbb;
	}
	.btn-chevron:hover {
		color: black;
	}
	/* Safari */
	@-webkit-keyframes spin {
		0% { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360deg); }
	}
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>