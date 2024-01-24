<script>
  import { base } from "$app/paths";
  import { afterNavigate } from "$app/navigation";
  import { Breadcrumb, Titleblock, NavSections, NavSection, Table, Dropdown } from "@onsvisual/svelte-components";
  import { LineChart, ScatterChart } from "@onsvisual/svelte-charts";
  import ContentBlock from "$lib/layout/ContentBlock.svelte";
  import Map from "$lib/viz/Map.svelte";
  import pivotData from "./helpers/pivot-data.js";
  import filterData from "./helpers/filter-data.js";
  import makeMapData from "./helpers/make-map-data.js";
  import Subhead from "$lib/layout/Subhead.svelte";
  import Indicators from "$lib/layout/Indicators.svelte";

  export let data;

  let geoGroup, year, columns;
  let filteredData, mapData, pivotedData;
  let selected = null;

  const getUnit = (ind) => ind.unit && ind.unit !== "NA" ? ind.unit : ind.subText;
  const doSelect = (e) => selected = e.detail.id;

  function refreshData() {
    filteredData = geoGroup?.codes ? filterData(data.data, geoGroup?.codes) : [];
    mapData = geoGroup?.codes && year ? makeMapData(data.data, geoGroup?.codes, year) : {data: [], breaks: []};
    pivotedData = geoGroup?.codes ? pivotData(data.data, geoGroup?.codes) : [];
  }

  afterNavigate(() => {
    geoGroup = data.geos.groups[data.geos.groups.length - 1];
    year = data.years[data.years.length - 1];
    columns = [
      {key: "areacd", label: "Area code", sortable: true},
      {key: "areanm", label: "Area name", sortable: true},
      ...data.years.map(y => ({key: y, label: y, sortable: true})),
    ];
    refreshData();
  });

  // $: console.log("data", data);
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

{#if filteredData && mapData && pivotedData}
<NavSections contentsLabel="Data for this area" marginTop>
  <NavSection title="Map">
    <ContentBlock title={data.indicator.label} unit={getUnit(data.indicator)}>
      <Dropdown id="year" options={data.years} width={10} bind:value={year} on:change={refreshData}/>
      <Dropdown options={data.geos.groups} bind:value={geoGroup} on:change={refreshData}/>
      <Map data={mapData.data} breaks={mapData.breaks} codes={mapData.codes} features={data.features} {selected} on:select={doSelect}/>
    </ContentBlock>
  </NavSection>
  <NavSection title="Beeswarm">
    <ContentBlock title={data.indicator.label} unit={getUnit(data.indicator)}>
      <Dropdown id="year" options={data.years} bind:value={year} on:change={refreshData}/>
      <Dropdown options={data.geos.groups} bind:value={geoGroup} on:change={refreshData}/>
      {#key mapData}
      <ScatterChart data={mapData.data} xKey="value" idKey="areacd" labelKey="areanm" color="lightgrey" colorSelect="#206095" height={500} yFitBeeswarm overlayFill hover labels select {selected} on:select={doSelect}/>
      {/key}
    </ContentBlock>
  </NavSection>
  {#if data.years.length > 1}
  <NavSection title="Timeseries">
    <ContentBlock title={data.indicator.label} unit={getUnit(data.indicator)}>
      <Dropdown options={data.geos.groups} bind:value={geoGroup} on:change={refreshData}/>
      {#key filteredData}
      <LineChart data={filteredData} xKey="year" yKey="value" zKey="areacd" idKey="areacd" labelKey="areanm" color={pivotedData.length > 40 ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,.4)'} lineWidth={0.5} height={500} padding={{ top: 20, bottom: 28, left: 35, right: 100 }} yMin={null} hover labels select {selected} on:select={doSelect}/>
      {/key}
    </ContentBlock>
  </NavSection>
  {/if}
  <NavSection title="Table">
    <ContentBlock title={data.indicator.label} unit={getUnit(data.indicator)}>
      <Dropdown options={data.geos.groups} bind:value={geoGroup} on:change={refreshData}/>
      {#key pivotedData}
      <Table data={pivotedData} {columns} height={500} stickyHeader compact/>
      {/key}
    </ContentBlock>
  </NavSection>
  <NavSection title="Get the data">
    <div class="section-placeholder">Placeholder</div>
  </NavSection>
</NavSections>
{/if}

<style>
  :global(div.ons-grid__col > section:first-of-type > h2) {
    margin-top: 0 !important;
  }
  :global(.ons-field) {
    display: inline-block;
    margin: 0 4px 8px 0 !important;
  }
  :global(select.ons-input--select) {
    width: 260px !important;
  }
  :global(select#year) {
    width: 90px !important;
  }
</style>