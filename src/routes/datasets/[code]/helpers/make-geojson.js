import { feature } from "topojson-client";
import { groups } from "./infer-geos";

export default async function makeGeoJSON(url, fetch = window.fetch) {
	const features = {};
	const topo = await (await fetch(url)).json();

	for (const grp of groups) {
		const geo = feature(topo, topo.objects[grp.key]);
		for (const f of geo.features) {
			features[f.properties.areacd] = f;
		}
	}

	return features;
}