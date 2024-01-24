import { base } from "$app/paths";
import getData from "./helpers/get-data";
import inferGeos from "./helpers/infer-geos";
import makeGeoJSON from "./helpers/make-geojson";

// const dataUrl = "https://raw.githubusercontent.com/ONSvisual/ess-template/main/static/data/csv/combined-data.csv";
// const areaUrl = "https://raw.githubusercontent.com/ONSvisual/ess-template/main/static/data/config-data/geography/areas.csv";
// const topoUrl = "https://onsvisual.github.io/uk-topojson/data/topo.json";
const dataUrl = `${base}/data/csv/ess/combined-data.csv`;
const areaUrl = `${base}/data/csv/ess/areas.csv`;
const topoUrl = `${base}/data/topo.json`;

export async function load({ params, parent, fetch }) {
	const data = await parent();

	const code = params.code;
  const indicator = data.indicators.find(ind => ind.code === code);

	const ds = await getData(dataUrl, areaUrl, indicator, fetch);
	const geos = inferGeos(ds.codes);
	const features = await makeGeoJSON(topoUrl, fetch);
	
	return { ...data, indicator, data: ds.data, years: ds.years, geos, features };
}