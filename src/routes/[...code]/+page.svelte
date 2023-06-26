<script>
	import { onMount } from "svelte";
	import { afterNavigate, goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { capitalise, aAn, getName, toList} from "@onsvisual/robo-utils";
	import { assets, geoTypes, geoCodesLookup, mapSources, noIndex } from "$lib/config";
	import { makeGeoJSON, filterLinks, parseTemplate, getPlace, makePath, filterChildren } from "$lib/utils";
  import { analyticsEvent } from "$lib/layout/AnalyticsBanner.svelte";
	import topojson from "$lib/data/uk-ctry-rgn.json";

	import Titleblock from "$lib/layout/Titleblock.svelte";
	import Headline from "$lib/layout/partial/Headline.svelte";
	import Subhead from "$lib/layout/partial/Subhead.svelte";
	import Content from "$lib/layout/Content.svelte";
	import Cards from "$lib/layout/Cards.svelte";
	import Card from "$lib/layout/partial/Card.svelte";
	import CardFeature from "$lib/layout/partial/CardFeature.svelte";
	import Select from "$lib/ui/Select.svelte";
  import AreaList from "$lib/ui/AreaList.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	import { Map, MapSource, MapLayer } from "@onsvisual/svelte-maps";
	import MapTooltip from "@onsvisual/svelte-maps/src/MapTooltip.svelte";

	export let data;
	let { place, type, links, geometry } = data;
	let childType = place?.childTypes[0];
  let postcode;
  let firstLoad = true;

	async function pageLoad() {
    let code = $page.url.searchParams.get("code");
		if (!data.place && code) {
      let newData = await getPlace(code);
      type = newData.type;
      place = newData.place;
			geometry = newData.geometry;
    } else {
      place = data.place;
      type = data.type;
			geometry = data.geometry;
    }
    if (!place) {
			goto(`${base}/`);
		} else if (place && place.childTypes[0]) {
			if (!place.childTypes.includes(childType)) childType = place.childTypes[0];
		} else {
			childType = null;
		}
		if (place && map) map.fitBounds(place.bounds, {padding: 20});
    
    if (firstLoad) {
      firstLoad = false;
    } else {
      let areaData = place ? {
        areaCode: place.areacd,
        areaName: getName(place),
        areaType: type.label
      } : {};
      analyticsEvent({
        event: "pageView",
        pageURL: $page.url.href,
        ...areaData,
        contentType: "exploratory",
      });
    }
    
    postcode = null;
    childrenExpanded = false;
	}
	onMount(pageLoad);
	afterNavigate(pageLoad);
	
	// DOM Elements
	let map = null;
	let hovered = null;
  let childrenHeight = {};
  let childrenExpanded = false;

	// Functions etc
	function navTo(e, options = {}, type = "search") {
    if (e.detail.type === "postcode") {
      postcode = e.detail;
    } else {
      postcode = null;
      analyticsEvent({
        event: type === "map" ? "mapSelect" : "searchSelect",
        areaCode: e.detail.areacd,
        areaName: e.detail.areanm,
        areaType: geoCodesLookup[e.detail.areacd.slice(0, 3)].label
      });
      goto(`${base}/${makePath(e.detail.areacd)}`, options);
    }
	}
	function mapSelect(e) {
    let code = e.detail.id;
    let place = e.detail.feature.properties;
    e.detail.areacd = code;
    e.detail.areanm = getName(place);
		navTo(e, {noScroll: true}, "map");
	}

	$: productLinks = place ? filterLinks(links, place) : [];
</script>

<svelte:head>
  {#if place}
	<title>{`${getName(place)} facts and figures - ${place.areacd} - ONS`}</title>
	<link rel="icon" href="{assets}/favicon.ico" />
  <link rel="canonical" href="{assets}/{makePath(place.areacd)}" />
	<meta property="og:title" content="{`${getName(place)} facts and figures - ONS`}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{assets}/{makePath(place.areacd)}" />
	<meta property="og:image" content="{assets}/img/og.png" />
	<meta property="og:image:type" content="image/png" />
	<meta name="description" content="{`Facts and figures about people living ${getName(place, 'in')} (${place.areacd}) from the ONS.`}">
	<meta property="og:description" content="{`Facts and figures about people living ${getName(place, 'in')} (${place.areacd}) from the ONS.`}" />
  {#if noIndex.includes(place.typecd)}
  <meta name="robots" content="noindex">
  {/if}
  {/if}
</svelte:head>

{#if place}
<Titleblock
	breadcrumb="{[{label: 'Home', url: '/', refresh: true}, {label: "Find a geographic area", url: `${base}/`}, ...[...place.parents].reverse().map(p => ({label: getName(p), url: `${base}/${makePath(p.areacd)}`})), {label: getName(place)}]}">
	<Headline>
		{getName(place)}
		{#if place.end}<span class="title-tag bg-warn">Inactive</span>{/if}
	</Headline>
  <Subhead>Facts and figures about people living {getName(place, "in")}.</Subhead>
</Titleblock>

<Content>
  <p class="subtitle" style:max-width="768px">	
		{#if place.areacd !== "K02000001"}
		{capitalise(getName(place, "the", "prefix"))}
		<strong>{getName(place)}</strong>
      {#if ["E02", "W02"].includes(place.typecd)}
      ({place.areacd}), also known as {place.areanm},
      {:else}
      ({place.areacd})
      {/if}
    {place.end ? "was" : "is"} {aAn(place.typenm)} {getName(place.parents[0], "in", "prefix")} <a href="{base}/{makePath(place.parents[0].areacd)}" data-sveltekit-noscroll>{getName(place.parents[0])}</a>.
		{#if place.start && place.replaces?.[0]?.areacd}
		In {place.start}, it replaced
			{#each place.replaces as rep, i}
			{getName(rep, "the", "prefix")}
			<a href="{base}/{makePath(rep.areacd)}" data-sveltekit-noscroll>{getName(rep)}</a>{i === place.replaces.length - 2 ? " and " : ", "}
			{/each}.
		{/if}
		{#if place.end && place.successor?.areacd}
		In {place.end + 1}, it was replaced by {getName(place.successor, "the", "prefix")} <a href="{base}/{makePath(place.successor.areacd)}" data-sveltekit-noscroll>{getName(place.successor)}</a> ({place.successor.areacd}).
		{:else if place.end}
		It ceased to be an official geography in {place.end + 1}.
		{/if}
		{/if}
	</p>
  <label for="search" class="lbl-search">
    <strong>Find another area</strong>
  </label>
	<Select id="search" mode="search" idKey="areacd" labelKey="areanm" groupKey="group" autoClear on:select={navTo}/>
  {#if postcode}
  <AreaList {postcode} on:clear={() => postcode = null}/>
  {/if}
  <hr class="ons-divider"/>

  <Cards title="Areas in {["K02", "E92", "N92", "S92", "W92"].includes(place.typecd) ? '' : 'and around'} {getName(place, "the")}" id="related">
		<Card colspan={2} blank>
			<div style:height="450px">
				<Map bind:map style="{base}/data/mapstyle.json" location={{bounds: place.bounds}} options={{fitBoundsOptions: {padding: 20}, maxBounds: [-19, 48, 12, 62]}} controls>
					{#each mapSources as s}
					<MapSource
						id={s.id}
						type={s.type}
						url={s.type === "vector" ? s.url : null}
						data={s.type === "geojson" ? makeGeoJSON(topojson, s.id) : null}
						layer={s.type === "vector" ? s.layer : null} promoteId="areacd"
						minzoom={s.minzoom ? s.minzoom : 0} maxzoom={12}
						props={s.type === "NA" ? {bounds: [-6.3603,49.88234,1.76357,55.8112]} : {}}>
						{#each s.layers as l}
						<MapLayer
							id="{l.key}-fill"
							type="fill"
							paint={{
								'fill-color': l.key === type.key ? ['case', ['==', ['feature-state', 'selected'], true], 'rgb(17,140,123)', 'grey'] : 'rgb(17,140,123)',
								'fill-opacity': ['case', ['==', ['feature-state', 'hovered'], true], 0.3, 0.1]
							}}
							visible={l.key === type.key || l.key === childType?.key}
							filter={!childType ? null :
								l.key === type.key && l.filter ? ["all", ...l.filter.slice(1), ["!", ["==", ["get", "areacd"], place.areacd]]] :
								l.key === type.key ? ["!", ["==", ["get", "areacd"], place.areacd]] : 
								["in", "areacd", ...place.children.map(d => d.areacd)]}
							hover on:hover={(e) => hovered = e.detail.feature} select selected={place.areacd}
							on:select={mapSelect}>
							<MapTooltip content={hovered ? getName(hovered.properties) : ''}/>
						</MapLayer>
						<MapLayer
							id="{l.key}-line"
							type="line"
							paint={{'line-color': l.key === type.key ? 'grey' : 'rgb(17,140,123)', 'line-width': 1}}
							visible={l.key === type.key || l.key === childType?.key}
							filter={l.key === type.key && l.filter ? ["all", ...l.filter.slice(1), ["!", ["==", ["get", "areacd"], place.areacd]]] :
								l.key === type.key ? ["!", ["==", ["get", "areacd"], place.areacd]] : 
								["in", "areacd", ...place.children.map(d => d.areacd)]}/>
						<MapLayer
							id="{l.key}-active"
							type="line"
							paint={{'line-color': 'rgb(17,140,123)', 'line-width': 2}}
							visible={l.key === type.key}
							filter={["==", "areacd", place.areacd]}/>
						{/each}
					</MapSource>
					{/each}
					{#if place.end && geometry}
					<MapSource
						id="place"
						type="geojson"
						data={geometry}>
						<MapLayer
							id="place-line"
							type="line"
							paint={{'line-color': 'rgb(17,140,123)', 'line-width': 2}}></MapLayer>
					</MapSource>
					{/if}
				</Map>
			</div>
		</Card>
		<Card title="Choose a larger area" grow>
			{#if place.parents[0]}
			{#each [...place.parents].reverse() as parent, i}
			<span class="parent" style:margin-left="{i === 0 ? 0 : `${(i - 1) * 20}px`}">
				{#if i != 0}<Icon type="subdir"/>{/if}
				<a href="{base}/{makePath(parent.areacd)}" data-sveltekit-noscroll>{getName(parent)}</a>
			</span>
			{/each}
			<span class="parent" style:margin-left="{`${(place.parents.length) * 20}px`}">
				{#if place.parents[0]}<Icon type="subdir"/>{/if}
				<span style:color="#555">{getName(place)}</span>
			</span>
			{:else}
			<span class="muted">No parent areas</span>
			{/if}
		</Card>
		<Card colspan={3} title="Areas {getName(place, "in")}">
			{#if childType}
			<div class="tabs">
				<div class="tablist-container">
					<div role="tablist" aria-label="Select child area type">
						{#each place.childTypes as type}
						<button
							role="tab"
							aria-selected="true"
							aria-controls="child-{type.key}"
							id="tab-{type.key}"
							tabindex="0"
							class:btn-active={childType.key === type.key}
							on:click={() => childType = type}>
							{capitalise(type.plural)}
						</button>
						{/each}
					</div>
				</div>
				{#each place.childTypes as type, i}
				<div id="panel-{type.key}" role="tabpanel" tabindex="0" aria-labelledby="tab-1" class:visuallyhidden={type.key !== childType.key}>
					<ul bind:clientHeight={childrenHeight[type.key]} style:max-height="{childrenExpanded ? 'none' : '144px'}" class="list-columns">
						{#each filterChildren(place, type) as child, i}
						<li>
							<a href="{base}/{makePath(child.areacd)}" data-sveltekit-noscroll rel="{noIndex.includes(child.areacd.slice(0, 3)) ? "nofollow" : null}">{getName(child)}</a>
						</li>
						{/each}
					</ul>
				</div>
				{/each}
				{#if childrenHeight[childType.key] >= 144}
				<button class="btn-link" on:click={() => childrenExpanded = !childrenExpanded}><Icon type="chevron" rotation={childrenExpanded ? 90 : -90}/> {childrenExpanded ? "Show fewer" : "Show more"}</button>
				{/if}
			</div>
			{:else}
			<span class="muted">No areas available within {getName(place, "the")}</span>
			{/if}
		</Card>
	</Cards>
	{#if productLinks[0]}
	<Cards title="Facts and figures for {getName(place, "the")}" id="interactive">
    {#each productLinks as link}
    <CardFeature title={link.title} url="{parseTemplate(link.url, link.place)}" description="{parseTemplate(link.description, link.place)}" image="{link.image}" bgcolor="{link.bgcolor}"/>
    {/each}
	</Cards>
	{/if}
</Content>
{/if}