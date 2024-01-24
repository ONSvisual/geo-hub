<script>
  import { createEventDispatcher } from "svelte";
  import { base } from "$app/paths";
  import { Map, MapSource, MapLayer, MapTooltip } from "@onsvisual/svelte-maps";
  import BreaksChart from "./BreaksChart.svelte";

  export let data;
  export let breaks;
  export let features;
  export let selected;

  let selFeature;
  let hovFeature;

	const dispatch = createEventDispatcher();
  const colors = ["rgb(234, 236, 177)", "rgb(169, 216, 145)", "rgb(0, 167, 186)", "rgb(0, 78, 166)", "rgb(0, 13, 84)"];

  function doHover(e) {
    hovFeature = e.detail.feature;
  }

  function doSelect(e) {
    selFeature = e.detail.feature;
    dispatch("select", e);
  }

  const featureCollection = (features, data) => ({
    type: "FeatureCollection",
    features: data.map(d => {
      const feature = features[d.areacd];
      feature.properties = {...d, color: colors[d.cluster]};
      return feature;
    }),
  });
</script>

<div class="map-container">
  <Map style="{base}/data/mapstyle.json" location={{bounds: [[ -9, 49 ], [ 2, 61 ]]}}>
    <MapSource id="features" type="geojson" data={featureCollection(features, data)} promoteId="areacd">
      <MapLayer id="fills" type="fill" paint={{"fill-color": ["get", "color"], "fill-opacity": 0.7}} order="place_other" hover let:hovered on:hover={doHover} select {selected} on:select={doSelect}>
        <MapTooltip content={hovered ? features[hovered].properties.areanm : ""}/>
      </MapLayer>
      <MapLayer id="lines" type="line" paint={{"line-color": "white", "line-width": 0.5}} order="place_other"/>
      <MapLayer id="highlight" type="line" paint={{
        "line-color": ['case',
          ['==', ['feature-state', 'hovered'], true], 'orange',
          ['==', ['feature-state', 'selected'], true], 'black',
          'rgba(255,255,255,0)'
        ],
        "line-width": 1.5
        }} order="place_other"/>
    </MapSource>
  </Map>
</div>
<BreaksChart {breaks} hovered={hovFeature ? hovFeature.properties.value : null} selected={selFeature ? selFeature.properties.value : null}/>

<style>
  .map-container {
    display: block;
    width: 100%;
    height: 500px;
  }
</style>