<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { assets, geoCodesLookup, redirectBase } from "$lib/config";
	import { makePath } from "$lib/utils";
  import { analyticsEvent } from "$lib/layout/AnalyticsBanner.svelte";

	import Titleblock from "$lib/layout/Titleblock.svelte";
	import Headline from "$lib/layout/partial/Headline.svelte";
	import Subhead from "$lib/layout/partial/Subhead.svelte";
  import Article from "$lib/layout/Article.svelte";
	import Select from "$lib/ui/Select.svelte";
  import AreaList from "$lib/ui/AreaList.svelte";
	import Icon from "$lib/ui/Icon.svelte";

  let postcode = null;

	// Functions etc
	function navTo(e) {
    if (e.detail.type ==="postcode") {
      postcode = e.detail;
    } else {
      postcode = null;
      analyticsEvent({
        event: "searchSelect",
        areaCode: e.detail.areacd,
        areaName: e.detail.areanm,
        areaType: geoCodesLookup[e.detail.areacd.slice(0, 3)].label
      });
      goto(`${base}/${makePath(e.detail.areacd)}`);
    }
	}
</script>

<svelte:head>
  <meta http-equiv="refresh" content="0; URL='{redirectBase}'" />
	<title>Find a geographic area - ONS</title>
	<link rel="icon" href="{assets}/favicon.ico" />
  <link rel="canonical" href="{assets}/" />
	<meta property="og:title" content="Find a geographic area - ONS" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{assets}/" />
	<meta property="og:image" content="{assets}/img/og.png" />
	<meta property="og:image:type" content="image/png" />
	<meta name="description" content="Get data about people and the communities they live in, includes population, economy and health.">
	<meta property="og:description" content="Get data about people and the communities they live in, includes population, economy and health." />
  <meta name="robots" content="noindex">
</svelte:head>

<div style:display="none">
  <Titleblock
    breadcrumb="{[{label: 'Home', url: '/', refresh: true}, {label: 'Find a geographic area'}]}">
    <Headline>Find facts and figures about areas in the United Kingdom</Headline>
    <Subhead>Get data about people and the communities they live in, including population, identity, housing, people in or out of work, education and health.</Subhead>
  </Titleblock>
  <Article>
    <p>
      You can find information about your area, local authority, combined authority, ward, parish or parliamentary constituency.
    </p>

    <label for="search" class="lbl-search">
      <strong>Search by area name or postcode</strong><br/>
      For example, “Titchfield” or “PO15 5RR”
    </label>
    <Select id="search" mode="search" idKey="areacd" labelKey="areanm" groupKey="group" autoClear on:select={navTo}/>

    {#if postcode}
    <AreaList {postcode} on:clear={() => postcode = null}/>
    {/if}

    <p>
      If you do not know the name of the area or postcode you can start your search from <a href="{base}/E92000001/">England</a>, <a href="{base}/W92000004/">Wales</a>, <a href="{base}/S92000003/">Scotland</a> or <a href="{base}/N92000002/">Northern Ireland</a>.
    </p>

    <h2 class="heading-bold heading-overline">Labour market and population data</h2>
    <p>
      Some specialist data are also published on Nomis, an Office for National Statistics service. Find out how to get <a href="https://www.ons.gov.uk/help/localstatistics">labour market and population data for areas within the UK</a>.
    </p>

    <h2 class="heading-bold heading-overline">Other sources of statistics</h2>
    <p>
      Scotland and Northern Ireland have their own agencies who produce official statistics. View facts and figures for areas in:
    </p>

    <ul class="ons-list">
      <li><a href="https://statistics.gov.scot/home" target="_blank" rel="noreferrer">Scotland</a> <span class="inline-icon"><Icon type="launch"/></span></li>
      <li><a href="https://www.ninis2.nisra.gov.uk/public/AreaProfile.aspx?Menu=True" target="_blank" rel="noreferrer">Northern Ireland</a> <span class="inline-icon"><Icon type="launch"/></span></li>
    </ul>

    <p>
      Some data about Wales is also published on the <a href="https://statswales.gov.wales/Catalogue" target="_blank" rel="noreferrer">Stats Wales website</a> <span class="inline-icon"><Icon type="launch"/>
    </p>
  </Article>
</div>

<p><a href="{redirectBase}">Redirecting...</a></p>