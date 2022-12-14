<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { assets } from "$lib/config";
	import { getName, makePath } from "$lib/utils";

	import Titleblock from "$lib/layout/Titleblock.svelte";
	import Headline from "$lib/layout/partial/Headline.svelte";
	import Content from "$lib/layout/Content.svelte";
	import Select from "$lib/ui/Select.svelte";
	import Icon from "$lib/ui/Icon.svelte";

	export let data;
	let { places, lookup } = data;

	// Functions etc
	function navTo(code) {
		goto(`${base}/${makePath(code)}`);
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
	breadcrumb="{[{label: 'Home', url: '/', refresh: true}]}">
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
  <Select items={places} mode="search" idKey="areacd" labelKey="areanm" groupKey="group" autoClear on:select={(e) => navTo(e.detail)}/>

  <p>
    It is also possible navigate through all of the available geographic areas, including local authorities, wards, parishes and parliamentary constituencies. You can start your journey from <a href="{base}/E92000001/">England</a> or <a href="{base}/W92000004/">Wales</a> and work your way down to smaller geographies.
  </p>

  <h2 class="heading-bold">Other parts of the United Kingdom</h2>

  <ul class="ons-list">
    <li><a href="https://www.nrscotland.gov.uk/">National Records of Scotland</a> <span class="inline-icon"><Icon type="launch"/></span></li>
    <li><a href="https://www.nisra.gov.uk/">Northern Ireland Statistics and Research Agency</a> <span class="inline-icon"><Icon type="launch"/></span></li>
  </ul>
</Content>