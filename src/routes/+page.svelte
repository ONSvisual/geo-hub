<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { assets } from "$lib/config";
	import { makePath } from "$lib/utils";

	import Titleblock from "$lib/layout/Titleblock.svelte";
	import Headline from "$lib/layout/partial/Headline.svelte";
  import Article from "$lib/layout/Article.svelte";
	import Select from "$lib/ui/Select.svelte";
  import AreaList from "$lib/ui/AreaList.svelte";
	import Icon from "$lib/ui/Icon.svelte";

	export let data;
	let { places, lookup } = data;
  let postcode = null;

	// Functions etc
	function navTo(e) {
    if (e.detail.type ==="postcode") {
      postcode = e.detail;
    } else {
      postcode = null;
      goto(`${base}/${makePath(e.detail.areacd)}`);
    }
	}
</script>

<svelte:head>
	<title>Find a geographic area - ONS</title>
	<link rel="icon" href="{assets}/favicon.ico" />
	<meta property="og:title" content="Find a geographic area - ONS" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{assets}/" />
	<meta property="og:image" content="{assets}/img/og.png" />
	<meta property="og:image:type" content="image/png" />
	<meta name="description" content="Explore content for England and Wales from the ONS">
	<meta property="og:description" content="Explore content for England and Wales from the ONS" />
</svelte:head>

<Titleblock
	breadcrumb="{[{label: 'Home', url: '/', refresh: true}, {label: 'Find a geographic area'}]}">
	<Headline>Find facts and figures about areas in England and Wales</Headline>
	<p class="subtitle">
		Find an area in England and Wales to get facts and figures on different topics, including population, identity, housing, work, education and health.
	</p>
</Titleblock>
<Article>
  <p>
    You can find areas including local authorities, wards, parishes and parliamentary constituencies.
  </p>
  <p>
    You can also navigate through all available areas, starting from <a href="{base}/E92000001/">England</a> or <a href="{base}/W92000004/">Wales</a>.
  </p>

  <label for="search" class="lbl-search">
    <strong>Search by area name or postcode</strong><br/>
    For example, “London” or “EC1M 3AB”
  </label>
  <Select id="search" items={places} mode="search" idKey="areacd" labelKey="areanm" groupKey="group" autoClear on:select={navTo}/>

  {#if postcode}
  <AreaList {postcode} on:clear={() => postcode = null}/>
  {/if}

  <h2 class="heading-bold">Other countries in the UK</h2>

  <p>
    Scotland and Northern Ireland have their own agencies who produce official statistics. View facts and figures for areas in:
  </p>

  <ul class="ons-list">
    <li><a href="https://statistics.gov.scot/atlas/resource?uri=http://statistics.gov.scot/id/statistical-geography/S92000003/" target="_blank">Scotland</a> <span class="inline-icon"><Icon type="launch"/></span></li>
    <li><a href="https://www.ninis2.nisra.gov.uk/public/AreaProfile.aspx?Menu=True" target="_blank">Northern Ireland</a> <span class="inline-icon"><Icon type="launch"/></span></li>
  </ul>
</Article>