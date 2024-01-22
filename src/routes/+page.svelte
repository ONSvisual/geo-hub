<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { assets, geoCodesLookup } from "$lib/config";
	import { makePath } from "$lib/utils";
  import { Breadcrumb, Titleblock, Section, analyticsEvent } from "@onsvisual/svelte-components";
	import Subhead from "$lib/layout/partial/Subhead.svelte";
  import Select from "$lib/ui/Select.svelte";
  import AreaList from "$lib/ui/AreaList.svelte";
	import Icon from "$lib/ui/Icon.svelte";
  import Indicators from "$lib/layout/Indicators.svelte";

  export let data;

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
</svelte:head>

<Breadcrumb links={[{label: 'Home', href: '/', refresh: true}, {label: 'Explore local statistics'}]} background="#eaeaea"/>
<Titleblock title="Explore local statistics" background="#eaeaea">
  <Subhead>Find, visualise, compare and download statistics for areas within the United Kingdom.</Subhead>
</Titleblock>
<Section title="Find a local area" theme="dark" background="#206095" marginTop>
  <p>
    You can find information about your area, local authority, combined authority, ward, parish or parliamentary constituency.
  </p>

  <label for="search" class="lbl-search">
    <strong>Search by place name or postcode</strong>
  </label>
  <Select id="search" mode="search" idKey="areacd" labelKey="areanm" groupKey="group" placeholder="Eg. Titchfield, or PO15 5RR" autoClear on:select={navTo}/>

  {#if postcode}
  <AreaList {postcode} on:clear={() => postcode = null}/>
  {/if}

  <p style:margin-top="24px">
    If you do not know the name of the area or postcode you can start your search from <a href="{base}/areas/E92000001/">England</a>, <a href="{base}/areas/W92000004/">Wales</a>, <a href="{base}/areas/S92000003/">Scotland</a> or <a href="{base}/areas/N92000002/">Northern Ireland</a>.
  </p>
</Section>
<Indicators {data}/>
<Section title="Other sources of statistics" marginTop>
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
</Section>
<Section title="About these pages">
  <p>
    These pages are maintained by the Explore Subnational Statistics (ESS) service. The ESS service is part of the GSS subnational data strategy, which provides a framework to guide the UK Government Statistical Service (GSS) in producing and disseminating subnational statistics in a more timely, granular and harmonised way.
  </p>
  <p>
    Specifically, ESS aims to provide one place for users to find, visualise, compare and download subnational statistics by standardised geographies and customer-defined areas.
  </p>
</Section>