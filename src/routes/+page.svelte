<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { assets } from "$lib/config";
	import { getName, makePath, capitalise } from "$lib/utils";

	import Titleblock from "$lib/layout/Titleblock.svelte";
	import Headline from "$lib/layout/partial/Headline.svelte";
	import Content from "$lib/layout/Content.svelte";
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
	<Headline>Find a geographic area</Headline>
	<p class="subtitle">
		Get facts, figures and interactive content for places in England and Wales.
	</p>
</Titleblock>
<Content>
  <label for="search" class="lbl-search">
    <strong>Search by place name or postcode to find your area</strong><br/>
    For example, "PO15 5RR" or "Newport West"
  </label>
  <Select items={places} mode="search" idKey="areacd" labelKey="areanm" groupKey="group" autoClear on:select={navTo}/>

  {#if postcode}
  <AreaList {postcode} on:clear={() => postcode = null}/>
  {/if}

  <p style:margin-top="20px">
    You can also navigate through a hierarchy of all the available geographic areas, including local authorities, wards, parishes and parliamentary constituencies. Select a country or region below to start navigating.
  </p>

  <ul class="ons-list">
    <li><a href="{base}/K04000001/"><strong>England and Wales</strong></a></li>
    <ul class="ons-list">
      <li><a href="{base}/E92000001/"><strong>England</strong></a></li>
      <ul class="ons-list ons-list-sml">
        <li><a href="{base}/E12000001/">North East</a></li>
        <li><a href="{base}/E12000002/">North West</a></li>
        <li><a href="{base}/E12000003/">Yorkshire and The Humber</a></li>
        <li><a href="{base}/E12000004/">East Midlands</a></li>
        <li><a href="{base}/E12000005/">West Midlands</a></li>
        <li><a href="{base}/E12000006/">East of England</a></li>
        <li><a href="{base}/E12000007/">London</a></li>
        <li><a href="{base}/E12000008/">South East</a></li>
        <li><a href="{base}/E12000009/">South West</a></li>
      </ul>
      <li><a href="{base}/W92000004/"><strong>Wales</strong></a></li>
    </ul>
  </ul>

  <h2 class="heading-bold">Other parts of the United Kingdom</h2>

  <ul class="ons-list">
    <li><a href="https://www.nrscotland.gov.uk/">National Records of Scotland</a> <span class="inline-icon"><Icon type="launch"/></span></li>
    <li><a href="https://www.nisra.gov.uk/">Northern Ireland Statistics and Research Agency</a> <span class="inline-icon"><Icon type="launch"/></span></li>
  </ul>
</Content>